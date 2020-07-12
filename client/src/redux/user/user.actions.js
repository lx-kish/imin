import axios from 'axios';

export const userSignUp = user => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': "*"
        }
    };
    return (dispatch) => {

        dispatch({ type: 'USER_SIGN_UP' });
        axios.post(`http://localhost:3100/api/auth/signup`, user, config)
        // request
            .then((res) => {
                console.log('res ----> ',res);
                // dispatch({ type: 'USER_SIGN_UP_SUCCESS', payload: res });
                dispatch(userSignIn(res.data.user));
            })
            .catch(( error ) => {
                console.log('error ----> ', error);
                dispatch({ type: 'USER_SIGN_UP_FAILURE', payload: error });
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

        dispatch({ type: 'USER_SIGN_IN' });
        axios.post(`http://localhost:3100/api/auth/signin`, user, config)
        // request
            .then((res) => {
                console.log('res ----> ',res);
                dispatch({ type: 'USER_SIGN_IN_SUCCESS', payload: res });
            })
            .catch(( error ) => {
                console.log('error ----> ', error);
                dispatch({ type: 'USER_SIGN_IN_FAILURE', payload: error });
            })
    }
}