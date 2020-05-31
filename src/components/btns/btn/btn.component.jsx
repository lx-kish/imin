import React from 'react';

import './btn.styles.scss';

const Button = (props) => {
    console.log(props.className)
return (
    <button className={`btn ${props.className}`}>
        {props.name}
    </button>)
};

export default Button;