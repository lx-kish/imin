import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { auth } from '../../redux/user/user.actions';

export default (WrappedComponent, authRequired) => {
    const AuthenticationCheck = props => {

        // /**
        // * Single state hook useState for all the state properties
        // */
        // const [fullState, setFullState] = React.useState({

        //     loading: true
        // });

        // /**
        // * Redirect on successfull submission
        // */
        // React.useEffect(() => {

        //     if (fullState.submitSuccess) {
        //         setFullState({
        //             ...fullState,
        //             submitSuccess: false
        //         });
        //         props.history.push('/profile');
        //     }

        // }, [fullState.submitSuccess]);

        // 

        // if (fullState.loading) {
        //     props.dispatch(auth())
        //         .then((res) => {
        //             // console.log('inside submit ===> ', props)
        //             // console.log('inside submit ===> ', res)
        //             if (res.type === 'USER_CHECK_AUTH_FAILURE') {
        //                 setFullState({
        //                     ...fullState,
        //                     loading: false
        //                 })
        //             } else if (res.type === 'USER_CHECK_AUTH_SUCCESS') {

        //                 setFullState({
        //                     ...fullState,
        //                     loading: true
        //                 })
        //             }
        //         })
        //         return (
        //             <div className='auth__loader'> Loading...</div>
        //         )
        // }

        // if (fullState.loading) {
        //     return (
        //         <ComposedClass {...props} user={props.user} />
        //     )
        // } else {
        //     props.history.push('/signup');
        // }
        if (props.auth === authRequired) {
            console.log('HOC auth ===> ', props.auth);
            console.log('auth required ===> ', authRequired)
            return <WrappedComponent {...this.props} />
        } else {
            props.dispatch(auth());

            console.log('HOC auth ===> ', props.auth);
            console.log('auth required ===> ', authRequired)
            if (authRequired) {
                return <Redirect to="/profile" />
            } else {
                return <Redirect to="/signup" />
            }
        }




    }

    const mapStateToProps = state => {
        console.log('mapStateToProps ====> ', state);
        console.log('mapStateToProps state.user.auth ====> ', state.user.auth)
        return {
            auth: state.user.auth
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck);
}