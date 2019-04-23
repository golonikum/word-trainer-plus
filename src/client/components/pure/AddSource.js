import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { STYLE } from '../../constants';
import axios from 'axios';
import { history } from '../../configureStore';

const schema = yup.object({
	name: yup.string().required(),
});

const AddSource = ({ user }) => (
	<div className={STYLE.RESPONSIVE_FORM}>
		<h2>Новый источник</h2>
		<Formik
			validationSchema={schema}
			initialValues={{ name: '' }}
			onSubmit={(values, { setSubmitting, setErrors }) => {
                axios.post('/api/source', values)
                    .then(( { data } ) => {
                        if (!data.success) {
                            setSubmitting(false);
                            setErrors({
                                name: data.message,
                            });
                        } else {
                            history.push(`/sources/${data.id}`);
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
					<Button type="submit" disabled={isSubmitting}>Создать</Button>
				</Form>
			)}
		</Formik>
	</div>
);

export default AddSource
