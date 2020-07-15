import React from 'react';
import { connect } from 'react-redux';

import './profile.styles.scss';

import { userCreatedStatusChange } from '../../redux/user/user.actions';

const Profile = props => {

    //if redirected from sign up, change new user status
    if (props.user.created) props.dispatch(userCreatedStatusChange(props.user));

    return (
        <div>
            Profile
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Profile);
// export default Profile;