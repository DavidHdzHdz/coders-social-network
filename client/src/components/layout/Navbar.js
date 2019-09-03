import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { PropTypes } from 'prop-types';

const Navbar = ({ isAuthenticated, isLoading, logout }) => {
	const loggedNavItems = (
		<ul>
			<li>
				<Link to='/posts'>Posts</Link>
			</li>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<FontAwesomeIcon icon={faUser} /> Dashboard
				</Link>
			</li>
			<li>
				<a onClick={logout} href='#!'>
					<FontAwesomeIcon icon={faSignOutAlt} /> Logout
				</a>
			</li>
		</ul>
	);

	const authNavItems = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);

	return (
		<div>
			<nav className='navbar bg-dark'>
				<h1>
					<Link to='/'>
						<FontAwesomeIcon icon={faCode} /> CodersNetwork
					</Link>
				</h1>
				{!isLoading && isAuthenticated ? loggedNavItems : authNavItems}
			</nav>
		</div>
	);
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { logout })(Navbar);
