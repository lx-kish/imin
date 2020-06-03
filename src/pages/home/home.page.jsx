import React from 'react';

import './home.styles.scss';

import HeaderHomePage from '../../components/headers/header-home-page/header-home-page.component';
import PartsHomePage from '../../components/parts-home-page/parts-home-page.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

const HomePage = () => (
    <React.Fragment>

        {/* <div style={{ height: '100px' }}>content</div> */}
        <HeaderHomePage />
        <PartsHomePage />
        <ContactForm />
    </React.Fragment>
);

export default HomePage;