import {
    FETCH_USER_AUTH__START,
    FETCH_USER_AUTH__SUCCESS,
    FETCH_USER_AUTH__FAILURE,
} from './auth.actions.js';

import {
    FETCH_USER_DATA__SUCCESS,
    FETCH_USER_LOGOUT,
} from '../user/user.actions.js';

const initialState = {
    dataFetched: false,
    processing: false,
    status: false,
    error: '',
}

const authReducer = (state = initialState, action) => {

    const payload = action.payload;

    switch (action.type) {
        case FETCH_USER_AUTH__START:
            return {
                ...state,
                processing: true
            }

        case FETCH_USER_AUTH__SUCCESS:
            return {
                ...state,
                processing: false,
                dataFetched: true,
                status: true,
                // user: payload.user,
                // user: { ...payload.user },
            }

        case FETCH_USER_AUTH__FAILURE:
            return {
                ...state,
                processing: false,
                dataFetched: false,
                error: payload.error
            }

        case FETCH_USER_DATA__SUCCESS:
            return {
                ...state,
                processing: false,
                dataFetched: true,
                status: true,
            }

        case FETCH_USER_LOGOUT:
            return {
                ...state,
                dataFetched: false,
                processing: false,
                status: false,
                error: '',
            }

        default:
            return state
    }
}

export default authReducer;