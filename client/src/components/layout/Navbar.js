import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
	return (
		<div>
			<nav className='navbar bg-dark'>
				<h1>
					<Link to='/'>
						<FontAwesomeIcon icon={faCode} /> CodersNetwork
					</Link>
				</h1>
				<ul>
					<li>
						<Link to='/'>Developers</Link>
					</li>
					<li>
						<Link to='/register'>Register</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
