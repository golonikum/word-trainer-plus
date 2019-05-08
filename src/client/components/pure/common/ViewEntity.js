import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import { STYLE } from '../../../constants';
import LoadingIndicator from '../LoadingIndicator';

const ViewEntity = ({ user, match, entity }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(`/api/${entity}/${match.params.id}`);
            setData(result.data);
        }
        fetchData();
    }, [user.language]);

    return (
        <div className={STYLE.RESPONSIVE_PAGE}>
            <h2>{data && data.success && data.item.name}</h2>
            {
                data && data.success
                ? <div className="row">
                    <div className="col-auto">
                        <LinkContainer to={`/${entity}/set/${data.item._id}`}><Nav.Link><i className="fa fa-edit"></i> Изменить</Nav.Link></LinkContainer>
                    </div>	
                    <div className="col-auto">
                        <LinkContainer to={`/${entity}/remove/${data.item._id}`}><Nav.Link><i className="fa fa-trash"></i> Удалить</Nav.Link></LinkContainer>
                    </div>
                </div>
                : <LoadingIndicator data={data} />
            }
        </div>
    );	
};

export default ViewEntity
