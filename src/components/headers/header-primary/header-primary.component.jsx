import React from 'react';

import './header-primary.styles.scss';

import ButtonPrimary from '../../btns/btn-primary/btn-primary.component';

const HeaderPrimary = () => (
    <header class='header container'>
        <h1 class='heading-primary'>
            Industry and Community-led Education
        </h1>
        <p class='header__paragraph paragraph'>
            At I'm In, our vision is to make community led education and development opportunities free and accessible
            for every young person in every corner of New Zealand. Our platform connects organisations, businesses and
            individuals who want to teach, with young people who want to learn.
        </p>
        <div class='header__btn-box'>
            <ButtonPrimary name={'Register Now'}>
                Are you in?
            </ButtonPrimary>
        </div>
    </header>
);

export default HeaderPrimary;