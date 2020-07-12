import React from 'react';

const SignIn = props => {

    // console.log(props);
    const role = props.location.state ?
        props.location.state.role || 'student'
        : 'student';
    console.log(role);

    return (
        <div>
            sign in
        </div>
    )
};

export default SignIn;