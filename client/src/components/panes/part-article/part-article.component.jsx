import React from 'react';
import { Link } from 'react-router-dom';

const PartArticle = props => {

    return (
        <div className={props.componentClassName}>
            <h4 className={props.titles.headerCommonClassName}>For those that want to</h4>
            <h2 className={props.titles.headerClassName}>{props.titles.header}</h2>
            <p className={props.paragraph.paragraphClassName}>{props.paragraph.paragraph}</p>
            <Link
                to={props.cta.link}
                className={props.cta.className}
            >
                {props.cta.text}
            </Link>
        </div>
    );
}

export default PartArticle;