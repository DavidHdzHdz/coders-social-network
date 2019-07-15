import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
import axios from 'axios';
import setAlert from './alert';

export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: { 'Content-type': 'application/json' }
	};
	const body = JSON.stringify({ name, email, password });

	try {
		const response = await axios.post('api/users', body, config);

		dispatch({ payload: response.data, type: REGISTER_SUCCESS });
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			dispatch(setAlert(err.message, 'danger'));
		}
		dispatch({ payload: {}, type: REGISTER_FAIL });
	}
};
