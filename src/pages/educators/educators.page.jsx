import React from 'react';

import './educators.styles.scss';

import HeaderSecondary from '../../components/headers/header-secondary/header-secondary.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    header: {
        headerClassName: 'header',
        containerClassName: 'header__container header__container--educators-page',
        title: 'Become a Community Educator.',
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

const EducatorsPage = () => (
    <React.Fragment>
        <HeaderSecondary {...content.header} />
        {'Content here'}
        <ContactForm />
    </React.Fragment>
);

export default EducatorsPage;