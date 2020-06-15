import React from 'react';

import './contact.styles.scss';

import DoublePanesRow from '../../hoc/rows/double-panes-row/double-panes-row.hoc';
import ContactDetails from '../../components/panes/contact-details/contact-details.component';
import ContactMap from '../../components/panes/contact-map/contact-map.component';
import EnquiryForm from '../../components/forms/enquiry-form/enquiry-form.component';
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
        sectionClassName: '',
        rowClassName: '',
        colClassName: '',
        members: [
            {
                image: {
                    img: '',
                    alt: ''
                },
                title: {
                    name: '',
                    className: ''
                },
                role: {
                    name: '',
                    className: ''
                },
                description: {
                    text: '',
                    className: ''
                },
                links: {
                    className: '',
                    
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

    return (
        <React.Fragment>
            {renderContactDetailsSection(content.contactDetails)}
            <EnquiryForm />
            {'Contact me'}
            <ContactForm />
        </React.Fragment>
    )
};

export default ContactPage;