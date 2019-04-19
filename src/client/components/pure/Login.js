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
		<h1>Log in</h1>
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
						<Form.Label>Email address</Form.Label>
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
						<Form.Label>Password</Form.Label>
						<Form.Control
							id="password"
							ref="password"
							type="password"
							placeholder="Password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							isInvalid={touched.password && errors.password}
						/>
						<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
					</Form.Group>
					<Button type="submit" disabled={isSubmitting}>Submit</Button>
				</Form>
			)}
		</Formik>
	</div>
);

export default Login
