import React from 'react';

import ButtonTertiary from '../btns/btn-tertiary/btn-tertiary.component';
import logo from '../../img/logo_pink.png';

import './navigation-bar.styles.scss';

const NavigationBar = () => (
    <nav className='navigation navigation--primary'>
        <div className='navigation__content'>

            <div className='navigation__logo-box'>
                <img src={logo} alt='Logo' className='navigation__logo' />
            </div>


            <ul className='navigation__list'>
                <li className='navigation__item'>
                    <a
                        href={'/'}
                        className='navigation__link paragraph--uppercase'
                    >
                        Home
                    </a>
                </li>
                <li className='navigation__item'>
                    <a
                        href={'/'}
                        className='navigation__link paragraph--uppercase'
                    >
                        About
                    </a>
                </li>
                <li className='navigation__item'>
                    <a
                        href={'/'}
                        className='navigation__link paragraph--uppercase'
                    >
                        Support
                    </a>
                </li>
                <li className='navigation__item'>
                    <a
                        href={'/'}
                        className='navigation__link paragraph--uppercase'
                    >
                        Contact
                    </a>
                </li>
                <li className='navigation__item'>
                    <ButtonTertiary
                        name={'sign in'}
                        className={'navigation__btn paragraph--uppercase'}
                    />
                </li>
            </ul>
        </div>
    </nav>
)

export default NavigationBar;