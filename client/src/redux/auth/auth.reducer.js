import {
    FETCH_USER_AUTH__START,
    FETCH_USER_AUTH__SUCCESS,
    FETCH_USER_AUTH__FAILURE,
} from './auth.actions.js';

const initialState = {
    dataFetched: false,
    processing: false,
    error: '',
    user: {},
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
                user: payload.user,
                // user: { ...payload.user },
            }

        case FETCH_USER_AUTH__FAILURE:
            return {
                ...state,
                processing: false,
                dataFetched: false,
                user: null,
                error: payload.error
            }

        default:
            return state
    }
}

export default authReducer;