import React from 'react';
import axios from 'axios';

import './log-out.styles.scss';

import config from '../../axios.config';
import Btn from '../../components/btns/btn/btn.component';

const content = {
    logof: {
        config: {
            type: 'button',
            title: 'Log out',
            className: 'btn--secondary'
        }
    },
    cancel: {
        config: {
            type: 'button',
            title: 'Cancel',
            className: 'btn--primary'
        }
    }
};

const LogOut = props => {

    /**
     * Single state hook useState for all the state properties
     */
    const [fullState, setFullState] = React.useState({

        logoffError: false,
        errorMessage: ''
    });

    const logout = () => {
        // console.log('log-off');

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
                    logoffError: true,
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
        <div className='log-off'>
            <h2 className='log-off__header'>Do you want to log off?</h2>
            <p className='og-off__error-message'>
                {fullState.logoffError ? fullState.errorMessage : ''}
            </p>
            <div className='log-off__button-box'>
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