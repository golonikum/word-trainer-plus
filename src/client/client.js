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

function ConditionalRoute({ component: Component, condition, redirectTo, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        condition === true ? (
					<Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
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
							<ConditionalRoute condition={!store.getState().user.authenticated} path='/login' component={LoginContainer} redirectTo='/myprofile' />
							<ConditionalRoute condition={!store.getState().user.authenticated} path='/register' component={RegisterContainer} redirectTo='/myprofile' />
							<ConditionalRoute condition={store.getState().user.authenticated} path='/myprofile' component={MyProfileContainer} redirectTo='/login' />
							<Route component={Whoops404} />
						</Switch>
					</div>
				)} />
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('app')
)
