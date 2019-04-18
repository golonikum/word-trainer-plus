import React from "react"
import { Image } from 'react-bootstrap';

const MyProfile = ({ user }) =>
	<div className="container-fluid">
		<h2>My Profile</h2>
		<p>Hi, {user.name}!</p>
		<Image src={user.avatar} alt="Avatar" rounded/>
		<p>You are {user.role === 'admin' ? 'an administrator' : 'a simple user'}.</p>
		<p>You're seeing this page because you logged in successfully! Try logging out, clicking the MyProfile link and then completing the login. You wil notice that it redirects you to MyProfile page :)</p>
	</div>

export default MyProfile