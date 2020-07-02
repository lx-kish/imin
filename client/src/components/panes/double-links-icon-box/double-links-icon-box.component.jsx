import React from 'react';

import { Link } from 'react-router-dom';

const DoubleLinksIconBox = props => {
    return (
        <div className={props.className}>
            <Link
                to={props.link1.to}
                className={props.link1.className}
            >
                {props.icon1}
            </Link>
            <Link
                to={props.link2.to}
                className={props.link2.className}
            >
                {props.icon2}
            </Link>
        </div>
    )
};

export default DoubleLinksIconBox;