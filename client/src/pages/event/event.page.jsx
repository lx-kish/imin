import React from "react";
import { Formik } from 'formik';

import IconCamera from '../../components/icons/icon-camera.component';

import AsideMenu from '../../components/navigation/aside-menu-dt/aside-menu-dt.component';
import DesktopWidth from '../../utils/desktop-width/desktop-width';

import eventFormStructure from '../../components/forms/event-form/event-form-structure';

import "./event.styles.scss";

const Event = (props) => {
	/**
   * Event page 
   * 
   * Contains event settings and properties.
   * 
   * Page possibly can appear in the following states:
   * 
   * I. Form edit (with fields visible)
   * 
   * 1) Completely new Event, where user should fill the set of fields with
   *    new values.
   *    - no _id field
   *    - no filled fields
   * 
   * 2) Existent Event editing, when user can change values of earlier saved
   *    event.
   *    - _id field
   *    - full set of field filled
   * 
   * 3) New Event, creating based on previous event, when all the fields already
   *    filled, except dates and time.
   *    - no _id field
   *    - dates and time remain empty
   * 
   * II. Form preview (not for editing, without fields)
   * 
   *1) Saved Event view for admin approval.
   *    - approving tools (button, whatever)
   * 
   *2) Saved Event view for students attending.
   *    - attending tools (button, whatever)
   * 
   *3) New Event preview, when all the fields are filled but Event has not
   *    saved yet.
   *    - no _id field
   * 
   *4) Saved Event view.
   *    - no specific buttons, just pure event view
   *  
   */

  // console.log(
	// 	'%c Event.page, props ===> ',
	// 	'color: orangered; font-weight: bold;',
	// 	{ ...props },
	// );
	const { user, patchUserData } = props;
	
	/**
   * Single state hook useState for all the state properties
   */
	const [ fullState, setFullState ] = React.useState({
		edit: false,
		submitSuccess: false,
		submitError: false,
		errorMessage: '',
		role: user.role ? user.role : 'student'
	});

	const setEdit = () => {
		setFullState({
			...fullState,
			edit: !fullState.edit
		});
	};

	const renderViewField = (val) => {
		return val ? val : '--';
	};
  
	const viewFields = () => {
		return eventFormStructure.map((field, i) => {
		// return formStructure(fullState.role).map((field, i) => {
			// console.log(
			// 	'%c Profile component, viewFields function,  user.role ===> ',
			// 	'color: orangered; font-weight: bold;',
			// 	user.role,
			// 	field.name,
			// 	user[field.name],
			// 	user
			// );
			return (
				<div key={i} className={`profile__box profile__box--${field.name}`}>

					{ !field?.label 
					? <span className={`profile__label profile__label--${field.name}`}>{field.placeholder}</span>
					: field.label === '' 
					? null
					: <span className={`profile__label profile__label--${field.name}`}>{field.label}</span>
					}

					<div className={`profile__field-content profile__${field.name}`}>
						{renderViewField(user[field.name])}
					</div>
				</div>
			);
		});
	};

	const formFields = (form) => {
		return eventFormStructure.map((field, i) => {
			return (
				<div key={i} className={`profile__box profile__box--${field.name}`}>

					{ !field?.label 
					? <label htmlFor={field.name} className="profile__label profile__label--input">{field.placeholder}</label>
					: field.label === '' 
					? null
					: <label htmlFor={field.name} className="profile__label profile__label--input">{field.label}</label>
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

	const renderForm = () => {
		return (
			<Formik
				initialValues={{ ...user }}
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

					let form = new FormData();
					for (const key in values) {
						form.append(key, values[key]);
					}

					console.log(
						'%c profile.onSubmit, values, form ===> ',
						'color: fuchsia; font-weight: bold;',
						values,
						form,
					);

					patchUserData(
						`updateMe`,
						form
					)
					.then((res) => {
						setFullState({
							...fullState,
								edit: false,
								submitSuccess: true,
								submitError: false,
								errorMessage: ''
							});
	
							values = {...user};
						})
						.catch((e) => {
	
							setFullState({
								...fullState,
								submitSuccess: false,
								submitError: true,
								errorMessage: e.message
							});
						});

				}}
			>
				{(form) => (
					<form className="profile__form" onSubmit={form.handleSubmit}>
						{/* ===> conditional rendering: if "EDIT" button activated, 
							 form is rendering, if not then view <=== */}
						<div className="profile__box profile__box--photo">

						
							<figure className="profile__photo">
								<img
									src={`https://s3.amazonaws.com/${process.env.REACT_APP_AWS_S3_BUCKET_ASSETS_NAME}/img/userpics/${user.photo}`}
									alt="Profile photo"
									className="profile__photo-img"
								/>
							</figure>
							{fullState.edit ? (
								<React.Fragment>
									<input 
										className="profile__photo-input"
										type="file"
										accept="image/*"
										id="userpic"
										name="userpic"
										onChange={(event) => {
											form.setFieldValue("userpic", event.currentTarget.files[0]);
										}}
									/>
									<label className="btn--primary btn--round profile__photo-button" htmlFor="userpic">
										{<IconCamera className="profile__photo-icon btn__icon color-white" />}
									</label>
								</React.Fragment>
								) : ( null )
							}
						</div>

						{fullState.edit ? (
							<React.Fragment>
								{/* name renders for all roles */}
								<div className="profile__box profile__box--name">
									<label htmlFor="name" className="profile__label profile__label--input">
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
									<label htmlFor="surname" className="profile__label profile__label--input">
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
								<div className="profile__box profile__name heading-secondary">
									{user.name || user.surname ? (
										`${user.name} ${user.surname}`
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
								{ fullState.edit ? 'Cancel' : 'Edit' }
							</button>
						</div>
	
						{fullState.edit ? (
							<div className="profile__box profile__box--btn">
								<button type="submit" onClick={null} className="btn btn--primary profile__btn paragraph--uppercase">
									Save changes
								</button>
							</div>
						) : ( null )}
					</form>
				)}
			</Formik>
		);
	};

	const eventMainData = () => {
		return (
			<section className="event__main-data">
				{renderForm()}
			</section>
		);
	};

  return (

    DesktopWidth() ?
      <main className="app-page app-page--dt event">
        <div className="event__content">
          <AsideMenu />
          <div className="app-page event">
            <h1 className="event__heading">Host experience</h1>
            {eventMainData()}
          </div>
        </div>
      </main>
    : 
      <main className="app-page event">
        <h1 className="event__heading">Host experience</h1>
        {eventMainData()}
      </main>
  );
};

export default Event;
