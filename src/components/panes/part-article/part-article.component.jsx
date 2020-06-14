import React from 'react';

import NavigationLink from '../../navigation/navigation-link/navigation-link.component';

const PartArticle = props => {

    return (
        <div className={props.componentClassName}>
            <h4 className={props.titles.headerCommonClassName}>For those that want to</h4>
            <h2 className={props.titles.headerClassName}>{props.titles.header}</h2>
            <p className={props.paragraph.paragraphClassName}>{props.paragraph.paragraph}</p>
            <NavigationLink
                link={props.cta.link}
                className={props.cta.className}
                name={props.cta.text}
            />
        </div>
    );
}

export default PartArticle;