import React from 'react';
import { Link } from 'react-router-dom';

const LinkedBottomParagraph = props => {

    return (
        <div className={props.componentClassName}>
            <p className={props.paragraphClassName}>
                {props.paragraph}
            </p>
            <Link
                to={props.link}
                className={props.linkClassName}
            >
                {props.linkName}
            </Link>
        </div>
    );
}

export default LinkedBottomParagraph;