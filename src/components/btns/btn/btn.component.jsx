import React from 'react';

import './btn.styles.scss';

const Button = (props) => {

    return (
        <button
            className={`btn ${props.className}`}
            type={props.type}
        >
            {props.name}
        </button>)
};

export default Button;