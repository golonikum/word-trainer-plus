import { 
	LOGIN_USER,
	LOGIN_SUCCESS_USER,
	LOGIN_ERROR_USER,
	SIGNUP_USER,
	SIGNUP_SUCCESS_USER,
	SIGNUP_ERROR_USER,
	LOGOUT_USER,
	LOGOUT_SUCCESS_USER,
	LOGOUT_ERROR_USER,
	REGISTER_USER,
	REGISTER_SUCCESS_USER,
	REGISTER_ERROR_USER,
	CHANGE_USER_LANG,
	CHANGE_USER_LANG_SUCCESS,
	CHANGE_USER_LANG_ERROR
} from "../constants"

const user = (state = {
	isWaiting: false,
	authenticated: false,
	email: ""
}, action) => {
	switch(action.type) {
		case LOGIN_USER:
			return Object.assign({}, state, { isWaiting: true })
		case LOGIN_SUCCESS_USER:
			delete action.data.success;
			delete action.data.message;
			return Object.assign({}, state, { 
				isWaiting: false,
				authenticated: true,
				...action.data,
			})
		case LOGIN_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: false })
		case SIGNUP_USER:
			return Object.assign({}, state, { isWaiting: true })
		case SIGNUP_SUCCESS_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: true })
		case SIGNUP_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: false })
		case LOGOUT_USER:
			return Object.assign({}, state, { isWaiting: true })
		case LOGOUT_SUCCESS_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: false, email: "" })
		case LOGOUT_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false, authenticated: true })
		case REGISTER_USER:
			return Object.assign({}, state, { isWaiting: true })
		case REGISTER_SUCCESS_USER:
			return Object.assign({}, state, { isWaiting: false })
		case REGISTER_ERROR_USER:
			return Object.assign({}, state, { isWaiting: false })
		case CHANGE_USER_LANG:
			return Object.assign({}, state, { isWaiting: true })
		case CHANGE_USER_LANG_SUCCESS:
			return Object.assign({}, state, { isWaiting: false, language: action.data.language })
		case CHANGE_USER_LANG_ERROR:
			return Object.assign({}, state, { isWaiting: false })
		default:
			return state
	}
}

export default user