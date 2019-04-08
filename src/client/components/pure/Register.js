import React from "react"
import ReactDOM from "react-dom"

// ----------------------------------------------------
const registerMessageStyle = {
	color: "red"
}

// ----------------------------------------------------
class Register extends React.Component{

	state = {
		registerMessage: ""
	}

	constructor(props) {
		super(props)
		this.submit = this.submit.bind(this)
	}

	submit(event) {
		event.preventDefault()
		const email = ReactDOM.findDOMNode(this.refs.email).value
		const name = ReactDOM.findDOMNode(this.refs.name).value
		const password = ReactDOM.findDOMNode(this.refs.password).value
		
		// Passed in via react-redux. Returns a promise.
		this.props.manualRegister({
			email,
			name,
			password
		})
		.then((registerMessage) => {
			if (registerMessage) {
				// report to the user is there was a problem during registration
				this.setState({
					registerMessage
				})			
			}	
		})		
	}

	render() {
		return(
			<div className="container-fluid">
				<h2>Register</h2>	
				<form onSubmit={this.submit}>		
					<input type="email" ref="email" placeholder="Email"/><br/>
					<input type="text" ref="name" placeholder="Name"/><br/>
					<input type="password" ref="password" placeholder="Password"/><br/>					
					<input type="submit" value="Register" /> <span style={registerMessageStyle}>{ this.state.registerMessage }</span>
				</form>	
			</div>
		)	
	}
}

export default Register