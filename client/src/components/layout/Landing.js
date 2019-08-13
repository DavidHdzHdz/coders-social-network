import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	return (
		<section className='landing'>
			{/* redirect to dashboard if user is authenticated */}
			{isAuthenticated && <Redirect to='/dashboard' />}
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Coders Social Network</h1>
					<p className='lead'>
						Create a developer profile/portfolio, share posts and get help from other developers
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-light'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
