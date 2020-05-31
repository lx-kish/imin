import React from 'react';

import './home.styles.scss';

import HeaderPrimary from '../../components/headers/header-primary/header-primary.component';

const content = {

    headerPrimary: 'Industry and Community-led Education',
    paragraph: `At I'm In, our vision is to make community led education and development opportunities <b>free and accessible</b> for every young person in every corner of New Zealand. Our platform connects organisations, businesses and individuals who want to teach, with young people who want to learn.`,
    button: 'Register Now',
    HeaderSecondary: `How can you be part of I'm in?`
};

const HomePage = () => (
    <React.Fragment>

        <div style={{ height: '100px' }}>content</div>
        <HeaderPrimary />
    </React.Fragment>
);

export default HomePage;