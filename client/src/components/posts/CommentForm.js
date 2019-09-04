import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ addComment, id }) => {
	const [ text, setTextData ] = useState('');
	const handleChange = event => {
		setTextData(event.target.value);
	};
	const handleSubmit = event => {
		event.preventDefault();
		addComment(id, { text });
		setTextData('');
	};

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a Comment</h3>
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

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
