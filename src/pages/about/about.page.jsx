import React from 'react';

import './about.styles.scss';

import HeaderSecondary from '../../components/headers/header-secondary/header-secondary.component';
import SinglePaneRow from '../../components/panes/single-pane-row/single-pane-row.component';
// import DoublePanesRow from '../../components/
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    header: {
        headerClassName: 'header',
        containerClassName: 'header__container header__container--about-page',
        title: 'A vision from New Zealand.',
        titleClassName: 'header__title heading-primary color-pink',
        button: {
            boxClassName: 'header__btn-box',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn--primary'
            }
        }
    },
    content: {
        firstSinglePaneRow: {
            sectionClassName: '',
            rowClassName: '',
            titleClassName: '',
            title: '',
            paragraphClassName: '',
            paragraph: ''
        },
        firstDoublePanesSection: {
            sectionClassName: '',
            rowClassName: '',
            leftColClassName: '',
            rightColClassName: '',
            img: {
                src: '',
                alt: '',
                className: ''
            },
            text: {
                paragraph: '',
                paragraphClassName: ''
            }
        }
    }
};

const AboutPage = () => (
    <React.Fragment>
        <HeaderSecondary {...content.header} />
        <SinglePaneRow {...content.content} />
        {/* < section
            className={content.content.firstDoublePanesSection.sectionClassName}
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
        </section > */}
        {'Content here'}
        <ContactForm />
    </React.Fragment>
);

export default AboutPage;