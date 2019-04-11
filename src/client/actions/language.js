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

function makeUserRequest(method, data, api='/login') {
	// returns a Promise
	return axios({
		method: method,
		url: api,
		data: data
	});
}

export function onChange(id) {	
	return dispatch => {
		dispatch(beginLogin());

		return makeUserRequest('post', data, '/login')	
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
