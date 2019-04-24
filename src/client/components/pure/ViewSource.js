import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../constants';
import LoadingIndicator from './LoadingIndicator';

const ViewSource = ({ user, match }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(`/api/source/${match.params.id}`);
            setData(result.data);
        }
        fetchData();
    }, [user.language]);

    return (
        <div className={STYLE.RESPONSIVE_PAGE}>
            <h2>Источник</h2>
            {
                data && data.success
                ? <>
                    <LinkContainer to={`/source/set/${data.item._id}`}><Nav.Link><i className="fa fa-edit"></i> Изменить</Nav.Link></LinkContainer>
                    <LinkContainer to={`/source/remove/${data.item._id}`}><Nav.Link><i className="fa fa-trash"></i> Удалить</Nav.Link></LinkContainer>
                    <div>{data.item.name}</div>
                </>
                : <LoadingIndicator data={data} />
            }
        </div>
    );	
};

export default ViewSource
