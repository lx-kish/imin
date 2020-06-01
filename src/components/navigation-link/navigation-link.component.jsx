import React from 'react';
import { Link } from 'react-router-dom';

import './navigation-link.styles.scss';

const NavigationLink = props => (
    <Link
        to={props.link}
        className={props.className}
    >
        {props.name}
    </Link>
);

export default NavigationLink;