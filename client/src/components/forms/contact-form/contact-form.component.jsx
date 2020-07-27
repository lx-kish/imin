import React from 'react';

import './contact-form.styles.scss';

import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import FormFields from '../forms-fields/form-fields.component';
import Btn from '../../btn/btn.component';

class ContactForm extends React.Component {

    state = {
        formData: {
            name: {
                field: 'name', //field name for service purposes
                element: 'input', //type of element input|text area|select
                elementClassName: 'contact-form__element', //form element (field+label) className
                value: '', //value
                label: false, //show label: true|false
                labelText: '', //text label (if show)
                labelClassName: '', //label styles
                config: { //properties of element (attributes)
                    name: 'name_input',
                    className: 'contact-form__input',
                    type: 'text',
                    placeholder: 'First Name'
                },
                validation: { //field validation required: true|false
                    required: false
                },
                valid: false, //field valid: true|false
                touched: false, //for blur field touched flag: true|false
                labelErrorClassName: 'contact-form__label-error',
                validationMessage: '' //warning text if the field invalid
            },
            lastname: {
                field: 'lastname',
                element: 'input',
                elementClassName: 'contact-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'lastname_input',
                    className: 'contact-form__input',
                    type: 'text',
                    placeholder: 'Last Name'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'contact-form__label-error',
                validationMessage: ''
            },
            phone: {
                field: 'phone',
                element: 'input',
                elementClassName: 'contact-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'tel_input',
                    className: 'contact-form__input',
                    type: 'tel',
                    placeholder: 'Contact Number'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'contact-form__label-error',
                validationMessage: ''
            },
            email: {
                field: 'email',
                element: 'input',
                elementClassName: 'contact-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'email_input',
                    className: 'contact-form__input',
                    type: 'email',
                    placeholder: 'Email Address'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'contact-form__label-error',
                validationMessage: ''
            },
            participant: {
                field: 'participant',
                element: 'select',
                elementClassName: 'contact-form__element',
                value: '',
                label: true,
                labelText: 'Which one are you?',
                labelClassName: 'contact-form__select-label',
                wraperClassName: 'contact-form__select-box',
                config: {
                    name: 'participant_input',
                    className: 'contact-form__select'
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
    }

    updateForm = (newState, key) => {
        // this.setState({
        //     formData: newState
        // })

        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [prevState.formData[key]]: newState
            }
        }));
    }

    submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in this.state.formData) {
            dataToSubmit[key] = this.state.formData[key].value
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
    }

    render() {
        return (
            <section className='contact-form'>
                <h2 className='contact-form__heading heading-secondary heading-secondary--uppercase'>I'm in. Are you?</h2>
                <p className="contact-form__description">
                    Sign up to receive email updages on this project.
                </p>
                <form
                    className='contact-form__form container'
                    onSubmit={this.submitForm}
                >
                    <DoublePanesRow
                        rowClassName='row-contact-form'
                        leftColClassName='col-1-of-2--contact-form'
                        rightColClassName='col-1-of-2--contact-form'
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
                        rowClassName='row-contact-form'
                        leftColClassName='col-1-of-2--contact-form'
                        rightColClassName='col-1-of-2--contact-form'
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
                        rowClassName='row-contact-form'
                        leftColClassName='col-1-of-2--contact-form'
                        rightColClassName='col-1-of-2--contact-form contact-form--btn-box'
                        left={
                            // <span className='contact-form__label'>{'Which one are you?'}</span>
                            <FormFields
                                formData={this.state.formData['participant']}
                                onblur={(newState) => this.updateForm(newState, 'participant')}
                                change={(newState) => this.updateForm(newState, 'participant')}
                            />
                        }
                        right={
                            <Btn
                                type='submit'
                                title='Submit'
                                className='btn--primary contact-form__btn--submit'
                            />
                        }
                    />
                </form>
                {/* {showFields()} */}
            </section>
        )
    }
}

export default ContactForm;