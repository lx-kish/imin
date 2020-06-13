import React from 'react';

import './home.styles.scss';

import HeaderHomePage from '../../components/headers/header-home-page/header-home-page.component';
import PartsHomePage from '../../components/parts-home-page/parts-home-page.component';
import ContactForm from '../../components/forms/contact-form/contact-form.component';

// import IconUmbrella from '../../components/icons/icon-umbrella.component';
// import IconFacebook from '../../components/icons/icon-facebook.component';
// import IconLinkedIn from '../../components/icons/icon-linkedin.component';

const HomePage = () => {

    return (
        <React.Fragment>

            <HeaderHomePage />
            <PartsHomePage />

            {/* <div style={{width: '100%', backgroundColor: '#000'}}>
            <IconUmbrella className='footer__icon' />
            <IconFacebook className='footer__icon' />
            <IconLinkedIn className='footer__icon' />
        </div> */}
            <ContactForm />
        </React.Fragment>
    )
};

export default HomePage;