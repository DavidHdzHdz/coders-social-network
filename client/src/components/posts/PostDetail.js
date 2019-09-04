import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/post';
import { Link } from 'react-router-dom';
import PostsItem from './PostsItem';
import CommentForm from './CommentForm';

const PostDetail = ({ post, loading, getPostById, match }) => {
	useEffect(
		_ => {
			getPostById(match.params.id);
		},
		[ getPostById, match.params.id ]
	);

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/posts' className='btn'>
						Back to posts
					</Link>
					{post === null ? (
						<h3>Cannot get the post detail in this moment</h3>
					) : (
						<Fragment>
							<PostsItem post={post} showActions={false} />
							<CommentForm id={post._id} />
						</Fragment>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

PostDetail.propTypes = {
	loading: PropTypes.bool.isRequired,
	getPostById: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired
};

const mapStateToPorps = state => ({
	post: state.post.post,
	loading: state.post.loading
});

export default connect(mapStateToPorps, { getPostById })(PostDetail);
