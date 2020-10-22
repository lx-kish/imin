import React from 'react';

import './btn.styles.scss';

const Button = props => {

    return (
        <button
            type={props.type || 'button'}
            onClick={props.onClick ? props.onClick : null}
            className={`${props.className}`}
        >
            {props.title}
        </button>)
};

export default Button;