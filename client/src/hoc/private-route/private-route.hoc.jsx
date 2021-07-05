import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchUserAuth } from '../../redux/auth/auth.actions';

import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

/**
 * PrivateRoute component is a High Order Component for rendering
 * protected routes. It receives the following props:
 *
 * @component - protected component, should be rendered;
 * @user - user object, containing, inter alia, user._id - the unique
 * user id in the database;
 * @rest - other props to the component
 */
// const PrivateRoute = ({ component: Component, privateRoute, ...rest }) => {
const PrivateRoute = (props) => {
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
	 * new PPP (19.10.2020)
	 * 
	 * 1) Render 'Loading...' element on the page
	 * 
	 * 2) Fetch auth route from the server (`/api/users/auth`)
	 * 
	 * 3) If response contains user data (res.data.data),
	 * redirect to a private route
	 * 
	 * 4) Otherwise, redirect to login page
   *
   */
	
	const { 
		component: Component,
		privateRoute,
		path,
		processing,
		dataFetched,
		status,
		// user,
		error,
		checkUserAuth,
		...rest 
	} = props;

	console.log(
		'%c PrivateRoute component, { ...props } ===> ',
		'color: orangered; font-weight: bold;',
		{ ...props }
	);
	
	if (!dataFetched) checkUserAuth();

	if (processing) {
		return <div className="private-route__loading">loading...</div>;
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				status ? (
					<div className="page">
						<Header />
						<Component { ...props } />
						<Footer />
					</div>
				) : (
					<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
				)}
		/>
	);
};

const mapReduxStateToProps = state => ({
	processing: state.auth.processing,
	dataFetched: state.auth.dataFetched,
	status: state.auth.status,
	error: state.auth.error,
});

const mapReduxDispatchToProps = dispatch => ({
	checkUserAuth: () => dispatch(fetchUserAuth()),
});

export default connect(
	mapReduxStateToProps,
  mapReduxDispatchToProps,
)(PrivateRoute);
// export default PrivateRoute;