import React from 'react';

const TextParagraph = props => (

    <p className={props.paragraphClassName}>
        {props.paragraph}
    </p>
);

export default TextParagraph;