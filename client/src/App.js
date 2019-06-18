import './App.css';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

const App = () => (
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

export default App;
