import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { PropTypes } from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const AddExperience = ({ addExperience, history }) => {
	const [ formData, setFormData ] = useState({
		title: '',
		company: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});
	const handleOnChange = ({ target: { name, value } }) => {
		setFormData({ ...formData, [name]: value });
		console.log(formData);
	};
	const [ showToInput, showhideToInput ] = useState(false);
	const handleSubmit = event => {
		event.preventDefault();
		addExperience(formData, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-graduation-cap' /> Add any developer/programming positions that you have had in the
				past
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input type='text' placeholder='* Job Title' name='title' required onChange={handleOnChange} />
				</div>
				<div className='form-group'>
					<input type='text' placeholder='* Company' name='company' required onChange={handleOnChange} />
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Location' name='location' onChange={handleOnChange} />
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input type='date' name='from' onChange={handleOnChange} />
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							onChange={({ target: { name, checked } }) => {
								showhideToInput(checked);
								setFormData({ ...formData, [name]: checked });
							}}
						/>{' '}
						Current Job
					</p>
				</div>
				{!showToInput && (
					<div className='form-group'>
						<h4>To Date</h4>
						<input type='date' name='to' required={!showToInput} onChange={handleOnChange} />
					</div>
				)}
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						onChange={handleOnChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired
};

export default connect(null, { addExperience })(withRouter(AddExperience));
