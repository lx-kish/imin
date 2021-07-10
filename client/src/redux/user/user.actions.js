import { fetchData } from '../../utils/use-fetch';

export const FETCH_USER_DATA__START = "FETCH_USER_DATA__START";
export const FETCH_USER_DATA__SUCCESS = "FETCH_USER_DATA__SUCCESS";
export const FETCH_USER_DATA__FAILURE = "FETCH_USER_DATA__FAILURE";
export const FETCH_USER_LOGOUT = "FETCH_USER_LOGOUT";

const routePrefix = '/api/users';

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
        user, //previous state.user.data
    },
});

export const fetchUserLogout = () => ({
    type: FETCH_USER_LOGOUT,
});

export const getUserDataFromTheServer = (route, values) => {

    return (dispatch, getState) => {

        dispatch(fetchUserDataStart());

        return fetchData('GET', `${routePrefix}/${route}`, values)
            .then((res) => {
                // console.log(
                //     '%c user.actions getUserDataFromTheServer, res.data.data ===> ',
                //     'color: yellowgreen; font-weight: bold;',
                //     { ...res.data.data?.user },
                //     `${routePrefix}/${route}`
                // );

                if (route === 'logout') dispatch(fetchUserLogout());

                // throw new Error(`The unknown route *${route}* has been detected, operation aborted!`);

            })
            .catch((e) => {
                // console.log(
                //     '%c user.actions getUserDataFromTheServer, e ===> ',
                //     'color: yellowgreen; font-weight: bold;',
                //     e,
                //     `${routePrefix}/${route}`
                // );
                dispatch(fetchUserDataFailure(e.response));
            });
    };
};

export const postUserDataToTheServer = (route, values) => {

    return (dispatch, getState) => {

        dispatch(fetchUserDataStart());

        return fetchData('POST', `${routePrefix}/${route}`, values)
            .then((res) => {
                // console.log(
                //     '%c user.actions postUserDataToTheServer, res.data.data ===> ',
                //     'color: yellowgreen; font-weight: bold;',
                //     { ...res.data.data.user },
                //     route
                // );
                if (route === 'signin' || route === 'signup') dispatch(fetchUserDataSuccess({ ...res.data.data.user }));

                // throw new Error(`The unknown route *${route}* has been detected, operation aborted!`);

            })
            .catch((e) => {
                dispatch(fetchUserDataFailure(e.response));
            });
    };
};

export const patchUserDataToTheServer = (route, values) => {
    // console.log(
    //     '%c user.actions patchUserDataToTheServer, values, route ===> ',
    //     'color: yellowgreen; font-weight: bold;',
    //     values,
    //     route,
    //     `${routePrefix}/${route}`,
    // );
    return (dispatch, getState) => {

        dispatch(fetchUserDataStart());

        return fetchData('PATCH', `${routePrefix}/${route}`, values)
            .then((res) => {
                console.log(
                    '%c user.actions postUserDataToTheServer, res.data.data, route ===> ',
                    'color: yellowgreen; font-weight: bold;',
                    { ...res.data.data },
                );
                dispatch(fetchUserDataSuccess({ ...res.data.data.user }));
                // dispatch(fetchUserDataSuccess({ ...res.data.data.data }));

            })
            .catch((e) => {
                dispatch(fetchUserDataFailure(e.response));
            });
    };
};