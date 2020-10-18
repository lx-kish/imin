import React from 'react';
import axios from 'axios';
import { Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import isAuth from '../../utils/isAuth';
import config from '../../axios.config';

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

	const [ user, setUser ] = React.useState(false);
	const [ loaded, setLoaded ] = React.useState(false);

	React.useEffect(() => {

		let isCancelled = false;

		const fetchData = async () => {
			await axios
			// const result = await axios
				.get(`/api/users/auth`, config)
				.then((res) => {
					if (!isCancelled) {
						console.log('PrivateRoute, res =====> ', res);
						setUser(res.data.data);
						setLoaded(true);
					}
				})
				.catch((error) => {
					console.log('PrivateRoute, error =====> ', error.response);
					setLoaded(true);
				});
		};

		fetchData();
		return () => {
			isCancelled = true;
		};
	}, []);

	if (!loaded) {
		return <div>loading...</div>;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...user} {...props} />
				) : (
					<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
				)}
		/>
	);
};
export default PrivateRoute;
