import React from 'react';
import { connect } from 'react-redux';

import SignUp from '../../pages/sign-up/sign-up.component';
import SignIn from '../../pages/sign-in/sign-in.component';
import NavigationBar from '../../components/navigation/navigation-bar/navigation-bar.component';
import Footer from '../../components/footer/footer.component';

import { showHideSignIn, showHideSignUp } from '../../redux/modal/modal.actions';

const Layout = props => {

    // /**
    //  * Single state hook useState for all the state properties
    //  */
    // const [fullState, setFullState] = React.useState({
    //     showSignUp: false,
    //     showSignIn: false,
    //     isAuth: false
    // });

    return (
        <>
            {props.showSignUp ? <SignUp /> : null}
            {props.showSignIn ? <SignIn /> : null}
            <NavigationBar
                // isAuth={fullState.isAuth}
                // showSignIn={() =>
                //     setFullState({
                //         ...fullState,
                //         showSignIn: !fullState.showSignIn
                //     })
                // }
            />
            <>
                {/* {React.cloneElement(props.children, {
                    showSignUp: setFullState({
                        ...fullState,
                        showSignUp: !fullState.showSignUp
                    })
                })} */}
                {props.children}
            </>
            <Footer />
        </>
    );
};

const mapStateToProps = state => ({
    showSignUp: state.modal.showSignUp,
    showSignIn: state.modal.showSignIn
})

export default connect(mapStateToProps)(Layout);