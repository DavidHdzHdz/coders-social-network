import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../actions/post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import PostsItem from './PostsItem';

const PostsList = ({ post: { posts, loading }, getPosts }) => {
	useEffect(
		_ => {
			getPosts();
		},
		[ getPosts ]
	);

	return (
		<Fragment>
			{loading && <Spinner />}
			{!loading && (
				<Fragment>
					<h1 className='large text-primary'>Posts</h1>
					<p className='lead'>
						<FontAwesomeIcon icon={faUser} /> Welcome to the community!
					</p>
					<div className='posts'>{posts.map(post => <PostsItem key={post._id} post={post} />)}</div>
				</Fragment>
			)}
		</Fragment>
	);
};

PostsList.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(PostsList);
