import React from 'react';

const SignIn = props => {

    // console.log(props);
    console.log(props.location.state.role || 'empty props');

    return (
        <div>
            sign in
        </div>
    )
};

export default SignIn;