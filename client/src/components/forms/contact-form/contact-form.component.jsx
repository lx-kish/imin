import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';

import config from '../../../axios.config';

import './contact-form.styles.scss';

// import CaretDownIcon from '../../icons/icon-caret-down.component';
// import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
// import FormFields from '../forms-fields/form-fields.component';
// import Btn from '../../btn/btn.component';

const SusbscribeForm = (props) => {
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
						subscriber: ''
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
						<form className="subscribe-form container" onSubmit={handleSubmit}>
							<div className="subscribe-form__row">
								<div className="subscribe-form__element">
									<input
										type="text"
										name="firstName"
										placeholder="First Name"
										className={`subscribe-form__field${errors.firstName && touched.firstName
											? ' form-input--error'
											: ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.firstName && touched.firstName ? (
										<p className="subscribe-form__error-message">{errors.firstName}</p>
									) : null}
								</div>
								<div className="subscribe-form__element">
									<input
										type="text"
										name="lastName"
										placeholder="Last Name"
										className={`subscribe-form__field${errors.lastName && touched.lastName
											? ' form-input--error'
											: ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.lastName}
									/>
									{errors.lastName && touched.lastName ? (
										<p className="subscribe-form__error-message">{errors.lastName}</p>
									) : null}
								</div>
							</div>
							<div className="subscribe-form__row">
								<div className="subscribe-form__element">
									<input
										type="text"
										name="contactNo"
										placeholder="Contact Number"
										className={`subscribe-form__field${errors.contactNo && touched.contactNo
											? ' form-input--error'
											: ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.contactNo}
									/>
									{errors.contactNo && touched.contactNo ? (
										<p className="subscribe-form__error-message">{errors.contactNo}</p>
									) : null}
								</div>
								<div className="subscribe-form__element">
									<input
										type="email"
										name="email"
										placeholder="Email Address"
										className={`subscribe-form__field${errors.email && touched.email ? ' form-input--error' : ''}`}
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.email}
									/>
									{errors.email && touched.email ? (
										<p className="subscribe-form__error-message">{errors.email}</p>
									) : null}
								</div>
							</div>
							<div className="subscribe-form__row">
								<div className="subscribe-form__element">
									<label className="subscribe-form__select-label" htmlFor="subscriber">
										Which one are you?
									</label>
									<div className="subscribe-form__select-box">
										<select
											type="select"
											name="subscriber"
											id="subscriber"
											className="subscribe-form__select"
											onChange={handleChange}
											onBlur={handleBlur}
										>
											<option value="educator">I want to be an educator</option>
											<option value="student">I want to be an student</option>
											<option value="partner">I want to be an partner</option>
										</select>
									</div>
								</div>
								<div className="subscribe-form__element">
									<input
										type="submit"
										title="Submit"
										className="btn btn--primary btn--subscribe"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							</div>
						</form>
					)}
				</Formik>
			</React.Fragment>
		);
	};

	return (
		<section className="subscribe">
			<h2 className="subscribe__heading heading-secondary heading-secondary--uppercase">I'm in. Are you?</h2>
			<p className="subscribe__description">Sign up to receive email updages on this project.</p>
			{renderForm()}
		</section>
	);
};

export default SusbscribeForm;
