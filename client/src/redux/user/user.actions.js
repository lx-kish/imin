import axios from 'axios';

export const userSignUp = user => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const request = axios.post(`http://localhost:3100/api/auth/signup`, user, config);
    // const request = axios.post(`/api/auth/signup`, user, config);

    // console.log(user);
    console.log('------------>', request);

    return (dispatch) => {
        console.log('------------>', 'here');
        try {
            request.then(({ data }) => {
                // let users = data.success ? [...userList, data.user] : userList;
                let response = {
                    success: data.post,
                    user: data.userId
                }

                dispatch({
                    type: 'USER_REGISTER',
                    payload: response
                })

                console.log(data);
            })
        }
        catch (e) {
            console.log(e);
        }

    }
}