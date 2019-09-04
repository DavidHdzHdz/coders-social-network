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
} from '../actions/types';

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
		case UPDATE_LIKE:
			return {
				...state,
				posts: state.posts.map(post => (post._id === payload.postId ? { ...post, likes: payload.likes } : post))
			};
		case DELETE_POST:
			return { ...state, posts: state.posts.filter(post => post._id !== payload) };
		case ADD_POST:
			return { ...state, posts: [ payload, ...state.posts ] };
		case GET_POST:
			return { ...state, post: payload, error: {}, loading: false };
		case POST_ERROR:
			return { ...state, post: null, error: payload, loading: false };
		case ADD_COMMENT:
			return { ...state, post: { ...state.post, comments: [ payload, ...state.post.comments ] } };
		default:
			return state;
	}
}
