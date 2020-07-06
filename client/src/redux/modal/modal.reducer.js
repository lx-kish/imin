const INITIAL_STATE = {
    showSignIn: false,
    showSignUp: false
}

const modalReducer = (state = INITIAL_STATE, action) => {
    console.log(action)
    switch (action.type) {
        case 'SHOW_HIDE_SIGN_IN':
            return {
                ...state,
                showSignIn: !action.showSignIn
            }
        case 'HOW_HIDE_SIGN_UP':
            return {
                ...state,
                showSignUp: !action.showSignUp
            }
        default:
            return state;
    }
}

export default modalReducer;