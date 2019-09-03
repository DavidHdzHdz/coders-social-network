import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostsItem = ({ post, auth: { user, loading } }) => {
	return (
		<div className='post bg-white p-1 my-1'>
			<div>
				<Link to={`/profile/${post.user}`}>
					<img className='round-img' src={post.avatar} alt='avatar' />
					<h4>{post.name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{post.text}</p>
				<p className='post-date'>
					Posted on <Moment format='DD/MM/YYYY'>{post.date}</Moment>
				</p>
				<button type='button' className='btn btn-light'>
					<FontAwesomeIcon icon={faThumbsUp} />
					{Array.isArray(post.likes) && post.likes.length > 0 && <span> {post.likes.length}</span>}
				</button>
				<button type='button' className='btn btn-light'>
					<FontAwesomeIcon icon={faThumbsDown} />
				</button>
				<Link to={`/post/${post._id}`} className='btn btn-primary'>
					Discussion <span className='comment-count'>{post.comments.length}</span>
				</Link>
				{!loading &&
				user._id === post.user && (
					<button type='button' className='btn btn-danger'>
						<FontAwesomeIcon icon={faTimes} />
					</button>
				)}
			</div>
		</div>
	);
};

PostsItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(PostsItem);
