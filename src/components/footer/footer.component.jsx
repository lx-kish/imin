import React from 'react';

import './footer.styles.scss';

const Footer = () => (
    <footer className='footer'>
        <div className='footer__content'>
            <p className='footer__copyright'>
                I'm In is a New Zealand registered Charitable Trust (CC123456). All Rights Reserved. Copyright &copy;
                2020.
            </p>
            <div className='footer__media'>
                <a href={'/'} className='footer__link'>
                    <svg className='footer__icon'>
                        <use xlinkHref='./img/sprite.svg#icon-facebook2' />
                    </svg>
                </a>
                <a href={'/'} className='footer__link'>
                    <svg className='footer__icon'>
                        <use xlinkHref='./img/sprite.svg#icon-linkedin' />
                    </svg>
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;