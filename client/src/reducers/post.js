import { GET_POSTS, POSTS_ERROR, LOADING_POST } from '../actions/types';

const initialState = {
	post: null,
	posts: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING_POST:
			return { ...state, loading: true };
		case GET_POSTS:
			return { ...state, posts: payload, error: {}, loading: false };
		case POSTS_ERROR:
			return { ...state, posts: [], error: payload, loading: false };
		default:
			return state;
	}
}
