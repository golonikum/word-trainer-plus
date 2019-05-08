import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import configureStore, { history } from './configureStore';

import ConnectUser from './components/ConnectUser';
import Whoops404 from './components/Whoops404';
import Default from './components/pure/Default';

import { LoginContainer, RegisterContainer, MyProfileContainer, NavigationContainer } from './components/container';
import { Sources, AddEditSource, ViewSource, RemoveSource } from './components/pure/sources';

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

							<AuthedRoute exact path='/source' component={ConnectUser(Sources)} />
							<AuthedRoute exact path='/source/set' component={ConnectUser(AddEditSource)} />
							<AuthedRoute path='/source/set/:id' component={ConnectUser(AddEditSource)} />
							<AuthedRoute path='/source/remove/:id' component={ConnectUser(RemoveSource)} />
							<AuthedRoute path='/source/:id' component={ConnectUser(ViewSource)} />
							
							<Route component={Whoops404} />
						</Switch>
					</div>
				)} />
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('app')
)
