import {
    FETCH_USER_DATA__START,
    FETCH_USER_DATA__SUCCESS,
    FETCH_USER_DATA__FAILURE,
    FETCH_USER_LOGOUT,
} from './user.actions';

import {
    FETCH_USER_AUTH__SUCCESS,
} from '../auth/auth.actions';

const initialState = {
    submitError: false,
    processing: false,
    error: '',
    data: {},
}

const userReducer = (state = initialState, action) => {

    const payload = action.payload;

    switch (action.type) {
        case FETCH_USER_DATA__START:
            return {
                ...state,
                processing: true, 
                submitError: false,
                error: '',
            }

        case FETCH_USER_DATA__SUCCESS:
            return {
                ...state,
                processing: false, 
                submitError: false,
                error: '',
                data: payload.user,
            }

        case FETCH_USER_DATA__FAILURE:
            return {
                ...state,
                processing: false, 
                submitError: false,
                error: payload.error,
                data: payload.user, //should be previous state.user.data
            }

        case FETCH_USER_LOGOUT:
            return {
                ...state,
                processing: false, 
                submitError: false,
                error: '',
                data: {},
            }

        case FETCH_USER_AUTH__SUCCESS:
            return {
                ...state,
                data: payload.user,
            }

        default:
            return state
    }
}

export default userReducer;