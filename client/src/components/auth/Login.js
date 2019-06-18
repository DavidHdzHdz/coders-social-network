import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
	const [ formData, setFormData ] = useState({});
	const handleChance = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = formData;
		await axios
			.post('http://localhost:5000/api/auth', { email, password })
			.then((response) => console.log(response.data))
			.catch((error) => console.log(error));
	};

	return (
		<Fragment>
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

export default Login;
