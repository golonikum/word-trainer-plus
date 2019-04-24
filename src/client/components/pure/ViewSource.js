import React, { useState, useEffect } from 'react';
import { Nav, Spinner, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../constants';

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
                    <LinkContainer to={`/sources/set/${data.item._id}`}><Nav.Link><i className="fa fa-edit"></i> Изменить</Nav.Link></LinkContainer>
                    <div>{data.item.name}</div>
                </>
                : (data && data.message ? <Alert variant="danger">{data.message}</Alert> : <Spinner animation="border" variant="primary" role="status"><span className="sr-only">Loading...</span></Spinner>)
            }
        </div>
    );	
};

export default ViewSource
