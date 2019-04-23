import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../constants';

const Sources = ({ user }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const result = await axios('/api/source');
            debugger
            setData(result.data.items);
        }
        fetchData();
    }, [user.language]);

    return (
        <div className={STYLE.RESPONSIVE_PAGE}>
            <h2>Источники</h2>
            <LinkContainer to="/sources/add"><Nav.Link><i className="fa fa-plus"></i> Добавить</Nav.Link></LinkContainer>
            {
                data.length
                ? <ul>
                    {data.map(item => (
                        <li key={item._id}>{item.name}</li>
                    ))}
                </ul>
                : <p>Ничего нет, пока</p>
            }
            
        </div>
    );
}

export default Sources