import React from "react";
import axios from "axios";
import {
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

import config from "../../axios.config";

/**
 * PrivateRoute component is a High Order Component for rendering
 * protected routes. It receives the following props:
 *
 * @component - protected component, should be rendered;
 * @user - user object, containing, inter alia, user._id - the unique
 * user id in the database;
 * @rest - other props to the component
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  // const PrivateRoute = props => {

  /**
   * 1) check user variable.
   *
   * 2) user is an object means it's logged in, open a PrivateRoute
   *
   * 3) if user is NOT an object, then make axios request to the server:
   * api/users/isAuth(protected)
   *
   * 4) based on response, redirect to a PrivateRoute or to the /login
   *
   */

  // const { component, user } = props;
  /**
   * Single state hook useState for all the state properties
   */
  const [fullState, setFullState] = React.useState({
    isAuth: false,
    isLoaded: false
  });

  const unmounted = React.useRef(false);

  /**
   * Redirect on successfull submission
   */
  React.useEffect(() => {
    console.log("private route HOC, before axios request ===> ", fullState.isAuth);
    axios
      // const result = await axios
      .get(`/api/users/auth`, config)

      .then((isAuth) => {
        if (!unmounted.current) {
        // setLoading(false);
          console.log("private route HOC, res =====> ", isAuth);
          setFullState({
            ...fullState,
            isAuth,
            isLoaded: true
          });
        }
      })
      .catch((error) => {
        console.log("private route HOC, error =====> ", error.response);
      });

      return () => { unmounted.current = true };
  }, []);

  // const isAuth = async () => {
  //   if (user._id) return true;

  //   const result = await axios
  //   .post(`/api/users/auth`, config)

  //   .then((res) => {
  //     console.log("private route HOC, res =====> ", res);
  //   })
  //   .catch((error) => {
  //     console.log("private route HOC, error =====> ", error.response);
  //   });

  //   return result;

  // }

  // console.log(user);
  // if (!fullState.isLoaded) {

    return (
      <Route {...rest} render={props => (
        // console.log(fullState);
        fullState.isAuth
        ? <Component { ...props } />
        : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      )} />
    );
  // }
};

export default PrivateRoute;
