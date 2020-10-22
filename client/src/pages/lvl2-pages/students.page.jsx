import React from 'react';

import './lvl2-pages.styles.scss';


import ImageSignUp from '../../graphics/pages-content/students-page/1-sign-up.png';
import ImageAttendExperiences from '../../graphics/pages-content/students-page/2-attend-experiences.png';
import ImageGainSkills from '../../graphics/pages-content/students-page/3-gain-skills.png';
import ImageRateExperiences from '../../graphics/pages-content/students-page/4-rate-experiences.png';
import ImageMakeDecisionAboutYourFuture from '../../graphics/pages-content/students-page/5-make-decisions-about-your-future.png';

import HeaderSecondary from '../../components/headers/header-secondary/header-secondary.component';
import SinglePaneRow from '../../hoc/rows/single-pane-row/single-pane-row.component';
import ParagraphTitled from '../../components/panes/paragraphs/paragraph-titled/paragraph-titled.component';
import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import StepArticle from '../../components/panes/step-article/step-article.component';

import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    header: {
        headerClassName: 'header',
        containerClassName: 'header__container header__container--students-page',
        title: `Learn through I'm In.`,
        titleClassName: 'header__title heading-primary color-violet',
        renderButton: true,
        button: {
            boxClassName: 'header__btn-box',
            linkTo: '/signup',
            role: 'student',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn btn--dt btn--tertiary'
            }
        }
    },
    content: {
        singlePaneRow: {
            sectionClassName: 'lvl2__section--single-pane',
            rowClassName: 'row-lvl2 lvl2__container lvl2__container--single-pane',
            pane: {
                titleClassName: 'lvl2__heading heading-secondary',
                title: 'Why learn through I’m In?',
                paragraphClassName: 'lvl2__paragraph paragraph',
                paragraph: 'Deciding on a career pathway or your further study options can be tough. With I’m In, we make these decisions easier by connecting you with local industry and community professionals education experiences. Learn new skills, be inspired and discover a world of possibilities. It’s free.'
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
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Sign up.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-violet'
                        },
                        text: {
                            paragraph: 'Build a gamified profile. It’s free and always will be.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: ImageAttendExperiences,
                        alt: 'Attend Experiences',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Attend Experiences.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-violet'
                        },
                        text: {
                            paragraph: 'Show up, learn and be inspired from industry experts. Gain insights about future employment and study opportunities.',
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
                        src: ImageGainSkills,
                        alt: 'Gain skills',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Gain skills.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-violet'
                        },
                        text: {
                            paragraph: 'The more experiences you attend, the more skills and knowledge you get! All experiences are uploaded to your I’m In profile.',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: ImageRateExperiences,
                        alt: 'Rate Experiences',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Rate Experiences.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-violet'
                        },
                        text: {
                            paragraph: 'Your feedback helps industry to create great experiences. Be rewarded for rating experiences.',
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
                        src: ImageMakeDecisionAboutYourFuture,
                        alt: 'Make decisions about your future',
                        className: 'lvl2__image-pane'
                    },
                    flexCont: {
                        className: 'flex-box flex-box-row',
                        title: {
                            header: 'Make decisions about your future.',
                            headerClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-left heading-primary color-violet'
                        },
                        text: {
                            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi',
                            paragraphClassName: 'flex-item__of-2--50_50 flex-item__of-2--50_50-right'
                        }
                    }
                },
                right: {
                    img: {
                        src: '',
                        alt: '',
                        className: ''
                    },
                    flexCont: {
                        className: '',
                        title: {
                            header: '',
                            headerClassName: ''
                        },
                        text: {
                            paragraph: '',
                            paragraphClassName: ''
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

const StudentsPage = () => {

    return (
        <React.Fragment>
            <HeaderSecondary {...content.header} />
            {renderSinglePaneSection(content.content.singlePaneRow)}
            <div className='lvl2__steps-content'>
                {loopSteps()}
            </div>
            <ContactForm />
        </React.Fragment>
    )
};

export default StudentsPage;