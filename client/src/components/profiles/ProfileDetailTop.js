import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faLinkedin, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const ProfileDetailTop = ({ profile }) => {
	return (
		<div className='profile-top bg-primary p-2'>
			<img className='round-img my-1' src={profile.user.avatar} alt='' />
			<h1 className='large'>{profile.user.name}</h1>
			<p className='lead'>
				{profile.status} {profile.company && `at ${profile.company}`}
			</p>
			<p>{profile.lacation && profile.lacation}</p>
			<div className='icons my-1'>
				{profile.website && (
					<a href={profile.website} target='_blank' rel='noopener noreferrer'>
						<FontAwesomeIcon icon={faGlobe} />
					</a>
				)}
				{profile.social.twitter && (
					<a href={profile.social.twitter} target='_blank' rel='noopener noreferrer'>
						<FontAwesomeIcon icon={faTwitter} />
					</a>
				)}
				{profile.social.facebook && (
					<a href={profile.social.facebook} target='_blank' rel='noopener noreferrer'>
						<FontAwesomeIcon icon={faFacebook} />
					</a>
				)}
				{profile.social.linkedin && (
					<a href={profile.social.linkedin} target='_blank' rel='noopener noreferrer'>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
				)}
				{profile.social.youtube && (
					<a href={profile.social.youtube} target='_blank' rel='noopener noreferrer'>
						<FontAwesomeIcon icon={faYoutube} />
					</a>
				)}
				{profile.social.instagram && (
					<a href={profile.social.instagram} target='_blank' rel='noopener noreferrer'>
						<FontAwesomeIcon icon={faInstagram} />
					</a>
				)}
			</div>
		</div>
	);
};

ProfileDetailTop.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfileDetailTop;
