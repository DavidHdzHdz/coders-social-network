import { GET_PROFILE, PROFILE_ERROR, LOGOUT } from '../actions/types';

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
		case GET_PROFILE:
			return { ...state, profile: payload, error: {}, loading: false };
		case PROFILE_ERROR:
			return { ...state, profile: null, error: payload, loading: false };
		case LOGOUT:
			return { ...initialState };
		default:
			return state;
	}
}
