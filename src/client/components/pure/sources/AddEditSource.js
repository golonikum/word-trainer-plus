import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { STYLE } from '../../../constants';
import axios from 'axios';
import { history } from '../../../configureStore';
import LoadingIndicator from '../LoadingIndicator';

const schema = yup.object({
	name: yup.string().required(),
});

const AddEditSource = ({ user, match }) => {
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
			<h2>{id ? 'Изменить' : 'Новый'} источник</h2>
			{
				!id || (data && data.success)
				? <Formik
					validationSchema={schema}
					initialValues={{ name: data ? data.item.name : '' }}
					onSubmit={(values, { setSubmitting, setErrors }) => {
						axios[id ? 'put' : 'post'](`/api/source${id ? ('/' + id) : ''}`, values)
							.then(( { data } ) => {
								if (!data.success) {
									setSubmitting(false);
									setErrors({
										name: data.message,
									});
								} else {
									history.push(`/source/${data.id}`);
								}
							})
							.catch((error) => {
								setSubmitting(false);
								console.log(error);
							});
					}}>
					{({
						isSubmitting,
						handleSubmit,
						handleChange,
						handleBlur,
						values,
						touched,
						errors,
					}) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Form.Group>
								<Form.Label>Название</Form.Label>
								<Form.Control
									id="name"
									ref="name"
									type="name"
									placeholder=""
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									isInvalid={touched.name && errors.name}
								/>
								<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
							</Form.Group>
							<Button type="submit" disabled={isSubmitting}>{id ? 'Сохранить' : 'Создать'}</Button>
						</Form>
					)}
				</Formik>
				: <LoadingIndicator data={data} />
			}
		</div>
	);
};

export default AddEditSource
