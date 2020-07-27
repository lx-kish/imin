import React from 'react';

import './enquiry-form.styles.scss';

import SinglePaneRow from '../../../hoc/rows/single-pane-row/single-pane-row.component';
import DoublePanesRow from '../../../hoc/rows/double-panes-row/double-panes-row.hoc';
import FormFields from '../forms-fields/form-fields.component';
import Btn from '../../btn/btn.component';

class EnquiryForm extends React.Component {

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
                    className: 'enquiry-form__input',
                    type: 'text',
                    placeholder: 'First Name'
                },
                validation: { //field validation required: true|false
                    required: false
                },
                valid: false, //field valid: true|false
                touched: false, //for blur field touched flag: true|false
                labelErrorClassName: 'enquiry-form__label-error',
                validationMessage: '' //warning text if the field invalid
            },
            lastname: {
                field: 'lastname',
                element: 'input',
                elementClassName: 'enquiry-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'lastname_input',
                    className: 'enquiry-form__input',
                    type: 'text',
                    placeholder: 'Last Name'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'enquiry-form__label-error',
                validationMessage: ''
            },
            phone: {
                field: 'phone',
                element: 'input',
                elementClassName: 'enquiry-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'tel_input',
                    className: 'enquiry-form__input',
                    type: 'tel',
                    placeholder: 'Contact Number'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'enquiry-form__label-error',
                validationMessage: ''
            },
            email: {
                field: 'email',
                element: 'input',
                elementClassName: 'enquiry-form__element',
                value: '',
                label: false,
                labelText: '',
                labelClassName: '',
                config: {
                    name: 'email_input',
                    className: 'enquiry-form__input',
                    type: 'email',
                    placeholder: 'Email Address'
                },
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                labelErrorClassName: 'enquiry-form__label-error',
                validationMessage: ''
            },
            message: {
                field: 'message',
                element: 'textarea',
                elementClassName: 'enquiry-form__element',
                value: '',
                label: true,
                labelText: 'Your message',
                labelClassName: 'enquiry-form__message-label',
                config: {
                    name: 'message_input',
                    className: 'enquiry-form__textarea',
                    rows: 5,
                    cols: 36
                },
                validation: {
                    required: false
                },
                valid: false
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
            <section className='enquiry-form'>
                <h2 className='enquiry-form__heading heading-secondary heading-secondary--uppercase'>Enquiry form</h2>
                <form
                    className='enquiry-form__form container'
                    onSubmit={this.submitForm}
                >
                    <DoublePanesRow
                        rowClassName='flex-box flex-box-row row-enquiry-form'
                        leftColClassName='col-1-of-2--enquiry-form'
                        rightColClassName='col-1-of-2--enquiry-form'
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
                        rowClassName='row-enquiry-form'
                        leftColClassName='col-1-of-2--enquiry-form'
                        rightColClassName='col-1-of-2--enquiry-form'
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

                    <SinglePaneRow
                        rowClassName='row-enquiry-form'
                        pane={<FormFields
                            formData={this.state.formData['message']}
                            onblur={(newState) => this.updateForm(newState, 'message')}
                            change={(newState) => this.updateForm(newState, 'message')}
                        />}
                    />
                    
                    <SinglePaneRow
                        rowClassName='row-enquiry-form enquiry-form--btn-box'
                        pane={<Btn
                            type='submit'
                            title='Enquire now'
                            className='btn--primary enquiry-form__btn--submit'
                        />}
                    />
                </form>
            </section>
        )
    }
}

export default EnquiryForm;