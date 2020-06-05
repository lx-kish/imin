import React from 'react';

const FormFields = (props) => {

    // const renderFields = () => {
    //     const formArray = [];

    //     for (let elementName in props.formData) {
    //         formArray.push({
    //             id: elementName,
    //             settings: props.formData[elementName]
    //         })
    //     }

    //     return formArray.map((item, i) => {
    //         return (
    //             <div key={i} className="form_element">
    //                 {renderTemplates(item)}
    //             </div>
    //         )
    //     })

    // }

    const renderField = () => {

        // console.log(props.formData);
        // const formArray = [];

        // for (let elementName in props.formData) {
        //     console.log(Object.keys(props.formData)[0]);
        //     formArray.push({
        //         id: elementName,
        //         settings: props.formData[elementName]
        //     })
        // }

        // console.log(props.formData);

        return (
            <div className="form_element">
                {renderTemplate(props.formData)}
            </div>
        )


        // return formArray.map((item, i) => {
        //     return (
        //         <div key={i} className="form_element">
        //             {renderTemplates(item)}
        //         </div>
        //     )
        // })

    }

    const showLabel = (show, label) => {
        return show ?
            <label>{label}</label>
            : null
    }

    const changeHandler = (event, id, blur) => {
        const newState = props.formData;
        console.log(event.target);
        newState.value = event.target.value;
        // newState[id].value = event.target.value;

        if (blur) {
            let validData = validate(newState)
            newState.valid = validData[0];
            newState.validationMessage = validData[1];
        }

        newState.touched = blur;

        console.log('new state = ', newState);

        // if (blur) {
        //     let validData = validate(newState[id])
        //     newState[id].valid = validData[0];
        //     newState[id].validationMessage = validData[1];
        // }

        // newState[id].touched = blur;

        props.change(newState)

    }

    const validate = (element) => {
        console.log(element)
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
                <div className="label_error">
                    {data.validationMessage}
                </div>
            )
        }
        return errorMessage;
    }

    const renderTemplate = (data) => {
        let formTemplate = '';
        let values = data;

        console.log(data.field);
        // console.log(data, data.field);

        switch (values.element) {
            case ('input'):
                formTemplate = (
                    <React.Fragment>
                        {showValidation(values)}
                        {showLabel(values.label, values.labelText)}
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
                        {/* {showValidation(values)} */}
                    </React.Fragment>
                )
                break;
            case ('textarea'):
                formTemplate = (
                    <React.Fragment>
                        {showLabel(values.label, values.labelText)}
                        <textarea
                            {...values.config}
                            value={values.value}
                            onChange={
                                (event) => changeHandler(event, data.field)
                            }
                        />
                    </React.Fragment>
                )
                break;
            case ('select'):
                formTemplate = (
                    <React.Fragment>
                        {showLabel(values.label, values.labelText)}
                        <select
                            value={values.value}
                            name={values.config.name}
                            onChange={
                                (event) => changeHandler(event, data.field)
                            }
                        >
                            {values.config.options.map((item, i) => (
                                <option key={i} value={item.val}>
                                    {item.text}
                                </option>
                            ))}
                        </select>
                    </React.Fragment>
                )
                break;
            default:
                formTemplate = null;
        }
        return formTemplate;
    }

    return (
        <React.Fragment>
            {renderField()}
        </React.Fragment>
    )
}

export default FormFields;