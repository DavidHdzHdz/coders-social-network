import axios from 'axios';
import {
	GET_POSTS,
	POSTS_ERROR,
	LOADING_POST,
	UPDATE_LIKE,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	POST_ERROR,
	ADD_COMMENT
} from './types';
import { setAlert } from './alert';

// get all posts action
export const getPosts = _ => async dispatch => {
	try {
		dispatch({ type: LOADING_POST });
		const { data: posts } = await axios.get('/api/posts');
		dispatch({ type: GET_POSTS, payload: posts });
	} catch (err) {
		if (err.response) {
			dispatch(setAlert(`${err.response.statusText}, try later`, 'danger'));
			dispatch({ type: POSTS_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
		} else {
			console.log(err);
		}
	}
};

// like and unlike actions
export const setLike = postId => dispatch => {
	axios.put(`api/posts/like/${postId}`).then(({ data: likes }) => {
		dispatch({ type: UPDATE_LIKE, payload: { likes, postId } });
	});
};

export const setUnlike = postId => dispatch => {
	axios.put(`api/posts/unlike/${postId}`).then(({ data: likes }) => {
		dispatch({ type: UPDATE_LIKE, payload: { likes, postId } });
	});
};

// delete post action
export const deletePost = postId => async dispatch => {
	try {
		await axios.delete(`api/posts/${postId}`);
		dispatch({ type: DELETE_POST, payload: postId });
	} catch (err) {
		if (err.response) {
			dispatch(setAlert(`${err.response.statusText}, try later`, 'danger'));
		} else {
			console.log(err);
		}
	}
};

// create post
export const addPost = formData => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	try {
		const { data: newPost } = await axios.post('api/posts/', formData, config);
		dispatch({ type: ADD_POST, payload: newPost });
		dispatch(setAlert('Post added successfull', 'success'));
	} catch (err) {
		if (err.response) {
			dispatch(setAlert(`${err.response.statusText}, try later`, 'danger'));
		} else {
			console.log(err);
		}
	}
};

// get a post action
export const getPostById = postId => async dispatch => {
	try {
		dispatch({ type: LOADING_POST });
		const { data: post } = await axios.get(`../api/posts/${postId}`);
		dispatch({ type: GET_POST, payload: post });
	} catch (err) {
		if (err.response) {
			dispatch(setAlert(`${err.response.statusText}, try later`, 'danger'));
			dispatch({ type: POST_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
		} else {
			console.log(err);
		}
	}
};

// add comment action
export const addComment = (postId, formData) => async dispatch => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	try {
		const { data: comment } = await axios.post(`../api/posts/comment/${postId}`, formData, config);
		dispatch({ type: ADD_COMMENT, payload: comment });
		dispatch(setAlert('Comment added successfull', 'success'));
	} catch (err) {
		if (err.response) {
			dispatch(setAlert(`${err.response.statusText}, try later`, 'danger'));
		} else {
			console.log(err);
		}
	}
};
