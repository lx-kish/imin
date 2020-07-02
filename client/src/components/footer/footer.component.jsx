import React from 'react';
import { Link } from 'react-router-dom';

import './footer.styles.scss';

import IconFacebook from '../../components/icons/icon-facebook.component';
import IconLinkedIn from '../../components/icons/icon-linkedin.component';

// const content = {
//     doubleLinkPane: {
//         className: 'footer__media',
//         links: [
//             {
//                 to: '/',
//                 className: 'footer__link',
//                 icon: IconFacebook,
//                 iconClassName: 'footer__icon color-white'
//             },
//             {
//                 to: '/',
//                 className: 'footer__link',
//                 icon: IconLinkedIn,
//                 iconClassName: 'footer__icon color-white'
//             }
//         ]
//     }
// };

const Footer = () => (
    <footer className='footer'>
        <div className='footer__content'>
            <p className='footer__copyright'>
                I'm In is a New Zealand registered Charitable Trust (CC123456). All Rights Reserved. Copyright &copy;
                2020.
            </p>
            <div className='footer__media'>
                <Link
                    to={'/'}
                    className='footer__link'
                >
                    <IconFacebook className='footer__icon color-white' />
                </Link>
                <Link
                    to={'/'}
                    className='footer__link'
                >
                    <IconLinkedIn className='footer__icon color-white' />
                </Link>
            </div>
        </div>
    </footer>
);

export default Footer;