import './App.css';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => (
	<Router>
		<Fragment>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Landing} />
				<div className='container'>
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</div>
			</Switch>
		</Fragment>
	</Router>
);

export default App;
