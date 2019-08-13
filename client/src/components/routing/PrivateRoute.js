import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// validate a react component
import { isValidElementType } from 'react-is';

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...rest }) => (
	<Route
		{...rest}
		render={props => (!isAuthenticated && !isLoading ? <Redirect to='/login' /> : <Component {...props} />)}
	/>
);

// the first prop in propTypes is the way for validate a React Component
PrivateRoute.propTypes = {
	component: (props, propName) => {
		if (props[propName] && !isValidElementType(props[propName])) {
			return new Error(
				`Invalid prop 'component' supplied to 'PrivateRoute': the prop is not a valid React component`
			);
		}
	},
	isAuthenticated: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PrivateRoute);
