import axios from 'axios';
import { setAlert } from './alert';
import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	LOGOUT,
	GET_PROFILES,
	PROFILES_ERROR,
	LOADING_PROFILE,
	CLEAR_PROFILE
} from './types';

/**
 * logged user profile actions
 */
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

export const addExperience = (experienceData, history) => async dispatch => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		experienceData.to = experienceData.current ? '' : experienceData.to;
		const { data: profile } = await axios.put('api/profile/experience', experienceData, config);
		dispatch({ type: UPDATE_PROFILE, payload: profile });
		dispatch(setAlert('new Experience added successfull', 'success'));
		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
	}
};

export const deleteExperience = id => async dispatch => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data: profile } = await axios.delete(`api/profile/experience/${id}`, config);
		dispatch({ type: UPDATE_PROFILE, payload: profile });
		dispatch(setAlert('experience item deleted successfull', 'success'));
	} catch (err) {
		dispatch(setAlert(err.response.statusText, 'danger'));
	}
};

export const addEducation = (educationData, history) => async dispatch => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		educationData.to = educationData.current ? '' : educationData.to;
		const { data: profile } = await axios.put('api/profile/education', educationData, config);
		dispatch({ type: UPDATE_PROFILE, payload: profile });
		dispatch(setAlert('new Education item added successfull', 'success'));
		history.push('/dashboard');
	} catch (err) {
		const errors = err.response.data.errors;
		errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
	}
};

export const deleteEducation = id => async dispatch => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const { data: profile } = await axios.delete(`api/profile/education/${id}`, config);
		dispatch({ type: UPDATE_PROFILE, payload: profile });
		dispatch(setAlert('education item deleted successfull', 'success'));
	} catch (err) {
		dispatch(setAlert(err.response.statusText, 'danger'));
	}
};

export const deleteAccount = _ => async dispatch => {
	if (window.confirm('Are you sure you want delete your account, THIS ACTION IS NOT REVERSIBLE?')) {
		try {
			await axios.delete('api/profile');
			dispatch({ type: LOGOUT });
			dispatch(setAlert('Your account has been deleted'));
		} catch (err) {
			dispatch(setAlert('server error, try it later', 'danger'));
		}
	}
};

/**
 * others users profiles actions
 */
export const getProfiles = _ => async dispatch => {
	try {
		dispatch({ type: CLEAR_PROFILE });
		dispatch({ type: LOADING_PROFILE });
		const { data: profiles } = await axios.get('api/profile');
		dispatch({ type: GET_PROFILES, payload: profiles });
	} catch (err) {
		dispatch({ type: PROFILES_ERROR });
		dispatch(setAlert(`${err.response.statusText}, try later`));
	}
};

export const getProfileById = id => async dispatch => {
	try {
		dispatch({ type: LOADING_PROFILE });
		const { data: profile } = await axios.get(`../api/profile/${id}`);
		dispatch({ type: UPDATE_PROFILE, payload: profile });
	} catch (err) {
		dispatch(setAlert(`${err.response.statusText}, try later`));
	}
};
