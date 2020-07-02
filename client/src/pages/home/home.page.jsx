import React from 'react';

import './home.styles.scss';

import educateImg from '../../graphics/pages-content/home-page/home-educate-1x.png';
import learnImg from '../../graphics/pages-content/home-page/home-learn-1x.png';
import supportImg from '../../graphics/pages-content/home-page/home-support-1x.png';

import HeaderHomePage from '../../components/headers/header-home-page/header-home-page.component';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import Image from '../../components/panes/image/image.component';
import PartArticle from '../../components/panes/part-article/part-article.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

// import PartsHomePage from '../../components/parts-home-page/parts-home-page.component';

const content = {
    header: {
        headerClassName: 'header header--home-page',
        containerClassName: 'header__container header__container--home-page',
        title: 'Industry and Community-led Education',
        titleClassName: 'header__title--home-page heading-primary color-pink',
        contentBox: {
            contentClassName: 'header__content-box',
            paragraph: `At I'm In, our vision is to make community led education and development opportunities <b>free and accessible</b> for every young person in every corner of New Zealand. Our platform connects organisations, businesses and individuals who want to teach, with young people who want to learn.`,
            paragraphClassName: 'header__paragraph',
            button: {
                boxClassName: 'header__btn-box',
                config: {
                    type: 'button',
                    title: 'Register Now',
                    className: 'btn--primary'
                }
            }
        }
    },
    content: {
        sectionClassName: 'parts',
        sectionHeader: {
            sectionHeaderClassName: 'parts__heading parts__container heading-secondary',
            sectionHeader: `How can you be part of I'm in?`
        },
        partsSections: [
            {
                sectionClassName: 'bg-grey',
                rowClassName: 'parts__container row--parts container',
                colClassName: 'col-1-of-2--parts',
                img: {
                    src: educateImg,
                    alt: 'For those who want to educate',
                    className: 'image'
                },
                text: {
                    componentClassName: 'parts__article',
                    titles: {
                        header: 'educate',
                        headerCommonClassName: 'parts__article-title--common heading-quaternary',
                        headerClassName: 'parts__article-title color-pink heading-secondary'
                    },
                    paragraph: {
                        paragraph: `It's easy to teach your skills to our nation's future leaders. Our platform connects local industry and organisations with young people and supports your organisation to deliver a world class education experience.`,
                        paragraphClassName: 'parts__article-paragraph paragraph'
                    },
                    cta: {
                        text: 'Become a community educator.',
                        link: '/educators',
                        className: 'navigation-link color-pink paragraph--uppercase'
                    }
                }
            },
            {
                sectionClassName: '',
                rowClassName: 'parts__container row--parts container',
                colClassName: 'col-1-of-2--parts',
                img: {
                    src: learnImg,
                    alt: 'For those who want to learn',
                    className: 'image'
                },
                text: {
                    componentClassName: 'parts__article',
                    titles: {
                        header: 'learn',
                        headerCommonClassName: 'parts__article-title--common heading-quaternary',
                        headerClassName: 'parts__article-title color-violet heading-secondary',
                    },
                    paragraph: {
                        paragraph: `It's easy to learn from industry experts. With I'm In, access education experiences to help you discover your future pathway. Combining the best of gamification with real world experiences you can engage in and track your learning jurney, like never before.`,
                        paragraphClassName: 'parts__article-paragraph paragraph',
                    },
                    cta: {
                        text: `Learn through I'm In.`,
                        link: '/students',
                        className: 'navigation-link color-violet paragraph--uppercase'
                    }
                }
            },
            {
                sectionClassName: 'bg-grey',
                rowClassName: 'parts__container row--parts container',
                colClassName: 'col-1-of-2--parts',
                img: {
                    src: supportImg,
                    alt: 'For those who want to support',
                    className: 'image'
                },
                text: {
                    componentClassName: 'parts__article',
                    titles: {
                        header: 'support',
                        headerCommonClassName: 'parts__article-title--common heading-quaternary',
                        headerClassName: 'parts__article-title color-pink heading-secondary',
                    },
                    paragraph: {
                        paragraph: `Our mission is to help young people get off to a flying start by making industry led education free and accessible. We help young people into education and employment. Partner with us, and together we will see young kiwis take flight.`,
                        paragraphClassName: 'parts__article-paragraph paragraph',
                    },
                    cta: {
                        text: 'Become a partner.',
                        link: '/partners',
                        className: 'navigation-link color-pink paragraph--uppercase'
                    }
                }
            }
        ]
    }
};

const renderDoublePaneSection = (data) => {

    return (
        <section className={data.sectionClassName}>
            <DoublePanesRow
                rowClassName={data.rowClassName}
                leftColClassName={data.colClassName}
                rightColClassName={data.colClassName}
                left={<Image {...data.img} />}
                right={<PartArticle {...data.text} />}
            />
        </section >
    )
};

const loopParts = () => {
    const array = content.content.partsSections;

    return array.map((item, i) => {
        return (
            <React.Fragment key={i}>
                {renderDoublePaneSection(item)}
            </React.Fragment>
        )
    })
};

const HomePage = () => {

    return (
        <React.Fragment>
            <HeaderHomePage />
            {/* <PartsHomePage /> */}
            {loopParts()}
            <ContactForm />
        </React.Fragment>
    )
};

export default HomePage;