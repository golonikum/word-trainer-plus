import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../constants';
import LoadingIndicator from './LoadingIndicator';

const Sources = ({ user }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await axios('/api/source');
            setData(result.data);
        }
        fetchData();
    }, [user.language]);

    return (
        <div className={STYLE.RESPONSIVE_PAGE}>
            <h2>Источники</h2>
            <LinkContainer to="/source/set"><Nav.Link><i className="fa fa-plus"></i> Добавить</Nav.Link></LinkContainer>
            {
                data && data.success
                ? <>
                    {
                        data.items && data.items.length
                        ? <ul>
                            {data.items.map(item => (
                                <li key={item._id}><LinkContainer to={`/source/${item._id}`}><Nav.Link>{item.name}</Nav.Link></LinkContainer></li>
                            ))}
                        </ul>
                        : <p>Ничего нет, пока</p>
                    }
                </>
                : <LoadingIndicator data={data} />
            }
            
        </div>
    );
}

export default Sources