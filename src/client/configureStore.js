import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import isNode from "detect-node";
import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();

let middleware = [
    routerMiddleware(history),
    thunkMiddleware
];

// only add Redux-Logger on the client-side because it causes problems server-side.
if (!isNode) {
    middleware.push(createLogger());
}

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(...middleware)
    )
  );
  return store;
}
