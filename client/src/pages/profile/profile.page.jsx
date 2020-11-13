import React from 'react';
import axios from 'axios';

import { Formik } from 'formik';
// import { connect } from 'react-redux';

import config from '../../axios.config';

import IconCamera from '../../components/icons/icon-camera.component';

import './profile.styles.scss';

// import { userCreatedStatusChange } from '../../redux/user/user.actions';

const Profile = (props) => {
	//if redirected from sign up, change new user status
	// if (props.user.created) props.dispatch(userCreatedStatusChange(props.user));

	// console.log('props.data.role from Profile ===> ', props.data.role);
	console.log('props from Profile ===> ', props);

	/**
   * Single state hook useState for all the state properties
   */
	const [ fullState, setFullState ] = React.useState({
		user: { ...props.data },
		edit: false,
		submitSuccess: false,
		submitError: false,
		errorMessage: '',
		role: props?.data?.role ? props.data.role : 'student'
		// role: props.location.state ? props.location.state.role || 'student' : 'student'
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
     * @DONE decide, how to deal with form: a) separate form for each role,
     * or b) conditional rendering at the same form.
     * Pros for a) - simplicity, no sophisticated logic inside Formik;
     * Cons for a) - a lot of repeated code.
     * Pros and cons for b) are opposite + need to clarify how to pass
     * different sets of parametres into single formik function.
		 * It's decided to render form conditionally.
     * 
     * @TODO decide, how to deal with desktop application menu.
     * For mobile UI user menu inside the slider where it is pretty easy
     * to change the structure. In the desktop UI menu lays in the navigation
     * bar, there is no space for additional items.
     * Proposed solution: separate application menu for desktop, located inside
     * main section in <aside/> tag, and 'display: block' only in desktop mode
     * (big screen resolutions).
     * 
     * @DONE build form dynamicaly by adding input fields from the object
     * received in props. - decided to create arrays for each role and build
		 * form from those arrays, as received in props object contains more fields
		 * that it is needed to render in profile page.
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
     * @DONE - decide, how to implement view - (d) conditional rendering 
     * inside Formik.
     * There are 4 possible options: 
     * a) Separate div block containing user data and showing/hiding
     * by changing classes (attributes) with clicking the button;
     * This decision is bad as it force to have one whole view element
     * and repeat all the labels both in form and in view element.
     * 
     * b) Set of separate div's, following by input fields of the form,
     * and showing/hiding by changing classes (attributes) with clicking 
     * the button;
     * This decision is bad cos suggests managing multiple siloed signs
     * using repeating code (fullState.edit checking).
     * 
     * c) Styling input fields invisible and immutable in the view mode,
     * and as a regular input field in the edit mode.
     * This decision is bad cos a value length might exceed a field length.
     * 
     * d) Rerender form each time state (fullState.edit) changes. View is a
     * part of form (inside Formik), conditional rendering wether form or view.
     * 
     */

	const formStructure = (role) => {
		//return specific form structure for each role
		if (role === 'educator') {
			return [
				{
					name: 'profession',
					type: 'text',
					placeholder: 'Profession',
					class: 'profile__input',
					label: ''
				},
				{
					name: 'industries',
					type: 'text',
					placeholder: 'Industry',
					class: 'profile__input'
				},
				{
					name: 'skills',
					type: 'text',
					placeholder: 'Skills',
					class: 'profile__input'
				},
				{
					name: 'company',
					type: 'text',
					placeholder: 'Company',
					class: 'profile__input'
				},
				{
					name: 'website',
					type: 'text',
					placeholder: 'Website',
					class: 'profile__input'
				},
				{
					name: 'location',
					type: 'text',
					placeholder: 'Location',
					class: 'profile__input'
				},
				// {
				// 	name: 'email',
				// 	type: 'text',
				// 	placeholder: 'Email address',
				// 	class: 'profile__input'
				// },
				{
					name: 'phone',
					type: 'text',
					placeholder: 'Contact No',
					class: 'profile__input'
				},
				{
					name: 'address',
					type: 'text',
					placeholder: 'Workshop address',
					class: 'profile__input'
				}
			];
		}
		if (role === 'student') {
			return [
				{
					name: 'industry',
					type: 'text',
					placeholder: 'Industry',
					class: 'profile__input'
				},
				{
					name: 'skillset',
					type: 'text',
					placeholder: 'Skillset',
					class: 'profile__input'
				},
				{
					name: 'location',
					type: 'text',
					placeholder: 'Location',
					class: 'profile__input'
				},
				// {
				// 	name: 'email',
				// 	type: 'text',
				// 	placeholder: 'Email address',
				// 	class: 'profile__input'
				// },
				{
					name: 'phone',
					type: 'text',
					placeholder: 'Contact No',
					class: 'profile__input'
				}
			];
		}
		if (role === 'admin') {
			return [
				// {
				// 	name: 'email',
				// 	type: 'text',
				// 	placeholder: 'Email address',
				// 	class: 'profile__input'
				// },
				{
					name: 'phone',
					type: 'text',
					placeholder: 'Contact No',
					class: 'profile__input'
				}
			];
		}
		//if role is unfamiliar, then return it for diagnostic
		return role;
	};

	const renderViewField = (val) => {
		return val ? val : '--';
	};

	const viewFields = () => {
		console.log('profile viewFields fullState.role ===> ', fullState.role);
		return formStructure(fullState.role).map((field, i) => {
			return (
				// <div key={i} className={`profile__${field.name}`}>
				<div key={i} className={`profile__box profile__box--${field.name}`}>
					{/* if no label property in the field object, then label equal to placeholder
					if there is a label property, then label is distinct of placeholder
					if there is a label property and it's empty, there is no label at all */}

					{ !field?.label 
					? <span className={`profile__label profile__label--${field.name}`}>{field.placeholder}</span>
					: field.label === '' 
					? null
					: <span className={`profile__label profile__label--${field.name}`}>{field.label}</span>
					}

					<div className={`profile__field-content profile__${field.name}`}>
						{renderViewField(fullState.user[field.name])}
					</div>
				</div>
			);
		});
	};

	const formFields = (form) => {
		return formStructure(fullState.role).map((field, i) => {
			// console.log('form from profile ===> ', form);
			return (
				<div key={i} className={`profile__box profile__box--${field.name}`}>
					{/* if no label property in the field object, then label equal to placeholder
					if there is a label property, then label is distinct of placeholder
					if there is a label property and it's empty, there is no label at all */}

					{ !field?.label 
					? <label htmlFor={field.name} className={`profile__label profile__label--${field.name}`}>{field.placeholder}</label>
					: field.label === '' 
					? null
					: <label htmlFor={field.name} className={`profile__label profile__label--${field.name}`}>{field.label}</label>
					}

					<input
						id={field.name}
						type={field.type}
						name={field.name}
						placeholder={field.placeholder}
						className={field.class}
						onChange={form.handleChange}
						onBlur={form.handleBlur}
						value={form.values[field.name]}
					/>
					{form.errors[field.name] && form.touched[field.name] ? (
						<p className="profile__error-message">{form.errors[field.name]}</p>
					) : null}
				</div>
			);
		});
	};

	const profileMainData = () => {
		return (
			// <section className="profile__main-data">
			<Formik
				initialValues={{ ...fullState.user }}
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
						.patch(`/api/users/${fullState.role}/${fullState.user._id}`, values, config)
						.then((res) => {
							console.log('profile, res =====> ', res);
							
							setFullState({
								...fullState,
								user: res.data.data.data,
								edit: false,
								submitSuccess: true,
								submitError: false,
								errorMessage: ''
							});

							// resetForm();
							values = {...fullState.user};
						})
						.catch((error) => {
							console.log('profile, error =====> ', error.response);

							setFullState({
								...fullState,
								submitSuccess: false,
								submitError: true,
								errorMessage: error.message
							});
						});

					// setSubmitting(false);
				}}
			>
				{(form) => (
					// {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting }) => (
					<form className="profile__form" onSubmit={form.handleSubmit}>
						{/* ===> conditional rendering: if "EDIT" button activated, 
               form is rendering, if not then view <=== */}

						{fullState.edit ? (
							<React.Fragment>
								{/* name renders for all roles */}
								<div className="profile__box profile__box--name">
									<label htmlFor="name" className="profile__label profile__label--name">
										First Name
									</label>
									<input
										id="name"
										type="text"
										name="name"
										placeholder="First Name"
										className={`profile__input${form.errors.name && form.touched.name ? ' profile__input--error' : ''}`}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										value={form.values.name}
									/>
									{
										<p className="profile__input--error-message">
											{form.errors.name && form.touched.name ? form.errors.name : ''}
										</p>
									}
								</div>
								<div className="profile__box profile__box--surname">
									<label htmlFor="surname" className="profile__label profile__label--surname">
										Last Name
									</label>
									<input
										id="surname"
										type="text"
										name="surname"
										placeholder="Last Name"
										className={`profile__input${form.errors.surname && form.touched.surname
											? ' profile__input--error'
											: ''}`}
										onChange={form.handleChange}
										onBlur={form.handleBlur}
										value={form.values.surname}
									/>
									{
										<p className="profile__input--error-message">
											{form.errors.surname && form.touched.surname ? form.errors.surname : ''}
										</p>
									}
								</div>

								{formFields(form)}

								<p className="profile__error-message">{fullState.submitError ? fullState.errorMessage : ''}</p>
							</React.Fragment>
						) : (
							<div className="profile__view">
								{/* <div className={`${fullState.edit ? 'display-none ' : 'profile__view'}`}> */}
								<div className="profile__box profile__name heading-secondary">
									{fullState.user.name || fullState.user.surname ? (
										`${fullState.user.name} ${fullState.user.surname}`
									) : (
										'--'
									)}
								</div>

								{viewFields()}
							</div>
						)}

						{/* ===> buttons are rendered on any condition <=== */}

						<div className="profile__box profile__box--btn">
							<button type="button" onClick={setEdit} className="btn btn--primary profile__btn paragraph--uppercase">
								{`${fullState.edit ? 'Cancel' : 'Edit'}`}
							</button>
						</div>

						<div className={`${fullState.edit ? 'profile__box ' : 'display-none '} profile__box--btn`}>
							<button type="submit" onClick={null} className="btn btn--primary profile__btn paragraph--uppercase">
								Save changes
							</button>
						</div>
					</form>
				)}
			</Formik>
			// </section>
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
