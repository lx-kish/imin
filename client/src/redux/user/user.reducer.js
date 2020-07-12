const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {

    const payload = action.payload;

    switch (action.type) {
        case 'USER_SIGN_UP':

            return {
                ...state,
                loading: true,
                loaded: false
            }

        case 'USER_SIGN_UP_SUCCESS':
            return {
                ...state,
                data: payload.data,
                // data: state.data.concat(payload.data),
                loading: false,
                loaded: true,
                error: null
            }

        case 'USER_SIGN_UP_FAILURE':

            return {
                ...state,
                loading: false,
                loaded: true,
                error: payload
            }

        case 'USER_SIGN_IN':

            return {
                ...state,
                loading: true,
                loaded: false
            }

        case 'USER_SIGN_IN_SUCCESS':
            return {
                ...state,
                data: payload.data,
                // data: state.data.concat(payload.data),
                loading: false,
                loaded: true,
                error: null
            }

        case 'USER_SIGN_IN_FAILURE':

            return {
                ...state,
                loading: false,
                loaded: true,
                error: payload
            }
        default:
            return state
    }
    // switch (action.type) {
    //     case 'USER_SIGN_UP':
    //         return {
    //             ...state,
    //             auth: {
    //                 userId: action.userId
    //             }
    //         }
    //     case 'USER_SIGN_IN':
    //         return {
    //             ...state,
    //             auth: {
    //                 token: action.token,
    //                 userId: action.userId
    //             }
    //         }
    //     default:
    //         return state;
    // }
}

export default userReducer;