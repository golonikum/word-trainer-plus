import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';


const SelectLanguage = ({ user, languages, onChangeLang }) => {
    const lang = user.language;
    return (
        <DropdownButton id="dropdown-item-button" title={lang ? lang.name : 'Chooose...'} variant="info">
            {languages.map(item =>
                <Dropdown.Item as="button" data-id={item._id} data-email={user.email} key={item._id} active={lang && item._id === lang._id ? 1 : 0} onClick={onChangeLang}>{item.name}</Dropdown.Item>)}
        </DropdownButton>
    );
}

export default SelectLanguage