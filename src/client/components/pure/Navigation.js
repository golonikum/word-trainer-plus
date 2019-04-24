import React from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import SelectLanguageContainer from '../container/SelectLanguageContainer';
import FlagIcon from './FlagIcon';
import { PROJECT } from '../../constants';

const Navigation = ({ user, manualLogout }) =>
	<Navbar bg="light" expand="md" style={{
		marginBottom: '8px',
	}}>
		{
			user.authenticated 
			? <Dropdown>
				<Dropdown.Toggle variant="outline-info"><span style={{
                        marginRight: '8px'
				}}>{user.name || user.email}</span>{ user.language ? <FlagIcon code={user.language.code} /> : '' }</Dropdown.Toggle>
				<Dropdown.Menu>
					<LinkContainer to="/myprofile"><Nav.Link><i className="fa fa-user"></i> Настройки</Nav.Link></LinkContainer>
					<Dropdown.Divider />
					<SelectLanguageContainer/>
					<Dropdown.Divider />
					<Nav.Link onClick={(e) => {
						e.preventDefault()
						manualLogout()
					}}><i className="fa fa-sign-out"></i> Выход</Nav.Link>
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
						<IndexLinkContainer to="/"><Nav.Link><i className="fa fa-home"></i> Главная</Nav.Link></IndexLinkContainer>
					</div>
					{
						!user.authenticated 
						? <>
							<div className="col-auto">
								<LinkContainer to="/register"><Nav.Link><i className="fa fa-user-plus"></i> Регистрация</Nav.Link></LinkContainer>
							</div>	
							<div className="col-auto">
								<LinkContainer to="/login"><Nav.Link><i className="fa fa-sign-in"></i> Вход</Nav.Link></LinkContainer>
							</div>	
						</> 
						: <>
							<div className="col-auto">
								<LinkContainer to="/source"><Nav.Link><i className="fa fa-database"></i> Источники</Nav.Link></LinkContainer>
							</div>	
						</>
					}
				</Nav>
			</div>
		</Navbar.Collapse>
	</Navbar>

export default Navigation