import React from "react"
import { NavLink } from "react-router-dom"
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

const Navigation = ({ user, manualLogout }) =>
	<Navbar bg="light" expand="lg">
		<Navbar.Brand href="/">Word Trainer Plus</Navbar.Brand>
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
				<NavLink to="/">Home</NavLink>
				{
					user.authenticated 
					? <Button variant="primary" onClick={(e) => {
						event.preventDefault()
						manualLogout()
					}}>Logout [{user.name || user.email}]</Button>
					: <NavLink to="/login">Log In</NavLink>
				}
				{
					!user.authenticated 
					? <NavLink to="/register">Register</NavLink>
					: <NavLink to="/myprofile">MyProfile</NavLink>
				}
			</Nav>
			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-success">Search</Button>
			</Form>
		</Navbar.Collapse>
	</Navbar>

export default Navigation