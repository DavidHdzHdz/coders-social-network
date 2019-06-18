import { SET_ALERT, REMOVE_ALERT } from './types';
import uuid from 'uuid';

export const setAlert = (msg, alertType) => (dispatch) => {
	const id = uuid.v4();

	dispatch({
		payload: { id, msg, alertType },
		type: SET_ALERT
	});

	setTimeout(() => {
		dispatch({
			payload: { id },
			type: REMOVE_ALERT
		});
	}, 4000);
};
