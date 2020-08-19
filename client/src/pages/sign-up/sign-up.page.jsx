import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import './sign-up.styles.scss';

import config from '../../axios.config';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SinglePaneRow from '../../hoc/rows/single-pane-row/single-pane-row.component';

import ImgStudent from '../../graphics/pages-content/sign-up/IMIN-purple.png';
import ImgEducator from '../../graphics/pages-content/sign-up/IMIN-pink.png';

/**
 * Component Sign-up let user to create an account in the system. 
 * System can accept 3 different types of users: 
 * - administrators,
 * - educators,
 * - students
 * 
 * Contains user form (separate for each type of users) to collect data 
 * about user and send it to the server. After sending server is saving data
 * into the DB, and signing in user at the same time (@TODO expand to sending
 * confirmation via registered email with unique link, and authorize user by 
 * clicking that unique link). 
 * 
 * On success gets response from the server with 
 * cookie containing session JWT for 'signed in' state. 
 * On error returns error object contains error code. Error code then displays
 * in the form over the submit button.
 * 
 * @param {*} props 
 */
const SignUp = props => {

    /**
    * Single state hook useState for all the state properties
    */
    const [fullState, setFullState] = React.useState({

        submitSuccess: false,
        submitError: false,
        errorMessage: ''
    });

    /**
    * Redirect on successfull submission
    */
    React.useEffect(() => {

        if (fullState.submitSuccess) {
            // props.history.push('/profile');
        }

    }, [fullState.submitSuccess]);

    const role = props.location.state ?
        props.location.state.role || 'student'
        : 'student';

    const signUpForm = () => {
        return (
            <div className='sign-up-form'>
                <h2
                    className='sign-up-form__heading heading-secondary heading-secondary--uppercase'
                >
                    {`${role === 'educator' ? 'Educator' : 'Student'} Sign Up`}
                </h2>
                <Formik
                    initialValues={{
                        name: '',
                        surname: '',
                        phone: '',
                        email: '',
                        password: '',
                        passwordConfirm: '',
                        company: '',
                        website: '',
                        description: '',
                        termsAndConditionsRead: false,
                        role: role
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) {
                            errors.name = 'Please provide your First Name';
                        } else if (!/^[A-Za-z]+$/i.test(values.name)) {
                            errors.name = 'Please provide valid First Name';
                        }

                        if (!values.surname) {
                            errors.surname = 'Please provide your Last Name';
                        } else if (!/^[A-Za-z]+$/i.test(values.surname)) {
                            errors.surname = 'Please provide valid Last Name';
                        }

                        if (!values.email) {
                            errors.email = 'Please provide your valid email address';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Please provide valid email address';
                        }

                        // if (!values.phone) {
                        //     errors.email = 'Please provide your valid email address';
                        // } else if (
                        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        // ) {
                        //     errors.email = 'Please provide valid email address';
                        // }

                        if (!values.password) {
                            errors.password = 'Please provide a password at least 8 characters';
                        } else if (values.password.length < 1) { //for debugging, change in production
                            // if (values.password.length < 8) {
                            errors.password = 'Your password should be at least 8 characters';
                        }

                        if (values.password !== values.passwordConfirm) {
                            errors.passwordConfirm = 'Please repeat the password';
                        }
                        if (!values.termsAndConditionsRead && role === 'student') {
                            errors.termsAndConditionsRead = 'To continue you should accept Terms and Conditions'
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                        setSubmitting(true);

                        axios.post(`/api/user/signup`, values, config)

                            .then((res) => {

                                console.log('sign up doc, res =====> ', res);
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
                                })

                            })
                            .catch((error) => {

                                console.log('sign up doc, error =====> ', error.response);

                                // resetForm();
                                setFullState({
                                    ...fullState,
                                    submitSuccess: false,
                                    submitError: true,
                                    errorMessage: error.message
                                });

                            })

                        setSubmitting(false);

                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                            <form
                                className='sign-up-form__form container'
                                onSubmit={handleSubmit}
                            >
                                <DoublePanesRow
                                    rowClassName='row-sign-up-form'
                                    leftColClassName='col-1-of-2--sign-up-form'
                                    rightColClassName='col-1-of-2--sign-up-form'
                                    left={
                                        <>
                                            <input
                                                type='text'
                                                name='name'
                                                placeholder='First Name'
                                                className={`${errors.name && touched.name ? 'form-input--error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {<p className='form-input--error-message'>
                                                {errors.name && touched.name ?
                                                    errors.name : ''}
                                            </p>}
                                        </>
                                    }
                                    right={
                                        <>
                                            <input
                                                type='text'
                                                name='surname'
                                                placeholder='Last Name'
                                                className={`${errors.surname && touched.surname ? 'form-input--error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.surname}
                                            />
                                            {<p className='form-input--error-message'>
                                                {errors.surname && touched.surname ?
                                                    errors.surname : ''}
                                            </p>}
                                        </>
                                    }
                                />

                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <>
                                            <input
                                                type='email'
                                                name='email'
                                                placeholder='Email Address'
                                                className={`${errors.email && touched.email ? 'form-input--error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            {errors.email && touched.email ?
                                                <p className='form-input--error-message'>
                                                    {errors.email}
                                                </p>
                                                : null
                                            }
                                        </>
                                    }
                                />

                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <>
                                            <input
                                                type='tel'
                                                name='phone'
                                                placeholder='Contact No.'
                                                className={`${errors.phone && touched.phone ? 'form-input--error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phone}
                                            />
                                            {errors.phone && touched.phone ?
                                                <p classphone='form-input--error-message'>
                                                    {errors.phone}
                                                </p>
                                                : null
                                            }
                                        </>
                                    }
                                />

                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <>
                                            <input
                                                type='password'
                                                name='password'
                                                placeholder='Password'
                                                className={`${errors.password && touched.password ? 'form-input--error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {errors.password && touched.password ?
                                                <p className='form-input--error-message'>
                                                    {errors.password}
                                                </p>
                                                : null
                                            }
                                        </>
                                    }
                                />

                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <>
                                            <input
                                                type='password'
                                                name='passwordConfirm'
                                                placeholder='Confirm Password'
                                                className={`${errors.passwordConfirm && touched.passwordConfirm ? 'form-input--error' : ''}`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.passwordConfirm}
                                            />
                                            {errors.passwordConfirm && touched.passwordConfirm ?
                                                <p className='form-input--error-message'>
                                                    {errors.passwordConfirm}
                                                </p>
                                                : null
                                            }
                                        </>
                                    }
                                />

                                {role === 'educator' ?
                                    <>
                                        <SinglePaneRow
                                            rowClassName='row-sign-up-form'
                                            pane={
                                                <>
                                                    <input
                                                        type='text'
                                                        name='company'
                                                        placeholder='Company'
                                                        className={`${errors.company && touched.company ? 'form-input--error' : ''}`}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.company}
                                                    />
                                                    {errors.company && touched.company ?
                                                        <p className='form-input--error-message'>
                                                            {errors.company}
                                                        </p>
                                                        : null
                                                    }
                                                </>
                                            }
                                        />

                                        <SinglePaneRow
                                            rowClassName='row-sign-up-form'
                                            pane={
                                                <>
                                                    <input
                                                        type='text'
                                                        name='website'
                                                        placeholder='Website'
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.website}
                                                    />
                                                </>
                                            }
                                        />

                                        <SinglePaneRow
                                            rowClassName='row-sign-up-form'
                                            pane={
                                                <textarea
                                                    name='description'
                                                    rows='5'
                                                    cols='35'
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.description}
                                                />
                                            }
                                        />
                                    </>
                                    :
                                    <SinglePaneRow
                                        rowClassName='row-sign-up-form'
                                        pane={
                                            <>
                                                <input
                                                    type='checkbox'
                                                    id='termsAndConditionsRead'
                                                    name='termsAndConditionsRead'
                                                    className={`${errors.termsAndConditionsRead && touched.termsAndConditionsRead ? 'form-input--error ' : ''} sign-up-form__checkbox`}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    checked={values.termsAndConditionsRead}
                                                />
                                                <label htmlFor='termsAndConditionsRead'>
                                                    I have agreed to the <Link to={'/terms'}>Terms and Conditions</Link>
                                                </label>
                                                {errors.termsAndConditionsRead && touched.termsAndConditionsRead ?
                                                    <p className='form-input--error-message'>
                                                        {errors.termsAndConditionsRead}
                                                    </p>
                                                    : null
                                                }
                                            </>
                                        }
                                    />
                                }

                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <>
                                            <p className='form-input--error-message'>
                                                {fullState.submitError ? fullState.errorMessage : ''}
                                            </p>
                                            <input
                                                type='submit'
                                                value='SIGN UP'
                                                className={`btn ${role === 'educator' ? 'btn--primary ' : 'btn--tertiary '}sign-up-form__btn--submit`}
                                            />
                                        </>
                                    }
                                />
                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <Link to={{
                                            pathname: '/signup',
                                            state: { role: role === 'educator' ? 'student' : 'educator' }
                                        }}>
                                            <p className='sign-up-form__toggle'>
                                                {`Sign up as ${role === 'educator' ? 'a student' : 'an educator'}?`}
                                            </p>
                                        </Link>
                                    }
                                />
                                <SinglePaneRow
                                    rowClassName='row-sign-up-form'
                                    pane={
                                        <p className='sign-up-form__redirect-sign-in'>
                                            Already have an account? <Link
                                                to={{
                                                    pathname: '/signin',
                                                    state: { role: role === 'educator' ? 'educator' : 'student' }
                                                }}
                                                className='sign-up-form__redirect-sign-in--link'
                                            >Sign in.</Link>
                                        </p>
                                    }
                                />
                            </form>
                        )}
                </Formik>
            </div >
        )
    }

    return (
        <div className={''}>
            <div className={'sign-up__background'}>
                <div className={`sign-up__logo--${role}`}>
                    <img
                        src={role === 'student' ? ImgStudent : ImgEducator}
                        alt={`${role} logo`}
                        className={''}
                    />
                </div>
                {signUpForm()}
            </div>
        </div>
    )
};

export default SignUp;