import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';

import config from '../../../axios.config';

import './enquiry-form.styles.scss';

const EnquiryForm = (props) => {
	/** Single state hook useState for all the state properties */
	const [ fullState, setFullState ] = React.useState({
		submitSuccess: false,
		submitError: false,
		errorMessage: ''
	});

	const renderForm = () => {
		return (
			<React.Fragment>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						contactNo: '',
						email: '',
						message: ''
					}}
					validate={(values) => {
						const errors = {};

						if (!values.email) {
							errors.email = 'Please provide your valid email address';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = 'Please provide valid email address';
						}

						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(true);

						axios
							.post(`/api/users/signin`, values, config)
							.then((res) => {
								console.log('sign in doc, res =====> ', res);

								setFullState({
									...fullState,
									submitSuccess: true,
									submitError: false,
									errorMessage: ''
								});

								console.log('after push into profile', props);
								props.history.push(`/profile`);
								// props.history.push(`/profile`, { role: res.data.data.role });
							})
							.catch((error) => {
								console.log('sign in doc, error =====> ', error.response);

								// resetForm();
								setFullState({
									...fullState,
									submitSuccess: false,
									submitError: true,
									errorMessage: error.message
								});
							});

						setSubmitting(false);
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
						<form className="enquiry-form container" onSubmit={handleSubmit}>
							<div className="enquiry-form__row">
								<div className="enquiry-form__element">
									<input
										type="text"
										name="firstName"
										placeholder="First Name"
										className={`enquiry-form__field${errors.firstName && touched.firstName
											? ' form-input--error'
											: ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.firstName && touched.firstName ? (
										<p className="enquiry-form__error-message">{errors.firstName}</p>
									) : null}
								</div>
								<div className="enquiry-form__element">
									<input
										type="text"
										name="lastName"
										placeholder="Last Name"
										className={`enquiry-form__field${errors.lastName && touched.lastName ? ' form-input--error' : ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.lastName}
									/>
									{errors.lastName && touched.lastName ? (
										<p className="enquiry-form__error-message">{errors.lastName}</p>
									) : null}
								</div>
							</div>
							<div className="enquiry-form__row">
								<div className="enquiry-form__element">
									<input
										type="text"
										name="contactNo"
										placeholder="Contact Number"
										className={`enquiry-form__field${errors.contactNo && touched.contactNo
											? ' form-input--error'
											: ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.contactNo}
									/>
									{errors.contactNo && touched.contactNo ? (
										<p className="enquiry-form__error-message">{errors.contactNo}</p>
									) : null}
								</div>
								<div className="enquiry-form__element">
									<input
										type="email"
										name="email"
										placeholder="Email Address"
										className={`enquiry-form__field${errors.email && touched.email ? ' form-input--error' : ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.email && touched.email ? <p className="enquiry-form__error-message">{errors.email}</p> : null}
								</div>
							</div>
							<div className="enquiry-form__textarea">
								<label htmlFor="message" className="enquiry-form__message-label">
									Your message
								</label>
								<textarea
									id="message"
									name="message"
									rows="5"
									cols="35"
									className={`enquiry-form__message${errors.company && touched.company
										? ' enquiry-form__input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.message}
								/>
							</div>
							<div className="enquiry-form__btn-box">
								<input
									type="submit"
									title="Enquiry now"
									value="Enquiry now"
									className="btn btn--primary btn--subscribe"
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>
						</form>
					)}
				</Formik>
			</React.Fragment>
		);
	};

	return (
		<section className="enquiry">
			<h2 className="enquiry__heading heading-secondary heading-secondary--uppercase">Enquiry form</h2>
			{renderForm()}
		</section>
	);
};

export default EnquiryForm;
