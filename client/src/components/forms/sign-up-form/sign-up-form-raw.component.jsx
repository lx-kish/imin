import React from 'react';
import { connect } from "react-redux";

import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import SinglePaneRow from '../../../hoc/rows/single-pane-row/single-pane-row.component';
import FormFields from '../forms-fields/form-fields.component';
import Btn from '../../btns/btn/btn.component';

const SignUpForm = props => {

    /**
    * Single state hook useState for all the state properties and form attributes
    */
    const [fullState, setFullState] = React.useState({

        formData: {
            name: {
                field: 'name', //field name for service purposes
                element: 'input', //type of element input|text area|select
                elementClassName: 'sign-up-form__element', //form element (field+label) className
                value: '', //value
                label: false, //show label: true|false
                labelText: '', //text label (if show)
                labelClassName: '', //label styles
                config: { //properties of element (attributes)
                    name: 'name_input',
                    className: 'sign-up-form__input',
                    type: 'text',
                    placeholder: 'First Name'
                },
                validation: { //field validation required: true|false
                    required: false
                },
                valid: false, //field valid: true|false
                touched: false, //for blur field touched flag: true|false
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: '' //warning text if the field invalid
            },
            lastname: {
                field: 'lastname',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'lastname_input',
                    className: 'sign-up-form__input',
                    type: 'text',
                    placeholder: 'Last Name'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            phone: {
                field: 'phone',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'tel_input',
                    className: 'sign-up-form__input',
                    type: 'tel',
                    placeholder: 'Contact Number'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            email: {
                field: 'email',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'email_input',
                    className: 'sign-up-form__input',
                    type: 'email',
                    placeholder: 'Email Address'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            password: {
                field: 'password',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'password_input',
                    className: 'sign-up-form__input',
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            passwordConfirm: {
                field: 'passwordConfirm',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'password-confirm_input',
                    className: 'sign-up-form__input',
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            read: {
                field: 'read',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: true,
                labelText: 'I have agreed to the Terms and Conditions',
                labelClassName: '',
                config: {
                    name: 'read_terms_and_conditions',
                    className: 'sign-up-form__checkbox',
                    type: 'checkbox'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            company: {
                field: 'company',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'company_input',
                    className: 'sign-up-form__input',
                    type: 'text',
                    placeholder: 'Company Name'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            website: {
                field: 'website',
                element: 'input',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'website_input',
                    className: 'sign-up-form__input',
                    type: 'text',
                    placeholder: 'Company Website'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'sign-up-form__label-error',
                validationMessage: ''
            },
            passionate: {
                field: 'passionate',
                element: 'textarea',
                elementClassName: 'sign-up-form__element',
                value: '',
                label: true,
                labelText: 'What makes you passionate about working with I’m In?',
                labelClassName: 'sign-up-form__description-label',
                config: {
                    name: 'description_input',
                    className: 'sign-up-form__textarea',
                    rows: 5,
                    cols: 36
                },
                validation: {
                    required: false
                },
                valid: false
            }
        }
    });

    const handleChange = e => {
        
        const { name, value } = e;
        setFullState(fullState => ({
            ...fullState,
            [name]: value
        }))
    }

    // /**
    // * React hook useEffect for updating sticky state property
    // * on display property changing
    // */
    // React.useEffect((newState, key) => {

    //     setFullState({
    //         ...fullState,
    //         formData[key]: newState
    //     })

    // }, []);

    // const updateForm = (newState, key) => {
    //     // this.setState({
    //     //     formData: newState
    //     // })

    //     this.setState(prevState => ({
    //         formData: {
    //             ...prevState.formData,
    //             [prevState.formData[key]]: newState
    //         }
    //     }));
    // }

    const submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in fullState.formData) {
            dataToSubmit[key] = fullState.formData[key].value
        }

        for (let key in fullState.formData) {
            formIsValid = fullState.formData[key].valid && formIsValid;
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
    }

    return (
        <section className='sign-up-form'>
            <h2
                className='sign-up-form__heading heading-secondary heading-secondary--uppercase'
            >
                {`${props.role === 'educator' ? 'Educator' : 'Student'} Sign Up`}
            </h2>
            <form
                className='sign-up-form__form container'
                onSubmit={submitForm}
            >
                <DoublePanesRow
                    rowClassName='row-sign-up-form'
                    leftColClassName='col-1-of-2--sign-up-form'
                    rightColClassName='col-1-of-2--sign-up-form'
                    left={
                        <FormFields
                            formData={fullState.formData['name']}
                            onblur={handleChange}
                            change={handleChange}
                        />
                    }
                    right={
                        <FormFields
                            formData={fullState.formData['lastname']}
                            onblur={handleChange}
                            change={handleChange}
                        />
                    }
                />

                <SinglePaneRow
                    rowClassName='row-sign-up-form'
                    pane={<FormFields
                        formData={fullState.formData['email']}
                        onblur={handleChange}
                        change={handleChange}
                    />}
                />

                <SinglePaneRow
                    rowClassName='row-sign-up-form'
                    pane={<FormFields
                        formData={fullState.formData['phone']}
                        onblur={handleChange}
                        change={handleChange}
                    />}
                />

                <SinglePaneRow
                    rowClassName='row-sign-up-form'
                    pane={<FormFields
                        formData={fullState.formData['password']}
                        onblur={handleChange}
                        change={handleChange}
                    />}
                />

                <SinglePaneRow
                    rowClassName='row-sign-up-form'
                    pane={<FormFields
                        formData={fullState.formData['passwordConfirm']}
                        onblur={handleChange}
                        change={handleChange}
                    />}
                />

                {props.role === 'educator' ?
                    <>
                        <SinglePaneRow
                            rowClassName='row-sign-up-form'
                            pane={<FormFields
                                formData={fullState.formData['company']}
                                onblur={handleChange}
                                change={handleChange}
                            />}
                        />

                        <SinglePaneRow
                            rowClassName='row-sign-up-form'
                            pane={<FormFields
                                formData={fullState.formData['website']}
                                onblur={handleChange}
                                change={handleChange}
                            />}
                        />

                        <SinglePaneRow
                            rowClassName='row-sign-up-form'
                            pane={<FormFields
                                formData={fullState.formData['passionate']}
                                onblur={handleChange}
                                change={handleChange}
                            />}
                        />
                    </>
                    :
                    <SinglePaneRow
                        rowClassName='row-sign-up-form'
                        pane={<>
                            <input
                                type='checkbox'
                                id='read_terms_and_conditions'
                                name='read_terms_and_conditions'
                                className='sign-up-form__checkbox'
                                value='read'

                                onBlur={handleChange}
                                onChange={handleChange}
                            />
                            <label htmlFor='read_terms_and_conditions'>
                                I have agreed to the Terms and Conditions
                            </label>
                        </>}
                    />
                }

                <SinglePaneRow
                    rowClassName='row-sign-up-form'
                    pane={<Btn
                        type='submit'
                        title='Submit'
                        className={`btn btn--dt ${props.role === 'educator' ? 'btn--primary ' : 'btn--tertiary '}sign-up-form__btn--submit`}
                    />}
                />

            </form>

        </section>
    )
}

// const mapStateToProps = state => ({ todos: state.todos });
// const mapDispatchToProps = dispatch => {
//   return {
//     addTodo: payload => dispatch(addTodo(payload)),
//     doneTodo: payload => dispatch(doneTodo(payload)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
export default SignUpForm;