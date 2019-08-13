import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faYoutube, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setProfile } from '../../actions/profile';
import { PropTypes } from 'prop-types';

const CreateProfile = ({ setProfile, history }) => {
	const [ formData, setFormData ] = useState({
		status: '',
		company: '',
		website: '',
		location: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		youtube: '',
		linkedin: '',
		instagram: ''
	});
	const [ showNetworksInputs, setShowNetworksInputs ] = useState(false);
	const handleChange = ({ target: { name, value } }) => setFormData({ ...formData, [name]: value });
	const handleSubmit = event => {
		event.preventDefault();
		setProfile({ ...formData }, history);
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<FontAwesomeIcon icon={faUser} /> Let's get some information to make your profile stand out
			</p>
			<small>* = required field</small>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<select name='status' onChange={handleChange}>
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
					<input type='text' placeholder='Company' name='company' onChange={handleChange} />
					<small className='form-text'>Could be your own company or one you work for</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Website' name='website' onChange={handleChange} />
					<small className='form-text'>Could be your own or a company website</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Location' name='location' onChange={handleChange} />
					<small className='form-text'>City & state suggested (eg. Boston, MA)</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='* Skills' name='skills' onChange={handleChange} />
					<small className='form-text'>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
				</div>
				<div className='form-group'>
					<input type='text' placeholder='Github Username' name='githubusername' onChange={handleChange} />
					<small className='form-text'>
						If you want your latest repos and a Github link, include your username
					</small>
				</div>
				<div className='form-group'>
					<textarea placeholder='A short bio of yourself' name='bio' onChange={handleChange} />
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
						<input type='text' placeholder='Twitter URL' name='twitter' onChange={handleChange} />
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faFacebook}
							style={{ color: '#4167b2', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input type='text' placeholder='Facebook URL' name='facebook' onChange={handleChange} />
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faYoutube}
							style={{ color: '#c4302b', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input type='text' placeholder='YouTube URL' name='youtube' onChange={handleChange} />
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faLinkedin}
							style={{ color: '#0077b5', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input type='text' placeholder='Linkedin URL' name='linkedin' onChange={handleChange} />
					</div>

					<div className='form-group social-input'>
						<FontAwesomeIcon
							icon={faInstagram}
							style={{ color: '#d92a84', width: '36px', height: '36px', marginRight: '20px' }}
						/>
						<input type='text' placeholder='Instagram URL' name='instagram' onChange={handleChange} />
					</div>
				</div>

				<input type='submit' className='btn btn-primary my-1' />
				<a className='btn btn-light my-1' href='dashboard.html'>
					Go Back
				</a>
			</form>
		</Fragment>
	);
};

CreateProfile.propTypes = {
	setProfile: PropTypes.func.isRequired
};

export default connect(null, { setProfile })(withRouter(CreateProfile));
