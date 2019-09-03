import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileDetailExperience = ({ experience }) => {
	return experience.length > 0 ? (
		experience.map(({ _id, company, title, from, to, current, description }) => (
			<Fragment key={_id}>
				<h3 className='text-dark'>{company}</h3>
				<p>
					<Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
					{current ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
				</p>
				<p>
					<strong>Position: </strong>
					{title}
				</p>
				{description && (
					<p>
						<strong>Description: </strong>
						{description}
					</p>
				)}
			</Fragment>
		))
	) : (
		<h3> There aren't experience credentials yet </h3>
	);
};

ProfileDetailExperience.propTypes = {
	experience: PropTypes.array.isRequired
};

export default ProfileDetailExperience;
