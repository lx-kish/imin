import axios from 'axios';

import {
    USER_SIGN_UP,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_IN,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAILURE,
    USER_CREATED_STATUS_CHANGE,
} from '../types';

export const userSignUp = user => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': "*"
        }
    };
    return (dispatch) => {

        dispatch({ type: USER_SIGN_UP });
        return axios.post(`http://localhost:3100/api/auth/signup`, user, config)
            // request
            .then((res) => {
                // console.log('res ----> ',res);
                return dispatch({ type: USER_SIGN_UP_SUCCESS, payload: res });
                // dispatch(userSignIn(res.data.user));
            })
            .catch((error) => {
                // console.log('error ----> ', error);
                return dispatch({ type: USER_SIGN_UP_FAILURE, payload: error });
            })
    }
}

export const userSignIn = user => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': "*"
        }
    };

    return (dispatch) => {

        dispatch({ type: USER_SIGN_IN });
        return axios.post(`http://localhost:3100/api/auth/signin`, user, config)
            // request
            .then((res) => {
                // console.log('res ----> ',res);
                dispatch({ type: USER_SIGN_IN_SUCCESS, payload: res });
            })
            .catch((error) => {
                // console.log('error ----> ', error);
                dispatch({ type: USER_SIGN_IN_FAILURE, payload: error });
            })
    }
}

export const userCreatedStatusChange = user => {

    return (dispatch) => {

        dispatch({ type: USER_CREATED_STATUS_CHANGE, payload: { created: false } });

    }
}