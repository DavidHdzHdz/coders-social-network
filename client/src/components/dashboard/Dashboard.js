import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Dashboard = ({ profile: { profile, loading }, auth: { user }, getProfile }) => {
	console.log(profile);
	useEffect(
		() => {
			getProfile();
		},
		[ getProfile ]
	);

	const welcomeMsg = (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<FontAwesomeIcon icon={faUser} /> Welcome {user && user.name}
			</p>
			{profile === null && (
				<div>
					<p>Hi you have not yet a profile, please add some info:</p>
					<Link to='create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</div>
			)}
		</Fragment>
	);

	return (
		<Fragment>
			{loading && <Spinner />}
			{!loading && welcomeMsg}
		</Fragment>
	);
};

Dashboard.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
