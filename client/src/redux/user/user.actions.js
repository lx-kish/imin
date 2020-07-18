import axios from 'axios';

import {
    USER_SIGN_UP,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_IN,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAILURE,
    USER_CHECK_AUTH,
    USER_CHECK_AUTH_SUCCESS,
    USER_CHECK_AUTH_FAILURE,
    USER_CREATED_STATUS_CHANGE,
} from '../types';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
        'Authorization': 'token',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Request-Headers': 'Content-Type, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Credentials, Authorization'
    },
    withCredentials: true
};

export const userSignUp = user => {

    // return {
    return (dispatch) => {

        // dispatch({ type: USER_SIGN_UP });
        return axios.post(`http://127.0.0.1:3100/api/user/signup`, user, config)
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

    return (dispatch) => {

        dispatch({ type: USER_SIGN_IN });
        return axios.post(`http://127.0.0.1:3100/api/user/signin`, user, config)
            // request
            .then((res) => {
                // console.log('res ----> ',res);
                return dispatch({ type: USER_SIGN_IN_SUCCESS, payload: res });
            })
            .catch((error) => {
                // console.log('error ----> ', error);
                return dispatch({ type: USER_SIGN_IN_FAILURE, payload: error });
            })
    }
}

export const auth = () => {

    return (dispatch) => {

        dispatch({ type: USER_CHECK_AUTH });
        return axios.get(`http://127.0.0.1:3100/api/user/auth`, config)
            // request
            .then((res) => {
                console.log('res ----> ', res);
                return dispatch({ type: USER_CHECK_AUTH_SUCCESS, payload: res });
            })
            .catch((error) => {
                console.log('error ----> ', error);
                return dispatch({ type: USER_CHECK_AUTH_FAILURE, payload: error });
            })
    }

}

export const userCreatedStatusChange = user => {

    return (dispatch) => {

        dispatch({ type: USER_CREATED_STATUS_CHANGE, payload: { created: false } });

    }
}