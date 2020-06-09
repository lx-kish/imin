import React from 'react';

import NavigationLink from '../../../navigation/navigation-link/navigation-link.component';

const LinkedBottomParagraph = props => (

    <div className={props.componentClassName}>
        <p className={props.paragraphClassName}>
            {props.paragraph}
        </p>
        <NavigationLink
            link={props.link}
            className={props.linkClassName}
            name={props.linkName}
        />
    </div>
);

export default LinkedBottomParagraph;