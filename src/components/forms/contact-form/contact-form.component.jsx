import React from 'react';

import './contact-form.styles.scss';

import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import FormFields from '../forms-fields/form-fields.component';
import ButtonPrimary from '../../btns/btn-primary/btn-primary.component';

class ContactForm extends React.Component {

    state = {
        name: {
            field: 'name',
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            config: {
                name: 'name_input',
                type: 'text',
                placeholder: 'First Name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        lastname: {
            field: 'lastname',
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            config: {
                name: 'lastname_input',
                type: 'text',
                placeholder: 'Last Name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        phone: {
            field: 'phone',
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            config: {
                name: 'tel_input',
                type: 'tel',
                placeholder: 'Contact Number'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        email: {
            field: 'email',
            element: 'input',
            value: '',
            label: false,
            labelText: '',
            config: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Email Address'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        participant: {
            field: 'participant',
            element: 'select',
            value: '',
            label: false,
            labelText: '',
            config: {
                name: 'participant_input',
                options: [
                    { val: 'educator', text: 'I want to be an educator' },
                    { val: 'student', text: 'I want to be a student' },
                    { val: 'partner', text: 'I want to be a partner' }
                ]
            },
            validation: {
                required: false
            },
            valid: true
        }
    }

    updateForm = (newState) => {
        this.setState({
            formData: newState
        })
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
                                formData={this.state.name}
                                onblur={(newState) => this.updateForm(newState)}
                                change={(newState) => this.updateForm(newState)}
                            />
                        }
                        right={
                            <FormFields
                                formData={this.state.lastname}
                                onblur={(newState) => this.updateForm(newState)}
                                change={(newState) => this.updateForm(newState)}
                            />
                        }
                    />

                    <DoublePanesRow
                        rowClassName='row-contact-form'
                        leftColClassName='col-1-of-2--contact-form'
                        rightColClassName='col-1-of-2--contact-form'
                        left={
                            <FormFields
                                formData={this.state.phone}
                                onblur={(newState) => this.updateForm(newState)}
                                change={(newState) => this.updateForm(newState)}
                            />
                        }
                        right={
                            <FormFields
                                formData={this.state.email}
                                onblur={(newState) => this.updateForm(newState)}
                                change={(newState) => this.updateForm(newState)}
                            />
                        }
                    />

                    <DoublePanesRow
                        rowClassName='row-contact-form'
                        leftColClassName='col-1-of-2--contact-form'
                        rightColClassName='col-1-of-2--contact-form'
                        left={
                            <FormFields
                                formData={this.state.participant}
                                onblur={(newState) => this.updateForm(newState)}
                                change={(newState) => this.updateForm(newState)}
                            />
                        }
                        right={
                            <ButtonPrimary
                                name='Submit'
                                type='submit'
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