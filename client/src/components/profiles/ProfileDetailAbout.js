import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const ProfileDetailAbout = ({ profile }) => {
	return (
		<div className='profile-about bg-light p-2'>
			{profile.bio && (
				<Fragment>
					<h2 className='text-primary'>{profile.user.name} Bio</h2>
					<p>{profile.bio}</p>
				</Fragment>
			)}
			<div className='line' />
			<h2 className='text-primary'>Skill Set</h2>
			<div className='skills'>
				{profile.skills.map((skill, index) => (
					<div className='p-1' key={index}>
						<FontAwesomeIcon icon={faCheck} /> {skill}
					</div>
				))}
			</div>
		</div>
	);
};

ProfileDetailAbout.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileDetailAbout;
