import React from 'react';

import './parts-home-page.styles.scss';

import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import Image from '../panes/image/image.component';
import PartArticle from '../panes/part-article/part-article.component';

const content = {

    section_header: `How can you be part of I'm in?`,
    parts: [
        {
            sectionClassName: 'bg-grey',
            rowClassName: 'container',
            imgSrc: '',
            imgAlt: '',
            header: 'educate',
            headerClassName: 'heading-secondary',
            paragraph: `It's easy to teach your skills to our nation's future leaders. Our platform connects local industry and organisations with young people and supports your organisation to deliver a world class education experience.`,
            cta: 'Become a community educator.',
            ctaLink: '/',
            ctaClassName: 'navigation-link color-pink paragraph--uppercase'
        },
        {
            sectionClassName: '',
            rowClassName: 'container',
            imgSrc: '',
            imgAlt: '',
            header: 'learn',
            headerClassName: 'heading-secondary',
            paragraph: `It's easy to learn from industry experts. With I'm In, access education experiences to help you discover your future pathway. Combining the best of gamification with real world experiences you can engage in and track your learning jurney, like never before.`,
            cta: `Learn through I'm In.`,
            ctaLink: '/',
            ctaClassName: 'navigation-link color-violet paragraph--uppercase'
        },
        {
            sectionClassName: 'bg-grey',
            rowClassName: 'container',
            imgSrc: '',
            imgAlt: '',
            header: 'support',
            headerClassName: 'heading-secondary',
            paragraph: `Our mission is to help young people get off to a flying start by making industry led education free and accessible. We help young people into education and employment. Partner with us, and together we will see young kiwis take flight.`,
            cta: 'Become a partner.',
            ctaLink: '/',
            ctaClassName: 'navigation-link color-pink paragraph--uppercase'
        }
    ]
};

const element = (part, i) => (

    <DoublePanesRow
        key={i}
        sectionClassName={part.sectionClassName}
        rowClassName={part.rowClassName}
        leftColClassName={''}
        rightColClassName={''}
        left={
            <Image
                src={part.imgSrc}
            />
        }
        right={
            <PartArticle
                header={part.header}
                headerClassName={part.headerClassName}
                paragraph={part.paragraph}
                cta={part.cta}
                ctaLink={part.ctaLink}
                ctaClassName={part.ctaClassName}
            />
        }
    />
);

const showParts = () => (

    content.parts.map((part, i) => {

        return element(part, i);
    })
);

const PartsHomePage = () => (
    <section className=''>
        <h2 className='heading-secondary'>{content.section_header}</h2>
        {showParts()}
    </section>
);

export default PartsHomePage;