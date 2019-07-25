import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = _ => async dispatch => {
	setAuthToken(localStorage.getItem('token'));

	try {
		const res = await axios.get('/api/auth');
		dispatch({ payload: res.data, type: USER_LOADED });
	} catch (_) {
		dispatch({ payload: {}, type: AUTH_ERROR });
	}
};

export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: { 'Content-type': 'application/json' }
	};
	const body = JSON.stringify({ name, email, password });

	try {
		const response = await axios.post('api/users', body, config);

		dispatch({ payload: response.data, type: REGISTER_SUCCESS });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ payload: {}, type: REGISTER_FAIL });
	}
};

export const login = ({ email, password }) => async dispatch => {
	const config = {
		headers: { 'Content-type': 'application/json' }
	};
	const body = JSON.stringify({ email, password });

	try {
		const response = await axios.post('api/auth', body, config);

		dispatch({ payload: response.data, type: LOGIN_SUCCESS });
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ payload: {}, type: LOGIN_FAIL });
	}
};
