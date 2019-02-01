import React from "react"
import NavigationContainer from "./NavigationContainer"

const App = React.createClass({
	render: function() {
		return(
			<div>
				<NavigationContainer />				
				{this.props.children}
				<hr/>
				<h5>					
					<iframe src="https://ghbtns.com/github-btn.html?user=golonikum&repo=word-trainer-plus&type=star&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe><br/>
					<a href="https://github.com/golonikum/word-trainer-plus">View on GitHub</a>
				</h5>

			</div>	
		)	
	}
})

export default App