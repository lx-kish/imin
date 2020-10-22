import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';
// import { connect } from 'react-redux';

import config from '../../axios.config';

import Btn from '../../components/btn/btn.component';
import IconCamera from '../../components/icons/icon-camera.component';

import './profile.styles.scss';

import { userCreatedStatusChange } from '../../redux/user/user.actions';

const Profile = (props) => {
	//if redirected from sign up, change new user status
	// if (props.user.created) props.dispatch(userCreatedStatusChange(props.user));

	console.log('props from Profile ===> ', props);

	/**
   * Single state hook useState for all the state properties
   */
	const [ fullState, setFullState ] = React.useState({
		edit: false,
		submitSuccess: false,
		submitError: false,
		errorMessage: '',
		role: props.location.state ? props.location.state.role || 'student' : 'student'
	});

	const setEdit = () => {
		setFullState({
			...fullState,
			edit: !fullState.edit
		});
	};

	/**
     * Profile structure:
     * 
     * header: MY PROFILE
     * 
     * PHOTO (circle), photo icon in a small circle on border of the photo
     * - without photo icon should be as big as photo size,
     * - with photo icon should move to the boottom of the photo and became smaller
     * 
     * Title
     * Name + Lastname
     * 
     * Name Lastname (bold)
     * 
     * Profession
     * 
     * Industry
     * 
     * Skills
     * 
     * First name (from the left)
     * 
     * Last name (from the right)
     * 
     * email
     * 
     * Contact No
     * 
     * Account status (active) (?)
     * 
     * Buttons:
     * Preview
     * Edit
     */

	const profileMainData = () => {
		return (
			<section className="profile__main-data">
				<Formik
					initialValues={{
						// role,
						email: '',
						password: '',
						remember: false
					}}
					validate={(values) => {
						const errors = {};

						if (!values.email) {
							errors.email = 'Please provide your valid email address';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
							errors.email = 'Please provide valid email address';
						}

						// if (!values.password) {
						//   errors.password =
						//     "Please provide a password at least 8 characters";
						// } else if (values.password.length < 1) {
						//   //for debugging, change in production
						//   // if (values.password.length < 8) {
						//   errors.password = "Your password should be at least 8 characters";
						// }

						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(true);

						axios
							.post(`/api/users/signin`, values, config)
							.then((res) => {
								console.log('sign in doc, res =====> ', res);
								// let responseMessage = res.payload.response.data.message;
								// let errorMessage;

								// if (responseMessage.indexOf('E11000 duplicate key error collection:') > -1) {
								//     errorMessage = `User with email ${values.email} already exists.`;

								// }
								setFullState({
									...fullState,
									submitSuccess: true,
									submitError: false,
									errorMessage: ''
								});

								props.history.push(`/profile`);
								// props.history.push(`/users/${res.}`);
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
						<form className="profile__form" onSubmit={handleSubmit}>
							<div className="profile__box profile__box--name">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__inscription profile__name heading-secondary`}>
									{props.data.name || props.data.surname ? `${props.data.name} ${props.data.surname}` : '--'}
								</div>

								<input
									type="text"
									name="name"
									placeholder="First Name"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.name && touched.name ? ' profile__input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
								/>
								{<p className="profile__input--error-message">{errors.name && touched.name ? errors.name : ''}</p>}

								<input
									type="text"
									name="surname"
									placeholder="Last Name"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.surname && touched.surname ? ' profile__input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.surname}
								/>
								{
									<p className="profile__input--error-message">
										{errors.surname && touched.surname ? errors.surname : ''}
									</p>
								}
							</div>

							<div className="profile__box profile__box--profession">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__profession`}>{props.data.profession ? props.data.profession : '--'}</div>
								<input
									type="text"
									name="profession"
									placeholder="Profession"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--industry">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__industry`}>{props.data.industry ? props.data.industry : '--'}</div>
								<input
									type="text"
									name="industry"
									placeholder="Industry"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--slills">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__slills`}>{props.data.skills ? props.data.skills : '--'}</div>
								<input
									type="text"
									name="slills"
									placeholder="Slills"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box company">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__company`}>{props.data.company ? props.data.company : '--'}</div>
								<input
									type="text"
									name="company"
									placeholder="Company"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box--city">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__city`}>{props.data.city ? props.data.city : '--'}</div>
								<input
									type="text"
									name="city"
									placeholder="Location"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--email">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__email`}>{props.data.email ? props.data.email : '--'}</div>
								<input
									type="email"
									name="email"
									placeholder="Email Address"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--phone">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__phone`}>{props.data.phone ? props.data.phone : '--'}</div>
								<input
									type="text"
									name="phone"
									placeholder="Contact No"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--address">
								<div className={`${fullState.edit ? 'display-none ' : ''}profile__address`}>{props.data.address ? props.data.address : '--'}</div>
								<input
									type="text"
									name="address"
									placeholder="Workshop address"
									className={`${!fullState.edit ? 'display-none ' : ''}profile__input${errors.email && touched.email ? ' form-input--error' : ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<p className="profile__error-message">{fullState.submitError ? fullState.errorMessage : ''}</p>

							<div className="profile__box profile__box--button">
								<Btn onClick={setEdit} title={`${fullState.edit ? 'Cancel' : 'Edit'}`} className="btn btn--primary paragraph--uppercase" />
							</div>
							
                            <div className={`${fullState.edit ? 'profile__box ' : 'display-none '} profile__box--button`}>
								<Btn onClick={null} title="Update profile" className="btn btn--primary paragraph--uppercase" />
							</div>
						</form>
					)}
				</Formik>
			</section>
		);
	};

	return (
		<main className="profile">
			<h2 className="heading-secondary--uppercase profile__heading">My profile</h2>
			<section className="profile__box profile__box--photo">
				<div className="profile__photo">
					<img src="img/profile_photo.png" className="profile__photo-img" />
					{/* <button className="btn btn--primary btn--round profile__photo-button">Ф</button> */}
				</div>
				<Btn
					title={<IconCamera className="profile__photo-icon btn__icon color-white" />}
					className="btn--primary btn--round profile__photo-button"
				/>
			</section>
			{profileMainData()}
		</main>
	);
};

// const mapStateToProps = (state) => ({
// 	user: state.user
// });

// export default connect(mapStateToProps)(Profile);
export default Profile;
