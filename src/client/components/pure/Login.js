import React from "react";
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { STYLE } from '../../constants';

const schema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

// ----------------------------------------------------
const Login = ({ manualLogin, nextPathname }) => (
	<div className={STYLE.RESPONSIVE_FORM}>
		<h2>Вход</h2>
		<Formik
			validationSchema={schema}
			initialValues={{ email: '', password: '' }}
			onSubmit={(values, { setSubmitting, setErrors }) => {
				manualLogin(values, nextPathname)
					.then((msg) => {
						setSubmitting(false);
						if (msg) {
							setErrors({
								email: msg,
							});
						}	
					})
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
						<Form.Label>Адрес электронной почты</Form.Label>
						<Form.Control
							id="email"
							ref="email"
							type="email"
							placeholder="Email"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							isInvalid={touched.email && errors.email}
						/>
						<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Пароль</Form.Label>
						<Form.Control
							id="password"
							ref="password"
							type="password"
							placeholder="Пароль"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							isInvalid={touched.password && errors.password}
						/>
						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit" disabled={isSubmitting}>Отправить</Button>
				</Form>
			)}
		</Formik>
	</div>
);

export default Login
