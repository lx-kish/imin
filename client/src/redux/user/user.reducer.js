/**
 * PAGE USAGE SCENARIO:
 * 
 * 1. Three types of pages
 * 
 * Common used pages:
 * - Home, About, Contact, Educators-Students-Partners, 
 * Any user can see these pages at any time
 * 
 * Common used pages, cannot seen from authorization:
 * - Sign up, Sign in
 * If user is signed in, he cannot see this pages until he logged off
 * 
 * 
 * Private pages, contain private data, can be seen jus authorized user
 * -Profile, ..., ...
 * If user is not signed in, he cannot see this pages until he logged off
 * 
 * 2. State, is needed to serve authorization process:
 * - auth - true/false, checks after every changing page, based on matching 
 * access_token on client local storage and user profile in the database on the server
 * 
 * 
 */

/***
 * User reducer state attributes:
 * @auth Boolean - is user authorized
 * - uses JWT mechanism
 * - sets true when access_token variable in local storage matches the same name variable in server DB
 * - checks on every page change for pages with require authorization, or sign-in/sign-up pages
 * 
 * @error String - null or string with error message
 */

import {
    USER_SIGN_UP,
    USER_SIGN_UP_SUCCESS,
    USER_SIGN_UP_FAILURE,
    USER_SIGN_IN,
    USER_SIGN_IN_SUCCESS,
    USER_SIGN_IN_FAILURE,
    USER_CHECK_AUTH,
    USER_CHECK_AUTH_SUCCESS,
    USER_CHECK_AUTH_FAILURE,
    USER_CREATED_STATUS_CHANGE,
} from '../types';

const INITIAL_STATE = {}

const userReducer = (state = INITIAL_STATE, action) => {

    const payload = action.payload;

    switch (action.type) {
        case USER_SIGN_UP:

            return {
                ...state,
                loading: true, //@TODO decide whether it needed
                loaded: false, //@TODO decide whether it needed
                auth: false
            }

        case USER_SIGN_UP_SUCCESS:
            return {
                ...state,
                auth: true,
                data: payload.data, //@TODO for testing purposes, remove later
                token: payload.data.token, //@TODO for testing purposes, remove later
                user: payload.data.userId, //@TODO for testing purposes, remove later
                created: true, //@TODO decide whether it needed
                loading: false, //@TODO decide whether it needed
                loaded: true, //@TODO decide whether it needed
                error: null 
            }

        case USER_SIGN_UP_FAILURE:

            return {
                ...state,
                auth: false,
                created: false, //@TODO decide whether it needed
                loading: false, //@TODO decide whether it needed
                loaded: true, //@TODO decide whether it needed
                error: payload.response.data.message, 
                message: payload.response.data.message //@TODO decide whether it needed
            }

        case USER_SIGN_IN:

            return {
                ...state,
                loading: true, //@TODO decide whether it needed
                loaded: false, //@TODO decide whether it needed
                auth: false
            }

        case USER_SIGN_IN_SUCCESS:
            return {
                ...state,
                auth: true,
                data: payload.data, //@TODO for testing purposes, remove later
                created: false, //@TODO decide whether it needed
                // data: state.data.concat(payload.data),
                loading: false, //@TODO decide whether it needed
                loaded: true, //@TODO decide whether it needed
                error: null
            }

        case USER_SIGN_IN_FAILURE:

            return {
                ...state,
                auth: false,
                created: false, //@TODO decide whether it needed
                loading: false, //@TODO decide whether it needed
                loaded: true, //@TODO decide whether it needed
                error: payload //@TODO - should contain error message - check what's really contained
            }

            case USER_CHECK_AUTH:

                return {
                    ...state,
                    checking: true, //@TODO decide whether it needed
                    auth: false
                }
    
            case USER_CHECK_AUTH_SUCCESS:
                return {
                    ...state,
                    data: payload.data, //@TODO for testing purposes, remove later
                    checking: false, //@TODO decide whether it needed
                    auth: true,
                    error: null
                }
    
            case USER_CHECK_AUTH_FAILURE:
    
                return {
                    ...state,
                    checking: false, //@TODO decide whether it needed
                    auth: false,
                    error: payload //@TODO - should contain error message - check what's really contained
                }

        case USER_CREATED_STATUS_CHANGE:

            return {
                ...state,
                created: payload.created //@TODO decide whether it needed
            }
        default:
            return state
    }
}

export default userReducer;