import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	isAuthenticated: false,
	isLoading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, isAuthenticated: true, isLoading: false };
		case USER_LOADED:
			return { ...state, user: payload, isAuthenticated: true, isLoading: false };
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, isLoading: false };
		default:
			return state;
	}
}
