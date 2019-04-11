import axios from 'axios';
import * as types from '../constants';
import { history } from '../configureStore';

// 'Log In' action creators
function beginLogin() {
	return { type: types.LOGIN_USER };
}

function loginSuccess(data) {
	return { 
		type: types.LOGIN_SUCCESS_USER,
		data
	};
}

function loginError() {
	return { type: types.LOGIN_ERROR_USER };
}

// 'Log Out' action creators
function beginLogout() {
	return { type: types.LOGOUT_USER };
}

function logoutSuccess() {
	return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
	return { type: types.LOGOUT_ERROR_USER };
}

// 'Register' action creators
function beginRegister() {
	return { type: types.REGISTER_USER };
}

function registerSuccess() {
	return { type: types.REGISTER_SUCCESS_USER };
}

function registerError() {
	return { type: types.REGISTER_ERROR_USER };
}

// 'Change language' action creators
function beginChangeLang() {
	return { type: types.CHANGE_USER_LANG };
}

function changeLangSuccess(data) {
	return { type: types.CHANGE_USER_LANG_SUCCESS, data };
}

function changeLangError(message) {
	return { type: types.CHANGE_USER_LANG_ERROR, message: message };
}

function makeUserRequest(method, data, api='/login') {
	// returns a Promise
	return axios({
		method: method,
		url: api,
		data: data
	});
}

// Example of an Async Action Creator
// http://redux.js.org/docs/advanced/AsyncActions.html
export function manualLogin(
		data,
		successPath // path to redirect to upon successful log in
	) {	
	return dispatch => {
		dispatch(beginLogin());

		return makeUserRequest('post', data, '/api/login')	
			.then(response => {
				if (response.data.success) {					
					dispatch(loginSuccess(response.data));
					// use browserHistory singleton to control navigation. Will generate a 
					// state change for time-traveling as we are using the react-router-redux package
					history.push('/myprofile');
				} else {					
					dispatch(loginError());
					let loginMessage = response.data.message;
					return loginMessage;
				}
			})
			.catch(function (response) {
			    if (response instanceof Error) {
			      // Something happened in setting up the request that triggered an Error
			      console.log('Error', response.message);
			    }
		    });
	};
}

// Example of an Async Action Creator
// http://redux.js.org/docs/advanced/AsyncActions.html
export function manualLogout() {
	return dispatch => {
		dispatch(beginLogout());

		return axios.get('/api/logout')
			.then(response => {
				if (response.data.success) {
					dispatch(logoutSuccess());
					// use browserHistory singleton to control navigation. Will generate a 
					// state change for time-traveling as we are using the react-router-redux package
					history.push('/'); // logout to home page
				} else {
					dispatch(logoutError());
				}
			})
			.catch(response => {
			    if (response instanceof Error) {
			      // Something happened during logout that triggered an Error
			      console.log('Error', response.message);
			    }
			});
	};
}

export function manualRegister(data) {	
	
	return dispatch => {
		dispatch(beginRegister());

		return makeUserRequest('post', data, '/api/register')	
			.then(response => {
				if (response.data.success) {					
					dispatch(registerSuccess());
					dispatch(manualLogin(data, '/'));
					history.push('/myprofile');
				} else {					
					dispatch(registerError());
					let registerMessage = response.data.message;
					return registerMessage;
				}
			})
			.catch(response => {
			    if (response instanceof Error) {
			      // Something happened in setting up the request that triggered an Error
			      console.log('Error', response.message);
			    }
			});
	};

}

export function onChangeLang(e) {	
	
	return dispatch => {
		dispatch(beginChangeLang());

		const data = e.target.dataset;
		return makeUserRequest('post', {
			email: data.email,
			languageId: data.id,
		}, '/api/language')	
			.then(response => {
				if (response.data.success) {					
					dispatch(changeLangSuccess(response.data));
				} else {					
					dispatch(changeLangError(response.data.message));
					return response.data.message;
				}
			})
			.catch(response => {
			    if (response instanceof Error) {
			      // Something happened in setting up the request that triggered an Error
			      console.log('Error', response.message);
			    }
			});
	};

}