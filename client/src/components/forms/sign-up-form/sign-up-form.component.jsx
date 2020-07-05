import React from 'react';

const SignUpForm = props => {

    /**
    * Single state hook useState for all the state properties
    */
    const [fullState, setFullState] = React.useState({
        success: false,
        validation: false,
    });

    return (
        <div className={props.className}>
            <form >
                <button>submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;