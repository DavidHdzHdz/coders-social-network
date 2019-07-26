import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { PropTypes } from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({});
	const handleChance = event => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	const handleSubmit = event => {
		event.preventDefault();
		login({ ...formData });
	};

	return (
		<Fragment>
			{isAuthenticated && <Redirect to='/dashboard' />}
			<h1 className='large text-primary'>Sing In</h1>
			<p className='lead'>
				<FontAwesomeIcon icon={faUser} /> Sign Into Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input type='email' placeholder='Email Address' name='email' onChange={handleChance} required />
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
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
