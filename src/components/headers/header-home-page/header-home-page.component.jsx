import React from 'react';

import './header-home-page.styles.scss';

import ButtonPrimary from '../../btns/btn-primary/btn-primary.component';

const content = {

    header: 'Industry and Community-led Education',
    paragraph: `At I'm In, our vision is to make community led education and development opportunities <b>free and accessible</b> for every young person in every corner of New Zealand. Our platform connects organisations, businesses and individuals who want to teach, with young people who want to learn.`,
    button: 'Register Now',

};

const HeaderHomePage = () => (
    <header className='header'>
        <div className="header__container">
            <h1 className='header__title heading-primary color-pink'>
                {content.header}
            </h1>
            <div className="header__content-box">
                <p className='header__paragraph'>
                    {content.paragraph}
                </p>
                <div className='header__btn-box'>
                    <ButtonPrimary name={'Register Now'}>
                        {content.button}
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    </header>
);

export default HeaderHomePage;