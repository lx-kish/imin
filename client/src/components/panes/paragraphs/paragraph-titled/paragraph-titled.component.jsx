import React from 'react';

const TextParagraph = props => {

    return (
        <>
            <h1 className={props.titleClassName}>
                {props.title}
            </h1>
            <p className={props.paragraphClassName}>
                {props.paragraph}
            </p>
        </>
    );
}

export default TextParagraph;