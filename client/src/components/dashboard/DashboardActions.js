import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserTie, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DashboardActions = _ => {
	return (
		<div className='dash-buttons'>
			<Link to='/edit-profile' className='btn btn-light'>
				<FontAwesomeIcon icon={faUserCircle} className='text-primary' /> Edit Profile
			</Link>
			<Link to='/add-experience' className='btn btn-light'>
				<FontAwesomeIcon icon={faUserTie} className='text-primary' /> Add Experience
			</Link>
			<Link to='/add-education' className='btn btn-light'>
				<FontAwesomeIcon icon={faGraduationCap} className='text-primary' /> Add Education
			</Link>
		</div>
	);
};

export default DashboardActions;
