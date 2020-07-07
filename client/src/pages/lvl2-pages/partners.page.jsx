import React from 'react';

import './lvl2-pages.styles.scss';

import ImageBecomeAPartner from '../../graphics/pages-content/partners-page/1-become-a-partner.png';
import ImageDonate from '../../graphics/pages-content/partners-page/2-donate.png';

import IconPhone from '../../components/icons/icon-phone.component';
import IconEnvelop from '../../components/icons/icon-envelope.component';

import HeaderSecondary from '../../components/headers/header-secondary/header-secondary.component';
import SinglePaneRow from '../../hoc/rows/single-pane-row/single-pane-row.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import StepArticle from '../../components/panes/step-article/step-article.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    header: {
        headerClassName: 'header',
        containerClassName: 'header__container header__container--partners-page',
        title: 'Openning up a world of possibilities.',
        titleClassName: 'header__title heading-primary color-white',
        renderButton: false,
        button: {
            boxClassName: 'header__btn-box',
            linkTo: '/signup',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn--primary'
            }
        }
    },
    content: {
        singlePaneRow: {
            sectionClassName: 'lvl2__section--single-pane',
            rowClassName: 'row-lvl2 lvl2__container lvl2__container--single-pane',
            pane: {
                titleClassName: 'lvl2__heading heading-secondary',
                title: 'Opening up a world of possibilities.',
                paragraphClassName: 'lvl2__paragraph paragraph',
                paragraph: 'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum.'
            }
        },
        doublePanesSections: [
            {
                textSectionType: 'equal',
                sectionClassName: 'lvl2__section--double-pane',
                rowClassName: 'flex-box flex-box-row flex-box--steps lvl2__container lvl2__container--double-pane',
                leftColClassName: 'flex-item__of-2--steps',
                rightColClassName: 'flex-item__of-2--steps',
                left: {
                    img: {
                        src: ImageBecomeAPartner,
                        alt: 'Become a Partner',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Become a Partner.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam Tempor',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: ImageDonate,
                        alt: 'Donate',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Donate.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'Tempor nec feugiat nisl pretium fusce id velit ut tortor pretium viverra suspendisse potenti nullam Tempor',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                }
            }
        ]
    }
};

const renderContactSection = () => {
    return (
        <section className='lvl2__section--partners-contact'>
            <div className='partners-contact flex-box flex-box-col flex-box--partners-contact'>
                <p className=''>
                    <b>Speak to our team about partnering today.</b>
                </p>
                <div className='partners-contact__icon-box flex-box flex-box-row color-pink'>
                    <IconEnvelop className='partners-contact__icon' />
                    <span>
                        thomas@imin.org.nz
                    </span>
                </div>
                <div className='partners-contact__icon-box flex-box flex-box-row color-pink'>
                    <IconPhone className='partners-contact__icon' />
                    <span>
                        +6421 193 7699
                    </span>
                </div>
            </div>
        </section>
    )
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
        <section className={data.sectionClassName}>
            <DoublePanesRow
                rowClassName={data.rowClassName}
                leftColClassName={data.leftColClassName}
                rightColClassName={data.rightColClassName}
                left={<StepArticle {...data.left} />}
                right={<StepArticle {...data.right} />}
            />
        </section >
    )
};

const loopSteps = () => {
    const array = content.content.doublePanesSections;

    return array.map((item, i) => {
        return (
            <React.Fragment key={i}>
                {renderDoublePaneSection(item)}
            </React.Fragment>
        )
    })
};

const PartnersPage = () => {

    return (
        <React.Fragment>
            <HeaderSecondary {...content.header} />
            {renderSinglePaneSection(content.content.singlePaneRow)}
            <div className='lvl2__steps-content'>
                {loopSteps()}
            </div>
            {renderContactSection()}
            <ContactForm />
        </React.Fragment>
    )
};

export default PartnersPage;