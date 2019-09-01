import {
	GET_PROFILE,
	PROFILE_ERROR,
	LOGOUT,
	UPDATE_PROFILE,
	GET_PROFILES,
	PROFILES_ERROR,
	LOADING_PROFILE,
	CLEAR_PROFILE
} from '../actions/types';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
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
			return { ...state, profile: null };
		case GET_PROFILES:
			return { ...state, profiles: payload, loading: false };
		case PROFILES_ERROR:
			return { ...state, profiles: [], loading: false };
		case LOGOUT:
			return { ...initialState };
		default:
			return state;
	}
}
