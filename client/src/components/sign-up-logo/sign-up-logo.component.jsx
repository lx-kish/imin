import React from 'react';

const Logo = props => {

    return (
        <div className={props.className}>
            <img
                src={props.img.src}
                alt={props.img.alt}
                className={props.img.className}
            />
        </div>
    )
};

export default Logo;