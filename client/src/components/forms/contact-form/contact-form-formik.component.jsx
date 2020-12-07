import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';

import config from '../../../axios.config';

import './contact-form.styles.scss';

import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import FormFields from '../forms-fields/form-fields.component';
import Btn from '../../btn/btn.component';

const SusbscribeForm = (props) => {
	/** Single state hook useState for all the state properties */
	const [ fullState, setFullState ] = React.useState({
		submitSuccess: false,
		submitError: false,
		errorMessage: ''
	});

	const state = {
		formData: {
			name: {
				field: 'name', //field name for service purposes
				element: 'input', //type of element input|text area|select
				elementClassName: 'subscribe__element', //form element (field+label) className
				value: '', //value
				label: false, //show label: true|false
				labelText: '', //text label (if show)
				labelClassName: '', //label styles
				config: {
					//properties of element (attributes)
					name: 'name_input',
					className: 'subscribe__input',
					type: 'text',
					placeholder: 'First Name'
				},
				validation: {
					//field validation required: true|false
					required: false
				},
				valid: false, //field valid: true|false
				touched: false, //for blur field touched flag: true|false
				labelErrorClassName: 'subscribe__label-error',
				validationMessage: '' //warning text if the field invalid
			},
			lastname: {
				field: 'lastname',
				element: 'input',
				elementClassName: 'subscribe__element',
				value: '',
				label: false,
				labelText: '',
				labelClassName: '',
				config: {
					name: 'lastname_input',
					className: 'subscribe__input',
					type: 'text',
					placeholder: 'Last Name'
				},
				validation: {
					required: false
				},
				valid: false,
				touched: false,
				labelErrorClassName: 'subscribe__label-error',
				validationMessage: ''
			},
			phone: {
				field: 'phone',
				element: 'input',
				elementClassName: 'subscribe__element',
				value: '',
				label: false,
				labelText: '',
				labelClassName: '',
				config: {
					name: 'tel_input',
					className: 'subscribe__input',
					type: 'tel',
					placeholder: 'Contact Number'
				},
				validation: {
					required: false
				},
				valid: false,
				touched: false,
				labelErrorClassName: 'subscribe__label-error',
				validationMessage: ''
			},
			email: {
				field: 'email',
				element: 'input',
				elementClassName: 'subscribe__element',
				value: '',
				label: false,
				labelText: '',
				labelClassName: '',
				config: {
					name: 'email_input',
					className: 'subscribe__input',
					type: 'email',
					placeholder: 'Email Address'
				},
				validation: {
					required: false
				},
				valid: false,
				touched: false,
				labelErrorClassName: 'subscribe__label-error',
				validationMessage: ''
			},
			participant: {
				field: 'participant',
				element: 'select',
				elementClassName: 'subscribe__element',
				value: '',
				label: true,
				labelText: 'Which one are you?',
				labelClassName: 'subscribe__select-label',
				wraperClassName: 'subscribe__select-box',
				config: {
					name: 'participant_input',
					className: 'subscribe__select'
				},
				options: [
					{ val: 'educator', text: 'I want to be an educator' },
					{ val: 'student', text: 'I want to be a student' },
					{ val: 'partner', text: 'I want to be a partner' }
				],
				validation: {
					required: false
				},
				valid: true
			}
		}
	};

	const updateForm = (newState, key) => {
		// this.setState({
		//     formData: newState
		// })

		this.setState((prevState) => ({
			formData: {
				...prevState.formData,
				[prevState.formData[key]]: newState
			}
		}));
	};

	const submitForm = (event) => {
		event.preventDefault();
		let dataToSubmit = {};
		let formIsValid = true;

		for (let key in this.state.formData) {
			dataToSubmit[key] = this.state.formData[key].value;
		}

		for (let key in this.state.formData) {
			formIsValid = this.state.formData[key].valid && formIsValid;
		}

		if (formIsValid) {
			// firebaseDB.ref('users').push(dataToSubmit)
			// .then(() => {
			console.log('Message has been sent');
			// })
			// .catch(e =>{
			//     console.log(e)
			// })
		}
	};

	const renderForm = () => {
		return (
			<React.Fragment>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						contactNo: '',
						email: '',
						role: ''
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
								<input
									type="text"
									name="firstName"
									placeholder="First Name"
									className={`subscribe-form__input${errors.firstName && touched.firstName
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.firstName && touched.firstName ? (
									<p className="subscribe-form__error-message">{errors.firstName}</p>
								) : null}
								<input
									type="text"
									name="lastName"
									placeholder="Last Name"
									className={`subscribe-form__input${errors.lastName && touched.lastName ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.lastName}
								/>
								{errors.lastName && touched.lastName ? (
									<p className="subscribe-form__error-message">{errors.lastName}</p>
								) : null}
							</div>
							<div className="subscribe-form__row">
								<input
									type="text"
									name="contactNo"
									placeholder="Contact Number"
									className={`subscribe-form__input${errors.contactNo && touched.contactNo
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.contactNo}
								/>
								{errors.contactNo && touched.contactNo ? (
									<p className="subscribe-form__error-message">{errors.contactNo}</p>
								) : null}
								<input
									type="email"
									name="email"
									placeholder="Email Address"
									className={`subscribe-form__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="subscribe-form__error-message">{errors.email}</p> : null}
							</div>
							<div className="subscribe-form__row">
								<div className="subscribe-form__select-compound">
									<label className="subscribe__select-label" htmlFor="select-role">
										Which one are you?
									</label>
									<div className="subscribe-form__select-box">
										<select
											type="select"
											name="subscribe-select"
											id="select-role"
											className="subscribe-form__select"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.role}
										>
											<option value="educator">I want to be an educator</option>
											<option value="student">I want to be an student</option>
											<option value="partner">I want to be an partner</option>
										</select>
									</div>
								</div>
								<input
									type="submit"
									title="Submit"
									className="btn btn--primary subscribe__btn--submit"
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
		<section className="subscribe">
			<h2 className="subscribe__heading heading-secondary heading-secondary--uppercase">I'm in. Are you?</h2>
			<p className="subscribe__description">Sign up to receive email updages on this project.</p>
			{renderForm()}
			{/* <form className="subscribe__form container" onSubmit={this.submitForm}>
				<DoublePanesRow
					rowClassName="row-subscribe"
					leftColClassName="col-1-of-2--subscribe"
					rightColClassName="col-1-of-2--subscribe"
					left={
						<FormFields
							formData={this.state.formData['name']}
							onblur={(newState) => this.updateForm(newState, 'name')}
							change={(newState) => this.updateForm(newState, 'name')}
						/>
					}
					right={
						<FormFields
							formData={this.state.formData['lastname']}
							onblur={(newState) => this.updateForm(newState, 'lastname')}
							change={(newState) => this.updateForm(newState, 'lastname')}
						/>
					}
				/>

				<DoublePanesRow
					rowClassName="row-subscribe"
					leftColClassName="col-1-of-2--subscribe"
					rightColClassName="col-1-of-2--subscribe"
					left={
						<FormFields
							formData={this.state.formData['phone']}
							onblur={(newState) => this.updateForm(newState, 'phone')}
							change={(newState) => this.updateForm(newState, 'phone')}
						/>
					}
					right={
						<FormFields
							formData={this.state.formData['email']}
							onblur={(newState) => this.updateForm(newState, 'email')}
							change={(newState) => this.updateForm(newState, 'email')}
						/>
					}
				/>

				<DoublePanesRow
					rowClassName="row-subscribe"
					leftColClassName="col-1-of-2--subscribe"
					rightColClassName="col-1-of-2--subscribe subscribe--btn-box"
					left={
						// <span className='subscribe__label'>{'Which one are you?'}</span>
						<FormFields
							formData={this.state.formData['participant']}
							onblur={(newState) => this.updateForm(newState, 'participant')}
							change={(newState) => this.updateForm(newState, 'participant')}
						/>
					}
					right={<Btn type="submit" title="Submit" className="btn btn--dt btn--primary subscribe__btn--submit" />}
				/>
			</form> */}
		</section>
	);
};

export default SusbscribeForm;
