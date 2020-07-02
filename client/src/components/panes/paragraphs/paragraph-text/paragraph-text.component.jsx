import React from 'react';

const TextParagraph = props => {

    return (
        <p className={props.paragraphClassName}>
            {props.paragraph}
        </p>
    );
}

export default TextParagraph;