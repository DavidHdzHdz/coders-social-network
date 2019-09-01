import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../layout/Spinner';
import ProfilesItem from './ProfilesItem';

const ProfilesList = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(_ => {
		getProfiles();
	}, []);

	return (
		<Fragment>
			{loading && <Spinner />}
			{!loading && (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<FontAwesomeIcon icon={faNetworkWired} /> Browse and connect with developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 &&
							profiles.map(profile => <ProfilesItem key={profile._id} profile={profile} />)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

ProfilesList.propTypes = {
	getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(ProfilesList);
