import React from 'react';

import './partners.styles.scss';

import HeaderSecondary from '../../components/headers/header-secondary/header-secondary.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    header: {
        headerClassName: 'header',
        containerClassName: 'header__container header__container--partners-page',
        title: 'Openning up a world of possibilities.',
        titleClassName: 'header__title heading-primary color-pink',
        button: {
            boxClassName: 'header__btn-box',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn--primary'
            }
        }
    }
};

const PartnersPage = () => (
    <React.Fragment>
        <HeaderSecondary {...content.header} />
        {'Partners content here'}
        <ContactForm />
    </React.Fragment>
);

export default PartnersPage;