import {
	GET_PROFILE,
	PROFILE_ERROR,
	LOGOUT,
	UPDATE_PROFILE,
	GET_PROFILES,
	PROFILES_ERROR,
	LOADING_PROFILE,
	CLEAR_PROFILE,
	GET_REPOS,
	REPOS_ERROR
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	reposError: false,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING_PROFILE:
			return { ...state, loading: true };
		case GET_PROFILE:
		case UPDATE_PROFILE:
			return { ...state, profile: payload, error: {}, loading: false };
		case PROFILE_ERROR:
			return { ...state, profile: null, error: payload, loading: false };
		case CLEAR_PROFILE:
			return { ...state, profile: null, profiles: [], repos: [], reposError: false, error: {} };
		case GET_PROFILES:
			return { ...state, profiles: payload, error: {}, loading: false };
		case PROFILES_ERROR:
			return { ...state, profiles: [], error: payload, loading: false };
		case GET_REPOS:
			return { ...state, repos: payload, reposError: false };
		case REPOS_ERROR:
			return { ...state, repos: [], reposError: true };
		case LOGOUT:
			return { ...initialState };
		default:
			return state;
	}
}
