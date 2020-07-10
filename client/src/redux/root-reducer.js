import { combineReducers } from 'redux';

import modal from './modal/modal.reducer';
import user from './user/user.reducer';


export default combineReducers({
    modal,
    user
});