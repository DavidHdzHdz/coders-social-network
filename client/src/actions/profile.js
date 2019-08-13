import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';

// get Profile of current user logged
export const getProfile = _ => async dispatch => {
	try {
		const { data: profile } = await axios.get('api/profile/me');
		dispatch({ type: GET_PROFILE, payload: profile });
	} catch (err) {
		dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
	}
};

// create and update profile
export const setProfile = (profileData, history, edit = false) => async dispatch => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		profileData.social = {
			twitter: profileData.twitter,
			facebook: profileData.facebook,
			youtube: profileData.youtube,
			linkedin: profileData.linkedin,
			instagram: profileData.instagram
		};
		if (profileData.skills) {
			profileData.skills = profileData.skills.split(',').map(skill => skill.trim());
		}
		const { data: profile } = await axios.post('api/profile', profileData, config);
		dispatch({ type: GET_PROFILE, payload: profile });
		dispatch(setAlert(edit ? 'Profile updated successfull' : 'Profile created successfull', 'success'));
		if (!edit) history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
	}
};
