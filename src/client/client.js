import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore, { history } from './configureStore';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginContainer from './components/container/LoginContainer';
import RegisterContainer from './components/container/RegisterContainer';
import MyProfileContainer from './components/container/MyProfileContainer';
import Default from './components/pure/Default';
import NavigationContainer from './components/container/NavigationContainer';
import Whoops404 from './components/Whoops404';

const store = configureStore({
	user: window.__USER,
	languages: window.__LANGUAGES,
});

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
					<Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route path='/'
				component={() => (
					<div className='app'>
						<Route component={NavigationContainer} />
						<Switch>
							<Route exact path='/' component={Default} />
							<Route path='/login' component={LoginContainer} />
							<Route path='/register' component={RegisterContainer} />
							<PrivateRoute authed={store.getState().user.authenticated} path='/myprofile' component={MyProfileContainer} />
							<Route component={Whoops404} />
						</Switch>
					</div>
				)} />
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('app')
)
