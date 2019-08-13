import './App.css';
import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import setAuthToken from './utils/setAuthToken';
// redux
import { Provider } from 'react-redux';
import store from './store';
// actions
import { loadUser } from './actions/auth';

setAuthToken(localStorage.getItem('token'));

const App = () => {
	useEffect(_ => {
		store.dispatch(loadUser());
	});

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Landing} />
					<Fragment>
						<div className='container'>
							<Alert />
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<PrivateRoute exact path='/create-profile' component={CreateProfile} />
						</div>
					</Fragment>
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
