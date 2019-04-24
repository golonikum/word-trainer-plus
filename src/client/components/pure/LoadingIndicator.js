import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';

const LoadingIndicator = ({ data }) => {
    return (
        data && data.message  
        ? <Alert variant="danger">{data.message}</Alert> 
        : <Spinner animation="border" variant="primary" role="status"><span className="sr-only">Loading...</span></Spinner>
    );
}

export default LoadingIndicator