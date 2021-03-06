import React from 'react'
import { Dropdown } from 'react-bootstrap';
import FlagIcon from './FlagIcon'

const SelectLanguage = ({ user, languages, onChangeLang }) => {
    const lang = user.language;
    return (
        <>
            {languages.map(item =>
                <Dropdown.Item as="button" key={item._id} active={lang && item._id === lang._id ? 1 : 0} onClick={(e) => {
                    e.preventDefault()
                    onChangeLang({
                        id: item._id,
                        email: user.email
                    })
                }}>
                    <FlagIcon code={item.code} />
                    <span style={{
                        marginLeft: '8px'
                    }}>{item.name}</span>
                </Dropdown.Item>)}
        </>
    );
}

export default SelectLanguage