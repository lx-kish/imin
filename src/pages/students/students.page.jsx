import React from 'react';

import './students.styles.scss';

import HeaderSecondary from '../../components/headers/header-secondary/header-secondary.component';
import PartsHomePage from '../../components/parts-home-page/parts-home-page.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const content = {
    header: {
        headerClassName: 'header',
        containerClassName: 'header__container header__container--students-page',
        title: `Learn through I'm In.`,
        titleClassName: 'header__title heading-primary color-violet',
        button: {
            boxClassName: 'header__btn-box',
            config: {
                type: 'button',
                title: 'Register Now',
                className: 'btn--tertiary'
            }
        }
    }
};

const AboutPage = () => (
    <React.Fragment>
        <HeaderSecondary {...content.header} />
        {'Content here'}
        <ContactForm />
    </React.Fragment>
);

export default AboutPage;