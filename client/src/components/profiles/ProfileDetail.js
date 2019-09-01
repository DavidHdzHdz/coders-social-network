import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const ProfileDetail = ({ match: { params }, getProfileById, profile: { profile, loading }, auth: { user } }) => {
	useEffect(
		_ => {
			getProfileById(params.id);
		},
		[ getProfileById, params.id ]
	);

	return (
		<Fragment>
			{loading && <Spinner />}
			{!loading &&
			profile !== null && (
				<Fragment>
					<Link to='/profiles' className='btn'>
						Back to profiles
					</Link>
					{user &&
					user._id === profile.user._id && (
						<Link to='/edit-profile' className='btn btn-primary'>
							Edit profile
						</Link>
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

ProfileDetail.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(ProfileDetail);
