const INITIAL_STATE = {
    showSignIn: false,
    showSignUp: false
}

const modalReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'USER_REGISTER':
            return {
                ...state,
                showSignIn: action.showSignIn
            }
        default:
            return state;
    }
}

export default modalReducer;