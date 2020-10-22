import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, useDispatch, useSelector } from "react-redux";


import { userSignUp } from '../../../redux/user/user.actions';

import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SinglePaneRow from '../../../hoc/rows/single-pane-row/single-pane-row.component';

const SignUpForm = props => {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        console.log(data, props.role);
        // props.userSignUp(data);
        // props.dispatch({
        //     ...data,
        //     role: props.role
        // });

        data = {
            ...data,
            role: props.role
        }
        userSignUp(data);
    };

    // console.log(props.role);

    return (
        <section className='sign-up-form'>
            <h2
                className='sign-up-form__heading heading-secondary heading-secondary--uppercase'
            >
                {`${props.role === 'educator' ? 'Educator' : 'Student'} Sign Up`}
            </h2>
            <form
                className='sign-up-form__form container'
                onSubmit={handleSubmit(onSubmit)}
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
                                defaultValue={props.name}
                                ref={register({
                                    required: true,
                                    pattern: /^[A-Za-z]+$/i
                                })}
                            />
                            {errors.name && 'First name is required.'}
                        </>
                    }
                    right={
                        <>
                            <input
                                type='text'
                                name='surname'
                                placeholder='Last Name'
                                defaultValue={props.surname}
                                ref={register({
                                    required: true,
                                    pattern: /^[A-Za-z]+$/i
                                })}
                            />
                            {errors.surname && 'Last name is required.'}
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
                                defaultValue={props.email}
                                ref={register({
                                    required: true
                                })}
                            />
                            {errors.email && 'Email name is required.'}
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
                                defaultValue={props.phone}
                                ref={register({
                                    required: true
                                })}
                            />
                            {errors.phone && 'Contact number is required.'}
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
                                defaultValue={props.password}
                                ref={register({
                                    required: true,
                                    min: 6
                                })}
                            />
                            {errors.password && 'No password provided.'}
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
                                defaultValue={props.passwordConfirm}
                                ref={register({
                                    required: true
                                })}
                            />
                            {errors.passwordConfirm && 'Confirm the password.'}
                        </>
                    }
                />

                {props.role === 'educator' ?
                    <>
                        <SinglePaneRow
                            rowClassName='row-sign-up-form'
                            pane={
                                <>
                                    <input
                                        type='text'
                                        name='company'
                                        placeholder='Company'
                                        defaultValue={props.company}
                                        ref={register({
                                            required: true
                                        })}
                                    />
                                    {errors.company && 'Company name is required.'}
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
                                        defaultValue={props.website}
                                        ref={register}
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
                                    defaultValue={props.description}
                                    ref={register}
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
                                    id='read_terms_and_conditions'
                                    name='read_terms_and_conditions'
                                    className='sign-up-form__checkbox'
                                    defaultValue={props.read_terms_and_conditions}
                                    ref={register({
                                        required: true
                                    })}
                                />
                                {errors.read_terms_and_condition && 'You must accept terms and conditions before submit.'}
                                <label htmlFor='read_terms_and_conditions'>
                                    I have agreed to the Terms and Conditions
                                </label>
                            </>}
                    />
                }

                <SinglePaneRow
                    rowClassName='row-sign-up-form'
                    pane={
                        <input
                            type='submit'
                            value='SIGN UP'
                            className={`btn btn--dt ${props.role === 'educator' ? 'btn--primary ' : 'btn--tertiary '}sign-up-form__btn--submit`}
                        />
                    }
                />

            </form>

        </section >
    )
}

const mapStateToProps = state => {
    console.log("current state is:" + JSON.stringify(state));
};

export default connect(
    ({
        name,
        surname,
        email,
        phone,
        password,
        company,
        website,
        role
    }) => ({
        name,
        surname,
        email,
        phone,
        password,
        company,
        website,
        role
    }),
    userSignUp)(SignUpForm);