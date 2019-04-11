import { ADD_LANG, UPDATE_LANG, DELETE_LANG } from "../constants"

const languages = (state = [], action) => {
	switch(action.type) {
		case ADD_LANG:
			return Object.assign({}, state)
		case UPDATE_LANG:
			return Object.assign({}, state)
		case DELETE_LANG:
			return Object.assign({}, state)
		default:
			return state
	}
}

export default languages