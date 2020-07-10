import React from 'react';

const FormFields = props => {

    const renderField = () => {

        return (
            <div className={props.formData.elementClassName}>
                {renderTemplate(props.formData)}
            </div>
        )

    }

    const showLabel = (show, label, labelClassName, labelFor) => {
        return show ?
            <label
                className={labelClassName}
                htmlFor={labelFor}
            >
                {label}
            </label>
            : null
    }

    const changeHandler = (event, id, blur) => {
        const newState = props.formData;
        // console.log(event.target);
        newState.value = event.target.value;
        // newState[id].value = event.target.value;

        if (blur) {
            let validData = validate(newState)
            newState.valid = validData[0];
            newState.validationMessage = validData[1];
        }

        newState.touched = blur;

        // console.log('id = ', id);
        // console.log('new state = ', newState);

        // if (blur) {
        //     let validData = validate(newState[id])
        //     newState[id].valid = validData[0];
        //     newState[id].validationMessage = validData[1];
        // }
        // newState[id].touched = blur;

        props.change(newState)

    }

    const validate = (element) => {

        let error = [true, '']

        if (element.validation.minLen) {
            const valid = element.value.length >= element.validation.minLen;
            const message = `${!valid ? 'Must be greater than ' + element.validation.minLen : ''}`
            error = !valid ? [valid, message] : error
        }

        if (element.validation.required) {
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`

            error = !valid ? [valid, message] : error
        }

        return error;
    }

    const showValidation = (data) => {
        let errorMessage = null;

        if (data.validation && !data.valid) {
            errorMessage = (
                <div className="label-error">
                    {data.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = (data) => {
        let formTemplate = '';
        let values = data;

        switch (values.element) {
            case ('input'):
                formTemplate = (
                    <>
                        {showValidation(values)}
                        {showLabel(values.label, values.labelText, values.labelClassName, values.config.name)}
                        <input
                            {...values.config}
                            value={values.value}
                            onBlur={
                                (event) => changeHandler(event, data.field, true)
                            }
                            onChange={
                                (event) => changeHandler(event, data.field, false)
                            }
                        />
                    </>
                )
                break;
            case ('textarea'):
                formTemplate = (
                    <>
                        {showLabel(values.label, values.labelText, values.labelClassName, values.config.name)}
                        <textarea
                            {...values.config}
                            value={values.value}
                            onChange={
                                (event) => changeHandler(event, data.field)
                            }
                        />
                    </>
                )
                break;
            case ('select'):
                formTemplate = (
                    <>
                        {showLabel(values.label, values.labelText, values.labelClassName, values.config.name)}
                        <div className={values.wraperClassName}>
                            <select
                                {...values.config}
                                value={values.value}
                                name={values.config.name}
                                // className={values.config.className}
                                onChange={
                                    (event) => changeHandler(event, data.field)
                                }
                            >
                                {values.options.map((item, i) => (
                                    <option key={i} value={item.val}>
                                        {item.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <>
            {renderField()}
        </>
    )
}

export default FormFields;