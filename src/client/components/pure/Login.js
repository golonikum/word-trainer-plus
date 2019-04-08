import React, { PropTypes } from "react"
import ReactDOM from "react-dom"

// ----------------------------------------------------
class Login extends React.Component {

	state = {
		loginMessage: ""
	}

	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
	}

	submit(event) {
		event.preventDefault()
		const email = ReactDOM.findDOMNode(this.refs.email).value
		const password = ReactDOM.findDOMNode(this.refs.password).value

		// Passed in via react-redux. Returns a promise.
		this.props.manualLogin({ // this function is passed in via react-redux
			email,
			password			
		}, this.props.nextPathname) // holds the path to redirect to after login (if any)
		.then((loginMessage) => {
			if (loginMessage) {
				// report to the user is there was a problem during login
				this.setState({
					loginMessage
				})			
			}	
		})
	}

	render() {
		return(
			<div className="container-fluid">
				<h2>Log in</h2>		
				<form onSubmit={this.submit}>
					<input type="email" ref="email" placeholder="Email"/><br/>
					<input ref="password" type="password" placeholder="Password" /><br/>
					<input type="submit" value="Login" /> <span>{ this.state.loginMessage }</span>
				</form>	
			</div>	
		)
	}
}

export default Login