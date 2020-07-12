import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './sign-up-form-formik.styles.scss';

import { userSignUp } from '../../../redux/user/user.actions';

import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SinglePaneRow from '../../../hoc/rows/single-pane-row/single-pane-row.component';

const SignUpForm = props => {

    const role = props.role || 'student';

    // console.log(role);

    return (
        <section className='sign-up-form'>
            <h2
                className='sign-up-form__heading heading-secondary heading-secondary--uppercase'
            >
                {`${props.role === 'educator' ? 'Educator' : 'Student'} Sign Up`}
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

                    if (values.password.length < 1) { //for debugging, change in production
                        // if (values.password.length < 8) {
                        errors.passwordConfirm = 'Your password should be at least 8 characters';
                    }

                    if (values.password !== values.passwordConfirm) {
                        errors.passwordConfirm = 'Please type the same password again';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    // console.log(values);
                    userSignUp(values)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
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
                                    <input
                                        type='submit'
                                        value='SIGN UP'
                                        className={`btn ${props.role === 'educator' ? 'btn--primary ' : 'btn--tertiary '}sign-up-form__btn--submit`}
                                    />
                                }
                            />
                            <SinglePaneRow
                                rowClassName='row-sign-up-form'
                                pane={
                                    <Link to={{
                                        pathname: '/signup',
                                        state: { role: props.role === 'educator' ? 'student' : 'educator' }
                                    }}>
                                        <p className='sign-up-form__toggle'>
                                            {`Sign up as ${props.role === 'educator' ? 'a student' : 'an educator'}?`}
                                        </p>
                                    </Link>
                                }
                            />
                        </form>
                    )}
            </Formik>
        </section >
    )
}

const mapDispatchToProps = dispatch => ({
    userSignUp: data => dispatch(userSignUp(data))
})

export default connect(null, mapDispatchToProps)(SignUpForm);
// export default SignUpForm;