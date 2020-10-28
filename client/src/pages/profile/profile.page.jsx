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
     * There are three kind of profile structures, one for each role: 
     * - educator
     * - student
     * - admin.
     * 
     * @TODO decide, how to deal with form: a) separate form for each role,
     * or b) conditional rendering at the same form.
     * Pros for a) - simplicity, no sophisticated logic inside formik;
     * Cons for a) - a lot of repeated code.
     * Pros and cons for b) are opposite + need to clarify how to pass
     * different sets of parametres into single formik function.
     * 
     * @TODO decide, how to deal with desktop application menu.
     * For mobile UI user menu inside the slider where it is pretty easy
     * to change the structure. In the desktop UI menu lays in the navigation
     * bar, there is no space for additional items.
     * Proposed solution: separate application menu for desktop, located inside
     * main section in <aside/> tag, and 'display: block' only in desktop mode
     * (big screen resolutions).
     * 
     *     *********   COMMON FOR ALL PROFILES   ********* 
     * 
     * header: MY PROFILE (common for all the profiles)
     * 
     * PHOTO (circle), photo icon in a small circle on border of the photo
     * - without photo icon should be as big as photo size,
     * - with photo icon should move to the boottom of the photo and became smaller
     * (common for all the profiles)
     * 
     * Title (common for all the profiles)
     * Name Lastname (bold)
     * 
     * First name (from the left)
     * 
     * Last name (from the right)
     * 
     *     *********   PROFILE STRUCTURE FOR EDUCATOR   *********   
     * 
     * Profession
     * 
     * Industries [list or array (how???)]
     * 
     * Skillset [list or array (how???)]
     * 
     * Company
     * 
     * Website (optional)
     * 
     * Account status (active) (old, deprecated)
     * 
     * Location (city)
     * 
     * Workshop address
     * 
     *     *********   PROFILE STRUCTURE FOR STUDENT   *********   
     * 
     * Industries [list or array (how???)] - event filter by default
     * 
     * Skillset [list or array (how???)] - event filter by default
     * 
     * Location [list or array (how???)] - event filter by default
     * 
     *     *********   PROFILE STRUCTURE FOR ADMINISTRATORS   *********  
     *  
     *     *********   COMMON FOR ALL PROFILES   ********* 
     * 
     * Email - influent on login - @TODO - design structure (array, or changing email)
     * 
     * Contact No
     * 
     * Buttons: (common for all the profiles)
     * Preview
     * Edit
     * 
     * 
     *     *********   SWITCHING BETWEEN EDIT AND VIEW MODES   ********* 
     * 
     * In the whireframe there are two modes: edit mode and view mode. 
     * Switching between modes is happening by clicking "Edit"/"Cancel" button.
     * 
     * @DONE - decide, how to implement view - option a).
     * There are 3 possible options: 
     * a) Separate div block containing user data and showing/hiding
     * by changing classes (attributes) with clicking the button;
     * b) Set of separate div's, following by input fields of the form,
     * and showing/hiding by changing classes (attributes) with clicking 
     * the button;
     * c) Styling input fields invisible and immutable in the view mode,
     * and as a regular input field in the edit mode.
     */

    const renderViewField = (val) => {
        return val ? val : '--';
    }

	const profileMainData = () => {
		return (
			<section className="profile__main-data">
				<div className={`${fullState.edit ? 'display-none ' : 'profile__view'}`}>
					<div className={`profile__inscription profile__name heading-secondary`}>
						{props.data.name || props.data.surname ? `${props.data.name} ${props.data.surname}` : '--'}
					</div>
					<div className={`profile__profession`}>{renderViewField(props.data.profession)}</div>
					<div className={`profile__industry`}>{renderViewField(props.data.industry)}</div>
					<div className={`profile__skillset`}>{renderViewField(props.data.skills)}</div>
					<div className={`profile__company`}>{renderViewField(props.data.company)}</div>
					<div className={`profile__city`}>{renderViewField(props.data.city)}</div>
					<div className={`profile__email`}>{renderViewField(props.data.email)}</div>
					<div className={`profile__phone`}>{renderViewField(props.data.phone)}</div>
					<div className={`profile__address`}>{renderViewField(props.data.address)}</div>
				</div>

				<Formik
					initialValues={{ ...props.data }}
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
							.post(`/api/users/${props.data._id}`, values, config)
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
								<input
									type="text"
									name="name"
									placeholder="First Name"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.name && touched.name
										? ' profile__input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
								/>
								{<p className="profile__input--error-message">{errors.name && touched.name ? errors.name : ''}</p>}

								<input
									type="text"
									name="surname"
									placeholder="Last Name"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.surname && touched.surname
										? ' profile__input--error'
										: ''}`}
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
								<input
									type="text"
									name="profession"
									placeholder="Profession"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.profession}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--industry">
								<input
									type="text"
									name="industry"
									placeholder="Industry"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.industry}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--skillset">
								<input
									type="text"
									name="skillset"
									placeholder="Skillset"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.skillset}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box company">
								<input
									type="text"
									name="company"
									placeholder="Company"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.company}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box--city">
								<input
									type="text"
									name="city"
									placeholder="Location"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.city}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--email">
								<input
									type="email"
									name="email"
									placeholder="Email Address"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--phone">
								<input
									type="text"
									name="phone"
									placeholder="Contact No"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.phone}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<div className="profile__box profile__box--address">
								<input
									type="text"
									name="address"
									placeholder="Workshop address"
									className={`${fullState.edit ? '' : 'display-none '}profile__input${errors.email && touched.email
										? ' form-input--error'
										: ''}`}
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.address}
								/>
								{errors.email && touched.email ? <p className="profile__error-message">{errors.email}</p> : null}
							</div>

							<p className="profile__error-message">{fullState.submitError ? fullState.errorMessage : ''}</p>

							<div className="profile__box profile__box--button">
								{/* <Btn
									onClick={setEdit}
									title={`${fullState.edit ? 'Cancel' : 'Edit'}`}
									className="btn btn--primary paragraph--uppercase"
								/> */}
								<button type="button" onClick={setEdit} className="btn btn--primary paragraph--uppercase">
									{`${fullState.edit ? 'Cancel' : 'Edit'}`}
								</button>
							</div>

							<div className={`${fullState.edit ? 'profile__box ' : 'display-none '} profile__box--button`}>
								{/* <Btn onClick={null} title="Save changes" className="btn btn--primary paragraph--uppercase" /> */}
								<button type="button" onClick={null} className="btn btn--primary paragraph--uppercase">
									Save changes
								</button>
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
				</div>
				<button className="btn--primary btn--round profile__photo-button">
					{<IconCamera className="profile__photo-icon btn__icon color-white" />}
				</button>
				{/* <Btn
					title={<IconCamera className="profile__photo-icon btn__icon color-white" />}
					className="btn--primary btn--round profile__photo-button"
				/> */}
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
