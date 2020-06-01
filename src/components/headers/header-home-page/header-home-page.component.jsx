import React from 'react';

import './header-home-page.styles.scss';

import ButtonPrimary from '../../btns/btn-primary/btn-primary.component';

const content = {

    header: 'Industry and Community-led Education',
    paragraph: `At I'm In, our vision is to make community led education and development opportunities <b>free and accessible</b> for every young person in every corner of New Zealand. Our platform connects organisations, businesses and individuals who want to teach, with young people who want to learn.`,
    button: 'Register Now',

};

const HeaderHomePage = () => (
    <header className='header container'>
        <h1 className='heading-primary'>
            {content.header}
        </h1>
        <p className='header__paragraph paragraph'>
            {content.paragraph}
        </p>
        <div className='header__btn-box'>
            <ButtonPrimary name={'Register Now'}>
                {content.button}
            </ButtonPrimary>
        </div>
    </header>
);

export default HeaderHomePage;