import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { STYLE } from '../../constants';

const Sources = ({ user }) => {
    const [data, setData] = useState([]);

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
            <Button variant="success"><i className="fa fa-plus"></i> Добавить</Button>
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