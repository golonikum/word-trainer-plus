import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import SelectLanguageContainer from '../container/SelectLanguageContainer';

const Navigation = ({ user, manualLogout }) =>
	<Navbar bg="light" expand="lg">
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<div className="container-fluid">
				<Nav className="row">				
					<div className="col-auto mr-auto">
						<IndexLinkContainer to="/"><Nav.Link>Home</Nav.Link></IndexLinkContainer>
					</div>
					<div className="col-auto">
						{
							!user.authenticated 
							? <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
							: <LinkContainer to="/myprofile"><Nav.Link>{ user.name || user.email }</Nav.Link></LinkContainer>
						}
					</div>
					<div className="col-auto">
						{
							user.authenticated 
							? <SelectLanguageContainer/>
							: ''
						}
					</div>
					<div className="col-auto">
						{
							user.authenticated 
							? <Button variant="success" onClick={(e) => {
								e.preventDefault()
								manualLogout()
							}}>Logout</Button>
							: <LinkContainer to="/login"><Nav.Link>Log In</Nav.Link></LinkContainer>
						}
					</div>
				</Nav>
			</div>
			{/* <Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<Button variant="outline-success">Search</Button>
			</Form> */}
		</Navbar.Collapse>
	</Navbar>

export default Navigation