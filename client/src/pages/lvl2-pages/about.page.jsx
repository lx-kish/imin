import React from 'react';

import './lvl2-pages.styles.scss';

import FirstImage from '../../graphics/pages-content/about-page/about-dna-1.png';
import SecondImage from '../../graphics/pages-content/about-page/about-strategy-2.png';

import IntroSecondary from '../../components/intros/intro-secondary/intro-secondary.component';
import SinglePaneRow from '../../hoc/rows/single-pane-row/single-pane-row.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import Image from '../../components/panes/image/image.component';
import TextParagraph from '../../components/panes/paragraphs/paragraph-text/paragraph-text.component';
import LinkedBottomParagraph from '../../components/panes/paragraphs/paragraph-linked-bottom/paragraph-linked-bottom.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    intro: {
        introClassName: 'intro',
        containerClassName: 'intro__container intro__container--about-page',
        title: 'A vision from New Zealand.',
        titleClassName: 'intro__title--second-lvl-page heading-primary color-pink',
        renderButton: true,
        button: {
            boxClassName: 'intro__btn-box',
            linkTo: '/signup',
            role: 'student',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn btn--dt btn--primary'
            }
        }
    },
    content: {
        firstSinglePaneRow: {
            sectionClassName: 'lvl2__section',
            rowClassName: 'row-lvl2 lvl2__container lvl2__container--single-pane',
            pane: {
                titleClassName: 'lvl2__heading heading-secondary',
                title: 'Free and accessible education for young New Zealanders.',
                paragraphClassName: 'lvl2__paragraph paragraph',
                paragraph: 'Founded in 2020 by Thomas Maharaj, I’m In is a New Zealand based registered charitable trust with a vision to see communities work collectively together, in order to help every young person have access to free industry and community led education. As they realise their potential, I’m In helps young people discover a pathway into education and employment.'
            }
        },
        firstDoublePanesSection: {
            textSectionType: 'paragraph',
            sectionClassName: 'lvl2--bg-grey',
            title: 'In our DNA.',
            titleClassName: 'lvl2__heading heading-secondary',
            rowClassName: 'flex-box flex-box-row lvl2__container lvl2__container--double-pane',
            leftColClassName: 'flex-item__of-2--about flex-item__of-2--about-left',
            rightColClassName: 'flex-item__of-2--about flex-item__of-2--about-right',
            img: {
                src: FirstImage,
                alt: 'In our DNA.',
                className: 'lvl2__image-pane'
            },
            text: {
                paragraph: 'In 2015, Thomas Maharaj underwent brain surgery, and from his hospital bed he started The Knowledge Bank, a small project that helped deliver books to children whose parents could not afford them. Since then, he went on to work at multiple charitable trusts around New Zealand helping to fund and build programmes of national significance and help young people find jobs. Having always worked at the crossroads of sales, education and recruitment. In 2019 Jenny and Isaac joined the team, bringing both talent, drive and passion. 2020 creates a world of opportunities. As we dive deep into the future of…',
                paragraphClassName: ''
            }
        },
        secondSinglePaneRow: {
            sectionClassName: 'lvl2__section',
            rowClassName: 'row-lvl2 lvl2__container lvl2__container--single-pane',
            pane: {
                titleClassName: 'lvl2__heading heading-secondary',
                title: 'What we do and how we do it.',
                paragraphClassName: 'lvl2__paragraph paragraph',
                paragraph: 'I’m In provides education training and support to industry and community groups, businesses and centres helping them become educators. We’ve been hard at work developing a gamified education platform that enables young people to access industry and community led education and an access point to study and employment opportunities. It’s a showcase for our rangatahi about their options and helps create a clear pathway for their future.'
            }
        },
        secondDoublePanesSection: {
            textSectionType: 'paragraph-bottom-link',
            sectionClassName: 'lvl2--bg-grey',
            title: 'Our strategy for impact.',
            titleClassName: 'lvl2__heading heading-secondary',
            rowClassName: 'flex-box flex-box-row lvl2__container lvl2__container--double-pane',
            leftColClassName: 'flex-item__of-2--about flex-item__of-2--about-left',
            rightColClassName: 'flex-item__of-2--about flex-item__of-2--about-right',
            img: {
                src: SecondImage,
                alt: 'What we do and how we do it.',
                className: 'lvl2__image-pane'
            },
            text: {
                componentClassName: '',
                paragraph: 'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac.',
                paragraphClassName: '',
                link: '/contact',
                linkClassName: 'navigation-link color-pink paragraph--uppercase lvl2__paragraph-link',
                linkName: 'Contact us'
            }
        }
    }
};

const renderSinglePaneSection = (data) => {

    return (
        <section className={data.sectionClassName}>
            <SinglePaneRow
                rowClassName={data.rowClassName}
                pane={<ParagraphTitled {...data.pane} />}
            />
        </section>
    )
};

const renderDoublePaneSection = (data) => {

    return (
        <section
            className={data.sectionClassName}
        >
            <h2 className={data.titleClassName}>{data.title}</h2>
            <DoublePanesRow
                rowClassName={data.rowClassName}
                leftColClassName={data.leftColClassName}
                rightColClassName={data.rightColClassName}
                left={
                    <Image
                        src={data.img.src}
                        alt={data.img.alt}
                        className={data.img.className}
                    />
                }
                right={
                    data.textSectionType === 'paragraph'
                        ?
                        <TextParagraph
                            paragraph={data.text.paragraph}
                            paragraphClassName={data.text.paragraphClassName}
                        />
                        :
                        <LinkedBottomParagraph
                            paragraph={data.text.paragraph}
                            paragraphClassName={data.text.paragraphClassName}
                            link={data.text.link}
                            linkClassName={data.text.linkClassName}
                            linkName={data.text.linkName}
                        />
                }
            />
        </section >
    )
}

const AboutPage = () => {

    return (
        <React.Fragment>
            <IntroSecondary {...content.intro} />
            {renderSinglePaneSection(content.content.firstSinglePaneRow)}
            {renderDoublePaneSection(content.content.firstDoublePanesSection)}
            {renderSinglePaneSection(content.content.secondSinglePaneRow)}
            {renderDoublePaneSection(content.content.secondDoublePanesSection)}
            <ContactForm />
        </React.Fragment>
    )
};

export default AboutPage;