import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';
import { connect } from 'react-redux';

const PostForm = ({ addPost }) => {
	const [ text, setTextData ] = useState('');
	const handleChange = event => {
		setTextData(event.target.value);
		console.log(text);
	};
	const handleSubmit = event => {
		event.preventDefault();
		addPost({ text });
		setTextData('');
	};

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={handleSubmit}>
				<textarea
					cols='30'
					rows='5'
					placeholder='Create a post'
					value={text}
					onChange={handleChange}
					required
				/>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
