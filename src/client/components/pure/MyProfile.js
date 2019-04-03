import React from "react"

const MyProfile = ({ user }) =>
	<div>
		<h2>My Profile</h2>
		<p>Hi, {user.name}!</p>
		<p>You are {user.role === 'admin' ? 'an administrator' : 'a simple user'}.</p>
		<p>You're seeing this page because you logged in successfully! Try logging out, clicking the MyProfile link and then completing the login. You wil notice that it redirects you to MyProfile page :)</p>
	</div>

export default MyProfile