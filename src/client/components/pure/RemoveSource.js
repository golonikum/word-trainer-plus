import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import { STYLE } from '../../constants';
import axios from 'axios';
import { history } from '../../configureStore';
import LoadingIndicator from './LoadingIndicator';

const RemoveSource = ({ user, match }) => {
	const id = match.params.id;
	const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const result = await axios(`/api/source/${id}`);
            setData(result.data);
        }
        id && fetchData();
	}, [user.language]);
	
	return (
		<div className={STYLE.RESPONSIVE_PAGE}>
			<h2>Удаление источника</h2>
			{
				data && data.success
				? <Formik
					initialValues={{}}
					onSubmit={(values, { setSubmitting, setErrors }) => {
						axios.delete(`/api/source/${id}`, {})
							.then(( { data } ) => {
                                if (!data.success) {
									setSubmitting(false);
									setData(data);
								} else {
									history.push('/source');
								}
							})
							.catch((error) => {
                                setSubmitting(false);
                                setData({
                                    success: false,
                                    message: error,
                                });
								console.log(error);
							});
					}}>
					{({
						isSubmitting,
						handleSubmit,
					}) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Вы действительно хотите удалить данный источник ({data.item.name})?</Form.Label>
							</Form.Group>
							<Button type="submit" disabled={isSubmitting}>Удалить</Button>&nbsp;
                            <Button variant="danger" disabled={isSubmitting} onClick={history.goBack}>Отмена</Button>
						</Form>
					)}
				</Formik>
				: <LoadingIndicator data={data} />
			}
		</div>
	);
};

export default RemoveSource
