import React from 'react';

import './part-article.styles.scss';

import NavigationLink from '../../navigation-link/navigation-link.component';

const PartArticle = props => (

    <div className='part-article'>
        <h4 className='heading-quaternary'>For those that want to</h4>
        <h2 className={props.headerClassName}>{props.header}</h2>
        <p className='paragraph'>{props.paragraph}</p>


        <NavigationLink
            link={props.ctaLink}
            className={props.ctaClassName}
            name={props.cta}
        />
    </div>
);

export default PartArticle;