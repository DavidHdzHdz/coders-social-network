import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { removeComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentItem = ({ postId, postUser, comment, removeComment, auth: { user } }) => {
	const handleDelete = _ => removeComment(postId, comment._id);
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${comment.user}`}>
					<img className='round-img' src={comment.avatar} alt='avatar' />
					<h4>{comment.name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{comment.text}</p>
				<p className='post-date'>
					Posted on <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
				</p>
				{user &&
				(user._id === comment.user || user._id === postUser) && (
					<button type='button' className='btn btn-danger' onClick={handleDelete}>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				)}
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	comment: PropTypes.object.isRequired,
	removeComment: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
