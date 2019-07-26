import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, isLoading, ...rest }) => (
	<Route
		{...rest}
		render={props => (!isAuthenticated && !isLoading ? <Redirect to='/login' /> : <Component {...props} />)}
	/>
);

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	isLoading: state.auth.isLoading
});

export default connect(mapStateToProps)(PrivateRoute);
