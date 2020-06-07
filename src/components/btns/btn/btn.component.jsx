import React from 'react';

import './btn.styles.scss';

const Button = (props) => {

    return (
        <button
            type={props.type || 'button'}
            className={`btn ${props.className}`}
        >
            {props.title}
        </button>)
};

export default Button;