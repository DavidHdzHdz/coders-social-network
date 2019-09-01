import React, { Fragment, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faYoutube, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setProfile, getProfile } from '../../actions/profile';
import { PropTypes } from 'prop-types';

const CreateProfile = ({ profile: { profile, loading }, setProfile, getProfile }) => {
	const [ formData, setFormData ] = useState({});
	const [ showNetworksInputs, setShowNetworksInputs ] = useState(false);
	const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });
	const handleSubmit = event => {
		event.preventDefault();
		setProfile({ ...formData }, null, true);
	};

	useEffect(
		_ => {
			if (loading) {
				getProfile();
			}
			if (!loading && profile) {
				setFormData({ ...profile, ...profile.social, skills: profile.skills.join(', ') });
			}
		},
		[ loading ]
	);

	const {
		status,
		company,
		website,
		location,
		skills,
		githubUsername,
		bio,
		twitter,
		facebook,
		youtube,
		linkedin,
		instagram
	} = formData;

	return (
		<Fragment>
			<h1 className='large text-primary'>Update Your Profile</h1>
			<p className='lead'>
				<FontAwesomeIcon icon={faUser} /> Let's get some information to make your profile stand out
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<select name='status' value={status} onChange={handleChange}>
						<option value='0'>* Select Professional Status</option>
						<option value='Developer'>Developer</option>
						<option value='Junior Developer'>Junior Developer</option>
						<option value='Senior Developer'>Senior Developer</option>
						<option value='Manager'>Manager</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Instructor'>Instructor or Teacher</option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>Give us an idea of where you are at in your career</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Company' name='company' value={company} onChange={handleChange} />
					<small className='form-text'>Could be your own company or one you work for</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Website' name='website' value={website} onChange={handleChange} />
					<small className='form-text'>Could be your own or a company website</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={handleChange}
					/>
					<small className='form-text'>City & state suggested (eg. Boston, MA)</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='* Skills' name='skills' value={skills} onChange={handleChange} />
					<small className='form-text'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Github Username'
						name='githubUsername'
						value={githubUsername}
						onChange={handleChange}
					/>
					<small className='form-text'>
						If you want your latest repos and a Github link, include your username
					</small>
				</div>
				<div className='form-group'>
					<textarea placeholder='A short bio of yourself' name='bio' value={bio} onChange={handleChange} />
					<small className='form-text'>Tell us a little about yourself</small>
				</div>

				<div className='my-2'>
					<button
						type='button'
						className='btn btn-light'
						onClick={() => setShowNetworksInputs(!showNetworksInputs)}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				<div hidden={!showNetworksInputs}>
					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faTwitter}
							style={{ color: '#38a1f3', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input
							type='text'
							placeholder='Twitter URL'
							name='twitter'
							value={twitter}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faFacebook}
							style={{ color: '#4167b2', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input
							type='text'
							placeholder='Facebook URL'
							name='facebook'
							value={facebook}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faYoutube}
							style={{ color: '#c4302b', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input
							type='text'
							placeholder='YouTube URL'
							name='youtube'
							value={youtube}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faLinkedin}
							style={{ color: '#0077b5', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input
							type='text'
							placeholder='Linkedin URL'
							name='linkedin'
							value={linkedin}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faInstagram}
							style={{ color: '#d92a84', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input
							type='text'
							placeholder='Instagram URL'
							name='instagram'
							value={instagram}
							onChange={handleChange}
						/>
					</div>
				</div>

				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	getProfile: PropTypes.func.isRequired,
	setProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToPorps = state => ({
	profile: state.profile
});

export default connect(mapStateToPorps, { setProfile, getProfile })(CreateProfile);
