import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap';


const SelectLanguage = ({ user, languages, onChangeLang }) => {
    return (
        <DropdownButton id="dropdown-item-button" title={ user.language.name } variant="info">
            {languages.map(item =>
                <Dropdown.Item as="button" data-id={item._id} data-email={user.email} key={item._id} active={item._id === user.language._id ? 1 : 0} onClick={onChangeLang}>{item.name}</Dropdown.Item>)}
        </DropdownButton>
    );
}

export default SelectLanguage