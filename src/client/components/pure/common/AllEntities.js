import React, { useState, useEffect } from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../../constants';
import LoadingIndicator from '../LoadingIndicator';

const AllEntities = ({ user, title, entity }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(`/api/${entity}`);
            setData(result.data);
        }
        fetchData();
    }, [user.language]);

    return (
        <div className={STYLE.RESPONSIVE_PAGE}>
            <h2>{title} <Badge variant="secondary">{data && data.success && data.items.length}</Badge></h2>
            <LinkContainer to={`/${entity}/set`}><Nav.Link><i className="fa fa-plus"></i> Добавить</Nav.Link></LinkContainer>
            {
                data && data.success
                ? <>
                    {
                        data.items && data.items.length
                        ? <ol>
                            {data.items.map(item => (
                                <li key={item._id}><LinkContainer to={`/${entity}/${item._id}`}><Nav.Link>{item.name} <Badge variant="secondary">0</Badge></Nav.Link></LinkContainer></li>
                            ))}
                        </ol>
                        : <p>Ничего нет, пока</p>
                    }
                </>
                : <LoadingIndicator data={data} />
            }
            
        </div>
    );
}

export default AllEntities