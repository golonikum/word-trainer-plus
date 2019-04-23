import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import configureStore, { history } from './configureStore';

import ConnectUser from './components/ConnectUser';
import Whoops404 from './components/Whoops404';
import LoginContainer from './components/container/LoginContainer';
import RegisterContainer from './components/container/RegisterContainer';
import MyProfileContainer from './components/container/MyProfileContainer';
import Default from './components/pure/Default';
import NavigationContainer from './components/container/NavigationContainer';
import Sources from './components/pure/Sources';

const store = configureStore({
	user: window.__USER,
	languages: window.__LANGUAGES,
});

store.isAuthed = function() {
	return this.getState().user.authenticated;
};

const ConditionalRoute = ({ component: Component, condition, redirectTo, ...rest }) =>
  <Route
		{...rest}
		render={props => condition === true ? <Component {...props} /> : <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} /> }
	/>

const AuthedRoute = ({ ...rest }) =>
	<ConditionalRoute 
		{...rest}
		condition={store.isAuthed()}
		redirectTo='/login'
	/>
	
const NotAuthedRoute = ({ ...rest }) =>
	<ConditionalRoute 
			{...rest}
			condition={!store.isAuthed()}
			redirectTo='/myprofile'
		/>

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route path='/'
				component={() => (
					<div className='app'>
						<Route component={NavigationContainer} />
						<Switch>
							<Route exact path='/' component={Default} />
							<NotAuthedRoute path='/login' component={LoginContainer} />
							<NotAuthedRoute path='/register' component={RegisterContainer} />
							<AuthedRoute path='/myprofile' component={MyProfileContainer} />
							<AuthedRoute exact path='/sources' component={ConnectUser(Sources)} />
							<Route component={Whoops404} />
						</Switch>
					</div>
				)} />
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('app')
)
