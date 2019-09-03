import axios from 'axios';
import { GET_POSTS, POSTS_ERROR, LOADING_POST } from './types';
import { setAlert } from './alert';

// get posts
export const getPosts = _ => async dispatch => {
	try {
		dispatch({ type: LOADING_POST });
		const { data: posts } = await axios.get('/api/posts');
		dispatch({ type: GET_POSTS, payload: posts });
	} catch (err) {
		if (err.response) {
			dispatch(setAlert(`${err.response.statusText}, try later`));
			dispatch({ type: POSTS_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
		} else {
			console.log(err);
		}
	}
};
