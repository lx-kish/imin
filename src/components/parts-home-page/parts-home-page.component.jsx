import React from 'react';

import './parts-home-page.styles.scss';

import educateImg from '../../graphics/pages-content/home-page/home-educate-1x.png';
import learnImg from '../../graphics/pages-content/home-page/home-learn-1x.png';
import supportImg from '../../graphics/pages-content/home-page/home-support-1x.png';

import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import Image from '../panes/image/image.component';
import PartArticle from '../panes/part-article/part-article.component';

const content = {

    section_header: `How can you be part of I'm in?`,
    parts: [
        {
            sectionClassName: 'bg-grey',
            rowClassName: 'parts__container row--parts container',
            colClassName: 'col-1-of-2--parts',
            imgSrc: educateImg,
            imgAlt: 'For those who want to educate',
            textComponentClassName: 'parts__article',
            header: 'educate',
            headerCommonClassName: 'parts__article-title--common heading-quaternary',
            headerClassName: 'parts__article-title color-pink heading-secondary',
            paragraph: `It's easy to teach your skills to our nation's future leaders. Our platform connects local industry and organisations with young people and supports your organisation to deliver a world class education experience.`,
            paragraphClassName: 'parts__article-paragraph paragraph',
            cta: 'Become a community educator.',
            ctaLink: '/educators',
            ctaClassName: 'navigation-link color-pink paragraph--uppercase'
        },
        {
            sectionClassName: '',
            rowClassName: 'parts__container row--parts container',
            colClassName: 'col-1-of-2--parts',
            imgSrc: learnImg,
            imgAlt: 'For those who want to learn',
            textComponentClassName: 'parts__article',
            header: 'learn',
            headerCommonClassName: 'parts__article-title--common heading-quaternary',
            headerClassName: 'parts__article-title color-violet heading-secondary',
            paragraph: `It's easy to learn from industry experts. With I'm In, access education experiences to help you discover your future pathway. Combining the best of gamification with real world experiences you can engage in and track your learning jurney, like never before.`,
            paragraphClassName: 'parts__article-paragraph paragraph',
            cta: `Learn through I'm In.`,
            ctaLink: '/students',
            ctaClassName: 'navigation-link color-violet paragraph--uppercase'
        },
        {
            sectionClassName: 'bg-grey',
            rowClassName: 'parts__container row--parts container',
            colClassName: 'col-1-of-2--parts',
            imgSrc: supportImg,
            imgAlt: 'For those who want to support',
            textComponentClassName: 'parts__article',
            header: 'support',
            headerCommonClassName: 'parts__article-title--common heading-quaternary',
            headerClassName: 'parts__article-title color-pink heading-secondary',
            paragraph: `Our mission is to help young people get off to a flying start by making industry led education free and accessible. We help young people into education and employment. Partner with us, and together we will see young kiwis take flight.`,
            paragraphClassName: 'parts__article-paragraph paragraph',
            cta: 'Become a partner.',
            ctaLink: '/partners',
            ctaClassName: 'navigation-link color-pink paragraph--uppercase'
        }
    ]
};

const element = (part, i) => (


    < section
        key={i}
        className={part.sectionClassName}
    >
        <DoublePanesRow
            rowClassName={part.rowClassName}
            leftColClassName={part.colClassName}
            rightColClassName={part.colClassName}
            left={
                <Image
                    src={part.imgSrc}
                    alt={part.imgAlt}
                    className=''
                />
            }
            right={
                <PartArticle
                    componentClassName={part.textComponentClassName}
                    header={part.header}
                    headerCommonClassName={part.headerCommonClassName}
                    headerClassName={part.headerClassName}
                    paragraph={part.paragraph}
                    paragraphClassName={part.paragraphClassName}
                    cta={part.cta}
                    ctaLink={part.ctaLink}
                    ctaClassName={part.ctaClassName}
                />
            }
        />
    </section >
);

const showParts = () => (

    content.parts.map((part, i) => {
        return element(part, i);
    })
);

const PartsHomePage = () => (
    <section className='parts'>
        <h2 className='parts__heading parts__container heading-secondary'>
            {content.section_header}
        </h2>
        {showParts()}
    </section>
);

export default PartsHomePage;