import React from 'react';
import { PROJECT, STYLE } from '../../constants';

const Default = () =>
	<div className={STYLE.RESPONSIVE_PAGE}>
		<h2>О системе</h2>				
		<p>Добро пожаловать в систему {PROJECT.TITLE}. Система позволяет хранить слова и выражения разных языков в удобном формате, а также помогает в их запоминании.</p>
	</div>

export default Default