import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
	const renderEducationItems = _ => {
		return education.map(edu => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td className='hide-sm'>{edu.degree}</td>
				<td className='hide-sm'>
					<Moment format='DD/MM/YYYY'>{edu.from}</Moment> -{' '}
					{edu.current ? 'Now' : <Moment format='DD/MM/YYYY'>{edu.to}</Moment>}
				</td>
				<td>
					<button
						className='btn btn-danger'
						onClick={_ => {
							deleteEducation(edu._id);
						}}
					>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	return (
		<Fragment>
			<h2 className='my-2'>Education Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>School</th>
						<th className='hide-sm'>Degree</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{renderEducationItems()}</tbody>
			</table>
		</Fragment>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
