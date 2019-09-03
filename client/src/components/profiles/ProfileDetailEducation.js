import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileDetailEducation = ({ education }) => {
	return education.length > 0 ? (
		<Fragment>
			{education.map(({ _id, school, degree, fieldOfStudy, from, to, current, description }) => (
				<Fragment key={_id}>
					<h3>{school}</h3>
					<p>
						<Moment format='DD/MM/YYYY'>{from}</Moment> -{' '}
						{current ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>}
					</p>
					<p>
						<strong>Degree: </strong>
						{degree}
					</p>
					<p>
						<strong>Field Of Study: </strong>
						{fieldOfStudy}
					</p>
					{description && (
						<p>
							<strong>Description: </strong>
							{description}
						</p>
					)}
				</Fragment>
			))}
		</Fragment>
	) : (
		<h3> There aren't education credentials yet </h3>
	);
};

ProfileDetailEducation.propTypes = {
	education: PropTypes.array.isRequired
};

export default ProfileDetailEducation;
