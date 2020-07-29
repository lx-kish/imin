import React from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Formik } from 'formik';

import './sign-in.styles.scss';

import config from '../../axios.config';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SinglePaneRow from '../../hoc/rows/single-pane-row/single-pane-row.component';

import ImgStudent from '../../graphics/pages-content/sign-in/avatar-student.png';
import ImgEducator from '../../graphics/pages-content/sign-in/avatar-educator.png';

const SignIn = props => {

    // let role = props.location.state ?
    //     props.location.state.role || 'student'
    //     : 'student';

    /**
    * Single state hook useState for all the state properties
    */
    const [fullState, setFullState] = React.useState({

        submitSuccess: false,
        submitError: false,
        errorMessage: '',
        role: props.location.state ?
            props.location.state.role || 'student'
            : 'student'
    });

    /**
    * Redirect on successfull submission
    */
    React.useEffect(() => {

        if (fullState.submitSuccess) {
            // props.history.push('/profile');
        }

    }, [fullState.submitSuccess]);

    const signInForm = () => {
        return (
            <div className='sign-in-form'>
                <h2
                    className='sign-in-form__heading heading-secondary heading-secondary--uppercase'
                >
                    {`Sign in`}
                </h2>
                <Formik
                    initialValues={{
                        role: fullState.role,
                        email: '',
                        password: '',
                        remember: false
                    }}
                    validate={values => {
                        const errors = {};

                        if (!values.email) {
                            errors.email = 'Please provide your valid email address';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Please provide valid email address';
                        }

                        if (!values.password) {
                            errors.password = 'Please provide a password at least 8 characters';
                        } else if (values.password.length < 1) { //for debugging, change in production
                            // if (values.password.length < 8) {
                            errors.password = 'Your password should be at least 8 characters';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                        setSubmitting(true);

                        axios.post(`/api/user/signin`, values, config)

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
                                })

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
                        setFieldValue,
                        isSubmitting
                    }) => (
                            <form
                                className='sign-in-form__form container'
                                onSubmit={handleSubmit}
                            >
                                <DoublePanesRow
                                    rowClassName='row-sign-in-form'
                                    leftColClassName='col-1-of-2--sign-in-form'
                                    rightColClassName='col-1-of-2--sign-in-form'
                                    left={
                                        <>
                                            <label htmlFor='student'>Student</label>
                                            <input
                                                type='radio'
                                                name='role'
                                                id='student'
                                                className={`form-input__role form-input__role--${values.role}`}
                                                onChange={() => {
                                                    setFieldValue("role", "student");
                                                    setFullState({
                                                        ...fullState,
                                                        role: "student"
                                                    })
                                                }}
                                                value='student'
                                                checked={values.role === "student"}
                                            />
                                            {<p className='form-input--error-message'>
                                                {errors.name && touched.name ?
                                                    errors.name : ''}
                                            </p>}
                                        </>
                                    }
                                    right={
                                        <>
                                            <label htmlFor='educator'>Educator</label>
                                            <input
                                                type='radio'
                                                name='role'
                                                id='educator'
                                                className={`form-input__role form-input__role--${values.role}`}
                                                onChange={() => {
                                                    setFieldValue("role", "educator");
                                                    setFullState({
                                                        ...fullState,
                                                        role: "educator"
                                                    })
                                                }}
                                                value='educator'
                                                checked={values.role === "educator"}
                                            />
                                            {<p className='form-input--error-message'>
                                                {errors.surname && touched.surname ?
                                                    errors.surname : ''}
                                            </p>}
                                        </>
                                    }
                                />

                                <SinglePaneRow
                                    rowClassName='row-sign-in-form'
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
                                    rowClassName='row-sign-in-form'
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
                                    rowClassName='row-sign-in-form'
                                    pane={
                                        <>
                                            <input
                                                type='checkbox'
                                                id='remember'
                                                name='remember'
                                                className={`sign-in-form__checkbox`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                checked={values.remember}
                                            />
                                            <label htmlFor='remember'>
                                                Remember me
                                            </label>
                                            {/* {errors.termsAndConditionsRead && touched.termsAndConditionsRead ?
                                                <p className='form-input--error-message'>
                                                    {errors.termsAndConditionsRead}
                                                </p>
                                                : null
                                            } */}
                                        </>
                                    }
                                />

                                <SinglePaneRow
                                    rowClassName='row-sign-in-form'
                                    pane={
                                        <>
                                            <p className='form-input__error-message'>
                                                {fullState.submitError ? fullState.errorMessage : ''}
                                            </p>
                                            <input
                                                type='submit'
                                                value='SIGN IN'
                                                className={`btn ${values.role === 'educator' ? 'btn--primary ' : 'btn--tertiary '}sign-in-form__btn--submit`}
                                            />
                                        </>
                                    }
                                />
                                
                                <SinglePaneRow
                                    rowClassName='row-sign-in-form'
                                    pane={
                                        <p className='sign-in-form__redirect-sign-in'>
                                            Don't have an account? <Link to={{
                                                pathname: '/signup',
                                                state: { role: fullState.role === 'educator' ? 'educator' : 'student' }
                                            }}
                                                className='sign-in-form__redirect-sign-in--link'
                                            >Sign Up.</Link>
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
            <div className={'sign-in__background'}>
                <div className={`sign-in__logo--${fullState.role}`}>
                    <img
                        src={fullState.role === 'student' ? ImgStudent : ImgEducator}
                        alt={`${fullState.role} avatar`}
                        className={''}
                    />
                </div>
                {signInForm()}
            </div>
        </div>
    )
};

export default SignIn;