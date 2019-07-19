import './App.css';
import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
//import setAuthToken from './utils/setAuthToken';
// redux
import { Provider } from 'react-redux';
import store from './store';
// actions
import { loadUser } from './actions/auth';

//console.log('carga app.');
//setAuthToken(localStorage.getItem('token'));

const App = () => {
	/*
	// use efect is exexecute on mount, update an unmount with [] config only on mount
	useEffect(_ => {
		store.dispatch(loadUser());
	}, []);*/
	// normal use effect
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
						</div>
					</Fragment>
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
