import axios from 'axios';

import config from '../../axios.config';

import { postData, patchData } from '../../utils/use-fetch/use-fetch';

export const FETCH_USER_DATA__START = "FETCH_USER_DATA__START";
export const FETCH_USER_DATA__SUCCESS = "ETCH_USER_DATA__SUCCESS";
export const FETCH_USER_DATA__FAILURE = "FETCH_USER_DATA__FAILURE";
export const FETCH_USER_LOGOUT = "FETCH_USER_LOGOUT";

export const fetchUserDataStart = () => ({
    type: FETCH_USER_DATA__START,
});

export const fetchUserDataSuccess = (user) => ({
    type: FETCH_USER_DATA__SUCCESS,
    payload: {
        user,
    },
});

export const fetchUserDataFailure = (error, user) => ({
    type: FETCH_USER_DATA__FAILURE,
    payload: {
        error,
        // user, //previous state.user.data
    },
});

export const fetchUserLogout = () => ({
    type: FETCH_USER_LOGOUT,
});

export const postUserDataToTheServer = (route, values) => {

    return (dispatch, getState) => {

        dispatch(fetchUserDataStart());

        return postData(`/api/users/${route}`, values)
            .then((res) => {
                console.log(
                    '%c user.actions postUserDataToTheServer, res.data.data ===> ',
                    'color: yellowgreen; font-weight: bold;',
                    { ...res.data.data.user },
                    route
                );
                if (route === 'signin' || route === 'signup') dispatch(fetchUserDataSuccess({ ...res.data.data.user }));

                if (route === 'logout') dispatch(fetchUserLogout());

                throw new Error(`The unknown route *${route}* has been detected, operation aborted!`);

            })
            .catch((e) => {
                dispatch(fetchUserDataFailure(e.response));
            });
    };
};

export const patchUserDataToTheServer = (route, values) => {

    return (dispatch, getState) => {

        dispatch(fetchUserDataStart());

        return axios

            .patch(`/api/users/${route}`, values, config)

            .then((res) => {
                console.log(
                    '%c user.actions postUserDataToTheServer, res.data.data ===> ',
                    'color: yellowgreen; font-weight: bold;',
                    { ...res.data.data },
                    route
                );
                dispatch(fetchUserDataSuccess({ ...res.data.data.data }));
                // dispatch(fetchUserDataSuccess({ ...res.data.data.user }));

            })
            .catch((e) => {
                dispatch(fetchUserDataFailure(e.response));
            });
    };
};