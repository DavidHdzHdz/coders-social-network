import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileDetailTop from './ProfileDetailTop';
import ProfileDetailAbout from './ProfileDetailAbout';
import ProfileDetailEducation from './ProfileDetailEducation';
import ProfileDetailExperience from './ProfileDetailExperience';
import ProfileDetailRepos from './ProfileDetailRepos';

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
					<div className='profile-grid my-1'>
						<ProfileDetailTop profile={profile} />
						<ProfileDetailAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							<div>
								<ProfileDetailExperience experience={profile.experience} />
							</div>
						</div>
						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							<div>
								<ProfileDetailEducation education={profile.education} />
							</div>
						</div>
						<ProfileDetailRepos githubUsername={profile.githubUsername} />
					</div>
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
