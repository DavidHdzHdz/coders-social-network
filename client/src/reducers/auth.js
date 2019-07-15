import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	user: null,
	isAuthenticated: null,
	isLoading: null
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, isAuthenticated: true, isLoading: false };
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			return { ...state, ...payload, token: null, isAuthenticated: false, isLoading: false };
		default:
			return state;
	}
}
