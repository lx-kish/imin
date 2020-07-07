import React from 'react';
import { connect } from 'react-redux';

import { showHideSignUp } from '../../../redux/modal/modal.actions';

import '../headers.styles.scss';

import Btn from '../../btns/btn/btn.component';

const content = {

    header: {
        headerClassName: 'header header--home-page',
        containerClassName: 'header__container header__container--home-page',
        title: 'Industry and Community-led Education',
        titleClassName: 'header__title--home-page heading-primary color-pink',
        contentClassName: 'header__content-box',
        paragraph: `At I'm In, our vision is to make community led education and development opportunities <b>free and accessible</b> for every young person in every corner of New Zealand. Our platform connects organisations, businesses and individuals who want to teach, with young people who want to learn.`,
        paragraphClassName: 'header__paragraph'
    },
    button: {
        boxClassName: 'header__btn-box',
        config: {
            type: 'button',
            title: 'Register Now',
            className: 'btn--primary'
        }
    }

};

const HeaderHomePage = props => {

    return (
        <header className={content.header.headerClassName}>
            <div className={content.header.containerClassName}>
                <h1 className={content.header.titleClassName}>
                    {content.header.title}
                </h1>
                <div className={content.header.contentClassName}>
                    <p className={content.header.paragraphClassName}>
                        {content.header.paragraph}
                    </p>
                    <div className={content.button.boxClassName}>
                        <Btn
                            {...content.button.config}
                            onClick={() => {
                                console.log('==============>', props)
                                props.showHideSignUp(!props.showSignUp)
                            }}
                        />
                    </div>
                </div>
            </div>
        </header>
    )
};

const mapStateToProps = state => {

    return {
        showSignUp: state.modal.showSignUp,
    };
};

const mapDispatchToProps = {
    showHideSignUp
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         showHideSignUp: (showSignUp) => dispatch(showHideSignUp(showSignUp))
//     }
// };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderHomePage);