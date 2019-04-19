import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import SelectLanguageContainer from '../container/SelectLanguageContainer';
import FlagIcon from './FlagIcon';
import { PROJECT, STYLE } from '../../constants';

const Navigation = ({ user, manualLogout }) =>
	<Navbar bg="light" expand="md">
		{
			user.authenticated 
			? <Dropdown>
				<Dropdown.Toggle variant="outline-info"><span style={{
                        marginRight: '8px'
                    }}>{user.name || user.email}</span><FlagIcon code={user.language.code} /></Dropdown.Toggle>
				<Dropdown.Menu>
					<LinkContainer to="/myprofile"><Nav.Link>Настройки</Nav.Link></LinkContainer>
					<Dropdown.Divider />
					<SelectLanguageContainer/>
					<Dropdown.Divider />
					<Nav.Link onClick={(e) => {
						e.preventDefault()
						manualLogout()
					}}>Выход</Nav.Link>
				</Dropdown.Menu>
			</Dropdown>
			: <Navbar.Brand>{PROJECT.TITLE}</Navbar.Brand>
		}
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav">
			<div className="container-fluid">
				<Nav className="row">					
					<div className="col-auto mr-auto"></div>
					<div className="col-auto">
						<IndexLinkContainer to="/"><Nav.Link>Главная</Nav.Link></IndexLinkContainer>
					</div>
					{
						!user.authenticated 
						? <>
							<div className="col-auto">
								<LinkContainer to="/register"><Nav.Link>Регистрация</Nav.Link></LinkContainer>
							</div>	
							<div className="col-auto">
								<LinkContainer to="/login"><Nav.Link>Вход</Nav.Link></LinkContainer>
							</div>	
						</> : ''
					}
				</Nav>
			</div>
		</Navbar.Collapse>
	</Navbar>

export default Navigation