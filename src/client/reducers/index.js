import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import user from "./user"
import languages from "./languages"

export default (history) => combineReducers({
	router: connectRouter(history),
	user,
	languages,
})