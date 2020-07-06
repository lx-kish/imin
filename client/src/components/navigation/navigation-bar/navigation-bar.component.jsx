import React from 'react';
import { connect } from 'react-redux';

import { showHideSignIn } from '../../../redux/modal/modal.actions';

import NavigationLink from '../navigation-link/navigation-link.component';
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

const NavigationBar = props => {

    console.log(props)

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
                            <Btn
                                title={'sign in'}
                                onClick={() => props.showHideSignIn(props.showSignIn)}
                                className={'btn--tertiary navigation__btn paragraph--uppercase'}
                            />
                        }
                    </li>
                </ul>
            </div>
        </nav>
    )
}

// const mapStateToProps = state => {
//     return {
//         showSignIn: state.showSignIn
//     };
// };

// const mapDispatchToProps = {
//     showHideSignIn
// };

const mapDispatchToProps = (dispatch) => {
    return {
        showHideSignIn: (showSignIn) => dispatch(showHideSignIn(showSignIn))
    }
};

// const mapDispatchToProps = dispatch => ({
//     showSignUp:  state.modal.showSignUp toggleTodo: todoId => dispatch(toggleTodo(todoId))
// })

export default connect(
    null,
    mapDispatchToProps
)(NavigationBar);