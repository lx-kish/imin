import React from 'react';

import NavigationLink from '../../navigation/navigation-link/navigation-link.component';

const PartArticle = props => (

    <div className={props.componentClassName}>
        <h4 className={props.headerCommonClassName}>For those that want to</h4>
        <h2 className={props.headerClassName}>{props.header}</h2>
        <p className={props.paragraphClassName}>{props.paragraph}</p>


        <NavigationLink
            link={props.ctaLink}
            className={props.ctaClassName}
            name={props.cta}
        />
    </div>
);

export default PartArticle;