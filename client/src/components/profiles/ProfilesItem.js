import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProfilesItem = ({ profile }) => {
	console.log(profile);
	return (
		<div className='profile bg-light'>
			<img className='round-img' src={profile.user.avatar} alt='' />
			<div>
				<h2>{profile.user.name}</h2>
				<p>
					{profile.status} {profile.company && `at ${profile.company}`}
				</p>
				<p>{profile.lacation && profile.lacation}</p>
				<Link to={`/profile/${profile.user._id}`} className='btn btn-primary'>
					View Profile
				</Link>
			</div>

			<ul>
				{profile.skills.slice(0, 5).map((skill, index) => (
					<li className='text-primary' key={index}>
						<FontAwesomeIcon icon={faCheck} /> {skill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfilesItem.propTypes = {
	profile: PropTypes.object.isRequired
};

export default ProfilesItem;
