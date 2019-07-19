import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { PropTypes } from 'prop-types';

const Register = ({ setAlert, register }) => {
	const [ formData, setFormData ] = useState({});
	const handleChance = event => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	const handleSubmit = event => {
		event.preventDefault();
		const { password, password2 } = formData;

		if (password === password2) {
			register({ ...formData });
		} else {
			setAlert('passwords are not equals', 'danger');
		}
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<FontAwesomeIcon icon={faUser} /> Create Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input type='text' placeholder='Name' name='name' onChange={handleChance} required />
				</div>
				<div className='form-group'>
					<input type='email' placeholder='Email Address' name='email' onChange={handleChance} required />
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						onChange={handleChance}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						minLength='6'
						onChange={handleChance}
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
