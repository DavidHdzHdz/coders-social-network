const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const Post = require('../models/Post');
const User = require('../models/User');

/**
 * @route POST api/posts
 * @description create new post
 * @access private
 */
router.post('/', auth, [ check('text', 'test is required').not().isEmpty() ], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { id: userId } = req.user;
		const { text } = req.body;
		const user = await User.findById(userId).select('-password');
		const post = new Post({
			user: userId,
			text,
			name: user.name,
			avatar: user.avatar
		});

		await post.save();
		res.status(200).json(post);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route 	GET api/posts
 * @description get all posts
 * @access private
 */
router.get('/', auth, async (_, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.status(200).json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route 	GET api/posts/:post_id
 * @description get post by id
 * @access private
 */
router.get('/:post_id', auth, async (req, res) => {
	const { post_id } = req.params;
	try {
		const post = await Post.findById(post_id);
		if (!post) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		res.status(200).json(post);
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		console.error(err.message);
		res.status(500).send('Serve Error');
	}
});

/**
 * @route 	DELETE api/posts/:post_id
 * @description delete post by id only if user is the owner of request
 * @access private
 */
router.delete('/:post_id', auth, async (req, res) => {
	const { post_id: postId } = req.params;
	const { user: { id: userId } } = req;

	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		// user Id obtained of token is string, user Id obtained of Post query is an ObjectId
		if (userId !== post.user.toString()) {
			return res.status(400).json({ errors: [ { msg: 'UnAuthorized User' } ] });
		}
		await post.delete();
		res.status(200).json({ message: 'Post Deleted' });
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		console.error(err.message);
		res.status(500).send('Serve Error');
	}
});

/**
 * @route 	POST api/posts/like/:post_id
 * @description send a like to post by its post_id
 * @access private
 */
router.put('/like/:post_id', auth, async (req, res) => {
	const { user: { id: userId } } = req;
	const { params: { post_id: postId } } = req;

	try {
		let post = await Post.findById(postId);

		if (!post) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		if (post.likes.filter(like => like.user.toString() === userId).length > 0) {
			return res.status(400).json({ errors: [ { msg: 'You have already liked this post before' } ] });
		}
		post.likes.unshift({ user: userId });
		await post.save();
		res.status(200).json(post.likes);
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		console.error(err.message);
		res.status(500).send('Serve Error');
	}
});

/**
 * @route 	DELETE api/posts/like/:post_id
 * @description unlike a post that is current liked by user logged
 * @access private
 */
router.put('/unlike/:post_id', auth, async (req, res) => {
	const { user: { id: userId } } = req;
	const { params: { post_id: postId } } = req;

	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		if (post.likes.filter(like => like.user.toString() === userId).length == 0) {
			return res.status(400).json({ errors: [ { msg: 'Post has not yet been liked for you' } ] });
		}
		post.likes = post.likes.filter(like => like.user.toString() !== userId);
		await post.save();
		res.status(200).json(post.likes);
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		console.error(err.message);
		res.status(500).send('Serve Error');
	}
});

/**
 * @route POST api/posts/comment/post_id
 * @description post new comment to a post by its id
 * @access private
 */
router.post('/comment/:post_id', auth, [ check('text', 'test is required').not().isEmpty() ], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		const { id: userId } = req.user;
		const { text } = req.body;
		const { post_id: postId } = req.params;
		const user = await User.findById(userId).select('-password');
		const post = await Post.findById(postId);

		if (!post || !user) {
			return res.status(400).json({ errors: [ { msg: 'Post or User Not Found' } ] });
		}
		post.comments.push({
			user: userId,
			text,
			name: user.name,
			avatar: user.avatar
		});
		await post.save();
		res.status(200).json(post.comments);
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		console.error(err.message);
		res.status(500).send('Serve Error');
	}
});

/**
 * @route 	DELETE api/comment/:post_id/:comment_id
 * @description delete post by id only if user is the owner of request
 * @access private
 */
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
	const { post_id: postId, comment_id: commentId } = req.params;
	const { id: userId } = req.user;

	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		const comment = post.comments.find(comment => comment.id.toString() === commentId);
		if (comment === undefined) {
			return res.status(400).json({ errors: [ { msg: 'This comment do not exist for this post' } ] });
		}
		// only the user that comments this post or user owner of post can delete it
		if (userId === comment.user.toString() || userId === post.user.toString()) {
			post.comments = post.comments.filter(comment => comment.id.toString() !== commentId);
			await post.save();
			return res.status(200).json(post.comments);
		} else {
			return res.status(400).json({ errors: [ { msg: 'UnAuthorized User' } ] });
		}
	} catch (err) {
		if ((err.kind = 'ObjectId')) {
			return res.status(400).json({ errors: [ { msg: 'Post Not Found' } ] });
		}
		console.error(err.message);
		res.status(500).send('Serve Error');
	}
});

module.exports = router;
