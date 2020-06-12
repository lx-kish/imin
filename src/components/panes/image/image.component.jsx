import React from 'react';

import './image.styles.scss';

const Image = props => {

    return (
        <img
            src={props.src}
            alt={props.alt}
            className={`image ${props.className}`}
        />
    );
}

export default Image;