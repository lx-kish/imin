import React from 'react';
import {
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

const PrivateRoute = ({ component, user, ...rest }) => {
  console.log(user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user._id ? ( //auth???
          component
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;