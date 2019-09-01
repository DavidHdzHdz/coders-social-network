import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { PropTypes } from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

const AddEducation = ({ addEducation, history }) => {
	const [ formData, setFormData ] = useState({
		school: '',
		degree: '',
		fieldOfStudy: '',
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
		addEducation(formData, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-graduation-cap' /> Add any school, bootcamp, etc that you have attended
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School or Bootcamp'
						name='school'
						required
						onChange={handleOnChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree or Certificate'
						name='degree'
						required
						onChange={handleOnChange}
					/>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Field Of Study' name='fieldOfStudy' onChange={handleOnChange} />
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
						Current School or Bootcamp
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
						placeholder='Program Description'
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

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(withRouter(AddEducation));
