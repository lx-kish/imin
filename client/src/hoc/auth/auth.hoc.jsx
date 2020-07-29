import React from 'react';
import axios from 'axios';
import { Redirect, Route } from 'react-router-dom';

import SignUp from '../../pages/sign-up/sign-up.page';
// import SignIn from '../../pages/sign-in/sign-in.component';
import Profile from '../../pages/profile/profile.page';

import config from '../../axios.config';

export default (WrappedComponent, authRequired) => {
    const AuthenticationCheck = props => {

        /**
         * Single state hook useState for all the state properties
         */
        const [fullState, setFullState] = React.useState({

            auth: false
        });

        axios.get(`/api/user/auth`, config)

            .then((res) => {
                setFullState({
                    ...fullState,
                    auth: true
                })
            })
            .catch((error) => {
                console.log('error ----> ', error);
                // setFullState({
                //     ...fullState,
                //     auth: true
                // })
            })
        // .finally(() => {
        //     getRender();
        // })

        // const getRender = () => {
        if (fullState.auth === authRequired) {
            console.log('HOC auth if equal ===> ', fullState.auth);
            console.log('auth required ===> ', authRequired)
            return <WrappedComponent {...props} />
        } else {
            console.log('HOC auth if not equal ===> ', fullState.auth);
            console.log('auth required ===> ', authRequired)
            if (authRequired === null) {
                if (fullState.auth) {
                    return <Route path='/profile' exact component={Profile}  />
                } else {
                    return <Route path='/signup' exact component={SignUp}  />
                }
            } else if (authRequired) {
                console.log('*** signup returned ***')
                // props.history.push('/signup');
                return <Redirect to={{ pathname: '/signup' }} push />
            } else {
                console.log('*** profile returned ***')
                // props.history.push('/profile');
                return <Redirect to={{ pathname: '/profile' }} push />
            }
        }

        // }
    }

    return AuthenticationCheck;
}