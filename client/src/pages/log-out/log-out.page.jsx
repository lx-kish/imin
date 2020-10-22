import React from 'react';
import axios from 'axios';

import './log-out.styles.scss';

import config from '../../axios.config';
import Btn from '../../components/btn/btn.component';

const content = {
    logof: {
        config: {
            type: 'button',
            title: 'Log out',
            className: 'btn btn--secondary'
        }
    },
    cancel: {
        config: {
            type: 'button',
            title: 'Cancel',
            className: 'btn btn--primary'
        }
    }
};

const LogOut = props => {

    /**
     * Single state hook useState for all the state properties
     */
    const [fullState, setFullState] = React.useState({

        logoutError: false,
        errorMessage: ''
    });

    const logout = () => {
        // console.log('log-out');

        axios.post(`/api/user/logout`, '', config)

            .then((res) => {

                // console.log('sign in doc, res =====> ', res);

                props.history.push('/signin');

            })
            .catch((error) => {

                // console.log('sign in doc, error =====> ', error.response);

                // resetForm();
                setFullState({
                    ...fullState,
                    logoutError: true,
                    errorMessage: error.message
                });

            })
    }

    const cancel = () => {
        // console.log('cancel');
        // props.history.push('/signin');
        console.log(props.history)
    }

    return (
        <div className='log-out'>
            <h2 className='log-out__header'>Do you want to log out?</h2>
            <p className='log-out__error-message'>
                {fullState.logoutError ? fullState.errorMessage : ''}
            </p>
            <div className='log-out__button-box'>
                <Btn
                    {...content.logof.config}
                    onClick={() => { logout() }}
                />
                <Btn
                    {...content.cancel.config}
                    onClick={() => { cancel() }}
                />
            </div>
        </div>
    )
}

export default LogOut;