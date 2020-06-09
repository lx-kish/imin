import React from 'react';

import NavigationLink from '../navigation-link/navigation-link.component';
import ButtonTertiary from '../../btns/btn-tertiary/btn-tertiary.component';
import logo from '../../../graphics/logo_pink.png';

import './navigation-bar.styles.scss';

const links = [
    {
        name: 'Home',
        link: '/',
        className: 'navigation-link color-pink paragraph--uppercase'
    },
    {
        name: 'About',
        link: '/about',
        className: 'navigation-link color-pink paragraph--uppercase'
    },
    {
        name: 'Support',
        link: '/support',
        className: 'navigation-link color-pink paragraph--uppercase'
    },
    {
        name: 'Contact',
        link: '/contact',
        className: 'navigation-link color-pink paragraph--uppercase'
    }
];

const element = (link, i) => (

    <li
        key={i}
        className='navigation__item'
    >
        <NavigationLink
            link={link.link}
            className={link.className}
            name={link.name}
        />
    </li>
);

const showLinks = () => (

    links.map((link, i) => {

        return element(link, i);
    })
);

const NavigationBar = () => (
    <nav className='navigation navigation--primary'>
        <div className='navigation__content'>

            <div className='navigation__logo-box'>
                <img src={logo} alt='Logo' className='navigation__logo' />
            </div>


            <ul className='navigation__list'>
                {showLinks()}

                <li className='navigation__item'>
                    <ButtonTertiary
                        title={'sign in'}
                        className={'navigation__btn paragraph--uppercase'}
                    />
                </li>
            </ul>
        </div>
    </nav>
)

export default NavigationBar;