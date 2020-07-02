import React from 'react';

const TextParagraph = props => {

    return (
        <React.Fragment>
            <h1 className={props.titleClassName}>
                {props.title}
            </h1>
            <p className={props.paragraphClassName}>
                {props.paragraph}
            </p>
        </React.Fragment>
    );
}

export default TextParagraph;