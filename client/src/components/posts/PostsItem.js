import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { setLike, setUnlike, deletePost } from '../../actions/post';

const PostsItem = ({ post, auth: { user, loading }, setLike, setUnlike, deletePost, showActions = true }) => {
	const addClassToLikeButton = _ => {
		if (post.likes.filter(like => like.user === user._id).length === 0) {
			return 'btn btn-light';
		} else {
			return 'btn btn-primary';
		}
	};

	const handleLike = _ => {
		if (post.likes.filter(like => like.user === user._id).length === 0) {
			setLike(post._id);
		} else {
			setUnlike(post._id);
		}
	};

	const handleDeletePost = _ => {
		deletePost(post._id);
	};

	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${post.user}`}>
					<img className='round-img' src={post.avatar} alt='avatar' />
					<h4>{post.name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{post.text}</p>
				<p className='post-date'>
					Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
				</p>
				{showActions && (
					<Fragment>
						{!loading &&
						user && (
							<button type='button' className={addClassToLikeButton()} onClick={handleLike}>
								<FontAwesomeIcon icon={faThumbsUp} />
								{Array.isArray(post.likes) &&
								post.likes.length > 0 && <span> {post.likes.length}</span>}
							</button>
						)}
						<Link to={`/post/${post._id}`} className='btn btn-primary'>
							Discussion <span className='comment-count'>{post.comments.length}</span>
						</Link>
						{!loading &&
						user &&
						user._id === post.user && (
							<button type='button' className='btn btn-danger' onClick={handleDeletePost}>
								<FontAwesomeIcon icon={faTimes} />
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	);
};

PostsItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	setLike: PropTypes.func.isRequired,
	setUnlike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
	showActions: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { setLike, setUnlike, deletePost })(PostsItem);
