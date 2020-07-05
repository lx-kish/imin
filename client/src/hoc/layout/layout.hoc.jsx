import React from 'react';
import NavigationBar from '../../components/navigation/navigation-bar/navigation-bar.component';
import Footer from '../../components/footer/footer.component';

const Layout = props => {

    /**
     * Single state hook useState for all the state properties
     */
    const [fullState, setFullState] = React.useState({
        showSignUp: false,
        showSignIn: false,
        isAuth: false
    });

    /**
    * React hook useEffect for updating showSignUp state property
    * on display property changing
    */
    React.useEffect(() => {

        setFullState({
            ...fullState,
            showSignUp: !fullState.showSignUp
        })

    }, [fullState.showSignUp]);

    return (
        <>
            <NavigationBar
                isAuth={fullState.isAuth}
                showModal={() =>
                    setFullState({
                        ...fullState,
                        showSignUp: !fullState.showSignUp
                    })
                }
            />
            <>
                {props.children}
            </>
            <Footer />
        </>
    );
};

export default Layout;