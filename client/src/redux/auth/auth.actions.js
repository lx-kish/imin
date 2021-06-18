import axios from 'axios';

import config from '../../axios.config';

export const FETCH_USER_AUTH__START = "FETCH_USER_AUTH__START";
export const FETCH_USER_AUTH__SUCCESS = "FETCH_USER_AUTH__SUCCESS";
export const FETCH_USER_AUTH__FAILURE = "FETCH_USER_AUTH__FAILURE";

export const fetchUserAuthStart = () => ({
    type: FETCH_USER_AUTH__START,
});

export const fetchUserAuthSuccess = ( user ) => ({
    type: FETCH_USER_AUTH__SUCCESS,
    payload: {
        user,
    },
});

export const fetchUserAuthFailure = (error) => ({
    type: FETCH_USER_AUTH__FAILURE,
    payload: error
});

export const fetchUserAuth = (dispatch, getState) => {
    dispatch(fetchUserAuthStart());

    // return axios
    return dispatch => { return axios
        .get(`/api/users/auth`, config)
        .then((res) => {
            console.log(
	        	'%c auth.actions fetchUserAuth, res.data.data ===> ',
	        	'color: yellowgreen; font-weight: bold;',
	        	{ ...res.data.data }
	        );
            // console.log('auth.actions fetchUserAuth, res.data.data =====> ', { ...res.data.data });
            // console.log('auth.actions fetchUserAuth, res.data.data =====> ', res.data.data);
            // console.log('PrivateRoute, res =====> ', res);
            dispatch(fetchUserAuthSuccess({ ...res.data.data }));
        })
        .catch((error) => {
            console.log(
	        	'%c auth.actions fetchUserAuth, error ===> ',
	        	'color: yellowgreen; font-weight: bold;',
	        	error.response
	        );
            // console.log('auth.actions fetchUserAuth, error =====> ', error.response);
            // console.log('PrivateRoute, error =====> ', error.response);
            dispatch(fetchUserAuthFailure(error.response));
        });
    };

};

// export const userSignIn = user => {

//     return (dispatch) => {

//         dispatch({ type: USER_SIGN_IN });
//         return axios.post(`http://127.0.0.1:3100/api/user/signin`, user, config)
//             // request
//             .then((res) => {
//                 // console.log('res ----> ',res);
//                 return dispatch({ type: USER_SIGN_IN_SUCCESS, payload: res });
//             })
//             .catch((error) => {
//                 // console.log('error ----> ', error);
//                 return dispatch({ type: USER_SIGN_IN_FAILURE, payload: error });
//             })
//     }
// }

// export const auth = () => {

//     return (dispatch) => {

//         dispatch({ type: USER_CHECK_AUTH });
//         return axios.get(`http://127.0.0.1:3100/api/user/auth`, config)
//             // request
//             .then((res) => {
//                 console.log('res ----> ', res);
//                 return dispatch({ type: USER_CHECK_AUTH_SUCCESS, payload: res });
//             })
//             .catch((error) => {
//                 console.log('error ----> ', error);
//                 return dispatch({ type: USER_CHECK_AUTH_FAILURE, payload: error });
//             })
//     }

// }
