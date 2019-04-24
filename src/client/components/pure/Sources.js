import React, { useState, useEffect } from 'react';
import { Nav, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../constants';

const Sources = ({ user }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await axios('/api/source');
            setData(result.data.items);
        }
        fetchData();
    }, [user.language]);

    return (
        <div className={STYLE.RESPONSIVE_PAGE}>
            <h2>Источники</h2>
            <LinkContainer to="/sources/set"><Nav.Link><i className="fa fa-plus"></i> Добавить</Nav.Link></LinkContainer>
            {
                data && data.length
                ? <ul>
                    {data.map(item => (
                        <li key={item._id}><LinkContainer to={`/sources/${item._id}`}><Nav.Link>{item.name}</Nav.Link></LinkContainer></li>
                    ))}
                </ul>
                : (!data ? <Spinner animation="border" variant="primary" role="status"><span className="sr-only">Loading...</span></Spinner> : <p>Ничего нет, пока</p>)
            }
            
        </div>
    );
}

export default Sources