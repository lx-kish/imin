import {
    USER_SIGN_UP,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_IN,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAILURE,
    USER_CREATED_STATUS_CHANGE,
} from '../types';

const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {

    const payload = action.payload;

    switch (action.type) {
        case USER_SIGN_UP:

            return {
                ...state,
                loading: true,
                loaded: false
            }

        case USER_SIGN_UP_SUCCESS:
            return {
                ...state,
                data: payload.data,
                token: payload.data.token,
                user: payload.data.userId,
                created: true,
                // data: state.data.concat(payload.data),
                loading: false,
                loaded: true,
                error: null
            }

        case USER_SIGN_UP_FAILURE:

            return {
                ...state,
                created: false,
                loading: false,
                loaded: true,
                error: payload
            }

        case USER_SIGN_IN:

            return {
                ...state,
                loading: true,
                loaded: false
            }

        case USER_SIGN_IN_SUCCESS:
            return {
                ...state,
                data: payload.data,
                created: false,
                // data: state.data.concat(payload.data),
                loading: false,
                loaded: true,
                error: null
            }

        case USER_SIGN_IN_FAILURE:

            return {
                ...state,
                created: false,
                loading: false,
                loaded: true,
                error: payload
            }

        case USER_CREATED_STATUS_CHANGE:

            return {
                ...state,
                created: payload.created
            }
        default:
            return state
    }
}

export default userReducer;