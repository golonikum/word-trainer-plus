import React from 'react';
import { Image } from 'react-bootstrap';
import { STYLE } from '../../constants';

const MyProfile = ({ user }) =>
	<div className={STYLE.RESPONSIVE_PAGE}>
		<h2>Настройки</h2>
		<Image src={user.avatar} alt="Avatar" rounded/>
		{
			user.name || user.email
			? <p>Привет, {user.name || user.email}{user.name ? ` (${user.email})` : ''}!</p>
			: ''
		}
		{
			user.role === 'admin'
			? <p>Вы - <b>Администратор</b>.</p>
			: ''
		}
	</div>

export default MyProfile