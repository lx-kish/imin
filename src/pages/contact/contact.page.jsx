import React from 'react';

import './contact.styles.scss';

import ImageJenny from '../../graphics/pages-content/contact-page/jenny.png';
import ImageThomas from '../../graphics/pages-content/contact-page/thomas.png';
import ImageIsaac from '../../graphics/pages-content/contact-page/isaac.png';

import IconEnvelop from '../../components/icons/icon-envelope.component';
import IconLinkedIn from '../../components/icons/icon-linkedin.component';

import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import ContactDetails from '../../components/panes/contact-details/contact-details.component';
import ContactMap from '../../components/panes/contact-map/contact-map.component';
import EnquiryForm from '../../components/forms/enquiry-form/enquiry-form.component';
import TriplePanesRow from '../../hoc/rows/triple-panes-row/triple-panes-row.component';
import TeamArticle from '../../components/panes/contact-team-article/contact-team-article.component';
import DoubleLinksIconBox from '../../components/panes/double-links-icon-box/double-links-icon-box.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    contactDetails: {
        sectionClassName: 'bg-pink',
        rowClassName: 'flex-box flex-box-row container contact__row',
        colClassName: 'flex-item__of-2',
        details: {
            componentClassName: 'flex-box flex-box-col',
            title: {
                className: 'contact-details__title heading-primary color-white',
                text: 'We’d love to hear from you.'
            },
            detailsBox: {
                className: 'bg-white contact-details__box',
                title: {
                    className: 'heading-tertiary heading-tertiary--uppercase',
                    text: 'Concact us'
                },
                emailBox: {
                    className: 'contact-details__item',
                    iconClassName: 'contact-details__icon color-pink',
                    paragraph: {
                        className: 'paragraph',
                        text: 'thomas@imin.org.nz'
                    }
                },
                phoneBox: {
                    className: 'contact-details__item',
                    iconClassName: 'contact-details__icon color-pink',
                    paragraph: {
                        className: 'paragraph',
                        text: '+6421 193 7699'
                    }
                },
                locationBox: {
                    className: 'contact-details__item',
                    iconClassName: 'contact-details__icon color-pink',
                    paragraph: {
                        className: 'paragraph',
                        text: '123 Placeholder Street, Te Are, Wellington 6011'
                    }
                }
            }
        },
        map: {
            componentClassName: 'contact__map-box'

        }
    },
    team: {
        sectionClassName: 'team__section',
        rowClassName: 'team__row container',
        colClassName: 'team__col',
        members: [
            {
                image: {
                    src: ImageJenny,
                    alt: 'Jenny Bennet photo',
                    className: ''
                },
                storyClassName: 'team-member__container',
                title: {
                    name: 'Jenny Bennet',
                    className: 'team-member__title heading-quinary'
                },
                role: {
                    name: 'Education Manager',
                    className: 'team-member__role'
                },
                description: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi.',
                    className: 'team-member__description'
                },
                links: {
                    className: 'team-member__media',
                    link1: {
                        to: '/',
                        className: 'team-member__link',
                        icon: {
                            component: 'envelop',
                            className: 'team-member__icon color-pink'
                        }
                    },
                    link2: {
                        to: '/',
                        className: 'team-member__link',
                        icon: {
                            component: 'linkedin',
                            className: 'team-member__icon color-pink'
                        }
                    }
                }
            },
            {
                image: {
                    src: ImageThomas,
                    alt: 'Thomas Maharaj photo'
                },
                storyClassName: 'team-member__container',
                title: {
                    name: 'Thomas Maharaj',
                    className: 'team-member__title heading-quinary'
                },
                role: {
                    name: 'Founder & Managing Director',
                    className: 'team-member__role'
                },
                description: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi.',
                    className: 'team-member__description'
                },
                links: {
                    className: 'team-member__media',
                    link1: {
                        to: '/',
                        className: 'team-member__link',
                        icon: {
                            component: 'envelop',
                            className: 'team-member__icon color-pink'
                        }
                    },
                    link2: {
                        to: '/',
                        className: 'team-member__link',
                        icon: {
                            component: 'linkedin',
                            className: 'team-member__icon color-pink'
                        }
                    }
                }
            },
            {
                image: {
                    src: ImageIsaac,
                    alt: 'Isaac Winsley photo'
                },
                storyClassName: 'team-member__container',
                title: {
                    name: 'Isaac Winsley',
                    className: 'team-member__title heading-quinary'
                },
                role: {
                    name: 'Impact Manager',
                    className: 'team-member__role'
                },
                description: {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in purus sagittis, ultricies ante at, posuere magna. Morbi non nisi.',
                    className: 'team-member__description'
                },
                links: {
                    className: 'team-member__media',
                    link1: {
                        to: '/',
                        className: 'team-member__link',
                        icon: {
                            component: 'envelop',
                            className: 'team-member__icon color-pink'
                        }
                    },
                    link2: {
                        to: '/',
                        className: 'team-member__link',
                        icon: {
                            component: 'linkedin',
                            className: 'team-member__icon color-pink'
                        }
                    }
                }
            }
        ]
    }
};

const ContactPage = () => {

    const renderContactDetailsSection = (data) => {

        return (
            <section className={data.sectionClassName}>
                <DoublePanesRow
                    rowClassName={data.rowClassName}
                    leftColClassName={data.colClassName}
                    rightColClassName={data.colClassName}
                    left={<ContactDetails {...data.details} />}
                    right={<ContactMap {...data.map} />}
                />
            </section >
        )
    };

    const renderTeamSection = (data) => {

        return (
            <section className={data.sectionClassName}>
                <h2 className='team__heading heading-secondary heading-secondary--uppercase'>Our team</h2>
                <TriplePanesRow
                    rowClassName={data.rowClassName}
                    leftColClassName={data.colClassName}
                    middleColClassName={data.colClassName}
                    rightColClassName={data.colClassName}
                    left={
                        <TeamArticle
                            {...data.members[0]}
                            link={
                                <DoubleLinksIconBox
                                    {...data.members[0].links}
                                    icon1={<IconEnvelop
                                        className={data.members[0].links.link1.icon.className}
                                    />
                                    }
                                    icon2={<IconLinkedIn
                                        className={data.members[0].links.link2.icon.className}
                                    />}
                                />
                            }
                        />
                    }
                    middle={
                        <TeamArticle
                            {...data.members[1]}
                            link={
                                <DoubleLinksIconBox
                                    {...data.members[1].links}
                                    icon1={<IconEnvelop
                                        className={data.members[1].links.link1.icon.className}
                                    />
                                    }
                                    icon2={<IconLinkedIn
                                        className={data.members[1].links.link2.icon.className}
                                    />}
                                />
                            }
                        />
                    }
                    right={
                        <TeamArticle
                            {...data.members[2]}
                            link={
                                <DoubleLinksIconBox
                                    {...data.members[2].links}
                                    icon1={<IconEnvelop
                                        className={data.members[2].links.link1.icon.className}
                                    />
                                    }
                                    icon2={<IconLinkedIn
                                        className={data.members[2].links.link2.icon.className}
                                    />}
                                />
                            }
                        />
                    }
                />
            </section>
        )
    };

    return (
        <React.Fragment>
            {renderContactDetailsSection(content.contactDetails)}
            <EnquiryForm />
            {renderTeamSection(content.team)}
            <ContactForm />
        </React.Fragment>
    )
};

export default ContactPage;