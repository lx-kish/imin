import React from 'react';

import './lvl2-pages.styles.scss';

import ImageSignUp from '../../graphics/pages-content/educators-page/1-sign-up.png';
import ImageApplyToHost from '../../graphics/pages-content/educators-page/2-apply-to-host.png';
import ImageEducate from '../../graphics/pages-content/educators-page/3-educate.png';
import ImageSeeTheImpact from '../../graphics/pages-content/educators-page/4-see-the-impact.png';
import ImageBeAnImpact from '../../graphics/pages-content/educators-page/5-be-an-impact-partner.png';
import ImageTheNextWave from '../../graphics/pages-content/educators-page/6-the-next-wave.png';

import IntroSecondary from '../../components/intros/intro-secondary/intro-secondary.component';
import SinglePaneRow from '../../hoc/rows/single-pane-row/single-pane-row.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import StepArticle from '../../components/panes/step-article/step-article.component';

import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    intro: {
        introClassName: 'intro',
        containerClassName: 'intro__container intro__container--educators-page',
        title: 'Become a Community Educator.',
        titleClassName: 'intro__title heading-primary color-pink',
        renderButton: true,
        button: {
            boxClassName: 'intro__btn-box',
            linkTo: '/signup',
            role: 'educator',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn btn--dt btn--primary'
            }
        }
    },
    content: {
        singlePaneRow: {
            sectionClassName: 'lvl2__section--single-pane',
            rowClassName: 'row-lvl2 lvl2__container lvl2__container--single-pane',
            pane: {
                titleClassName: 'lvl2__heading heading-secondary',
                title: 'Why educate?',
                paragraphClassName: 'lvl2__paragraph paragraph',
                paragraph: 'Become an educator today and co-create the future, helping young New Zealanders open their eyes to a world of possibilities as they gain exposure and insights into your industry and their community.'
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
                        src: ImageSignUp,
                        alt: 'Sign Up',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box',
                        title: {
                            header: 'Sign up.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'It’s free and always will be.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: ImageApplyToHost,
                        alt: 'Apply to host',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Apply to host.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'An I’m In education advisor works with your team every step of the way, helping your team to plan a great experience.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                }
            },
            {
                textSectionType: 'equal',
                sectionClassName: 'lvl2__section--double-pane',
                rowClassName: 'flex-box flex-box-row flex-box--steps lvl2__container lvl2__container--double-pane',
                leftColClassName: 'flex-item__of-2--steps',
                rightColClassName: 'flex-item__of-2--steps',
                left: {
                    img: {
                        src: ImageEducate,
                        alt: 'Educate',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Educate.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'Run a local experience, pass on knowledge and skills, and make a difference for the future leaders in your community.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: ImageSeeTheImpact,
                        alt: 'See the impact',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'See the impact.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'Good things are worth celebrating. Our world-class impact measurement tools help us to celebrate your social impact.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                }
            },
            {
                textSectionType: 'equal',
                sectionClassName: 'lvl2__section--double-pane',
                rowClassName: 'flex-box flex-box-row flex-box--steps lvl2__container lvl2__container--double-pane',
                leftColClassName: 'flex-item__of-2--steps',
                rightColClassName: 'flex-item__of-2--steps',
                left: {
                    img: {
                        src: ImageBeAnImpact,
                        alt: 'Be an Impact Partner',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Be an Impact Partner.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'Make corporate social responsibility meaningful. Automatically, your business becomes a registered I’m In impact partner. You receive impact reports and accreditation for the difference you are making.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: ImageTheNextWave,
                        alt: 'The Next Wave',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'The Next Wave.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-pink'
                        },
                        text: {
                            paragraph: 'Meet the future leaders of New Zealand. Inspire their aspirations, build great relationships and in turn, meet potential employees, future students and do your part to strengthen New Zealand.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                }
            }
        ]
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

const EducatorsPage = () => {

    return (
        <React.Fragment>
            <IntroSecondary {...content.intro} />
            {renderSinglePaneSection(content.content.singlePaneRow)}
            <div className='lvl2__steps-content'>
                {loopSteps()}
            </div>
            <ContactForm />
        </React.Fragment>
    )
};

export default EducatorsPage;