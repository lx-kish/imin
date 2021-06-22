import axios from 'axios';

import config from '../../axios.config';

import { getData } from '../../utils/use-fetch/use-fetch';

export const FETCH_USER_AUTH__START = "FETCH_USER_AUTH__START";
export const FETCH_USER_AUTH__SUCCESS = "FETCH_USER_AUTH__SUCCESS";
export const FETCH_USER_AUTH__FAILURE = "FETCH_USER_AUTH__FAILURE";

export const fetchUserAuthStart = () => ({
    type: FETCH_USER_AUTH__START,
});

export const fetchUserAuthSuccess = (user) => ({
    type: FETCH_USER_AUTH__SUCCESS,
    payload: {
        user,
    },
});

export const fetchUserAuthFailure = (error) => ({
    type: FETCH_USER_AUTH__FAILURE,
    payload: error
});

export const fetchUserAuth = () => {
    // return axios
    return (dispatch, getState) => {

        dispatch(fetchUserAuthStart());

        return getData(`/api/users/auth`)
            .then((res) => {
                dispatch(fetchUserAuthSuccess({ ...res.data.data }));
            })
            .catch((e) => {
                dispatch(fetchUserAuthFailure(e.response));
            });
        // return axios
        // .get(`/api/users/auth`, config)
        // .then((res) => {
        //     console.log(
        //     	'%c auth.actions fetchUserAuth, res.data.data ===> ',
        //     	'color: yellowgreen; font-weight: bold;',
        //     	{ ...res.data.data }
        //     );
        //     dispatch(fetchUserAuthSuccess({ ...res.data.data }));
        // })
        // .catch((error) => {
        //     console.log(
        //     	'%c auth.actions fetchUserAuth, error ===> ',
        //     	'color: yellowgreen; font-weight: bold;',
        //     	error.response
        //     );
        //     dispatch(fetchUserAuthFailure(error.response));
        // });
    };

};
