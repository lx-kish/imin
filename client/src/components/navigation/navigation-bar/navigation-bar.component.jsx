import React from 'react';
import { Link } from 'react-router-dom';

import Btn from '../../btns/btn/btn.component';
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
        name: 'Platform',
        link: '/platform',
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
        <Link
            to={link.link}
            className={link.className}
        >
            {link.name}
        </Link>
    </li>
);

const showLinks = () => (

    links.map((link, i) => {

        return element(link, i);
    })
);

const NavigationBar = props => {

    return (
        <nav className='navigation navigation--primary'>
            <div className='navigation__content'>

                <div className='navigation__logo-box'>
                    <img src={logo} alt='Logo' className='navigation__logo' />
                </div>


                <ul className='navigation__list'>
                    {showLinks()}

                    <li className='navigation__item'>
                        {props.isAuth ?
                            'Auth'
                            :
                            <Link to={'/signin'}>
                                <Btn
                                    title={'sign in'}
                                    className={'btn--tertiary navigation__btn paragraph--uppercase'}
                                />
                            </Link>
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavigationBar;