import React from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchUserAuth } from '../../redux/auth/auth.actions';

// import isAuth from '../../utils/isAuth';
import config from '../../axios.config';
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

	// const { component: Component, privateRoute, path, ...rest } = props;
	
	const { 
		component: Component,
		privateRoute,
		path,
		processing,
		dataFetched,
		user,
		error,
		checkUserAuth,
		...rest 
	} = props;

	console.log(
		'%c auth.actions fetchUserAuth, res.data.data ===> ',
		'color: orangered; font-weight: bold;',
		{ ...props }
	);
	
	if (!dataFetched) checkUserAuth();

	if (processing) {
		return <div className="private-route__loading">loading...</div>;
	}

		// React.useEffect(() => {
		// 	if (!dataFetched) checkUserAuth();
		// },
		// [user]
		// );

	// const [ user, setUser ] = React.useState({});
	// const [ loaded, setLoaded ] = React.useState(false);

	// const fetchData = async (isCancelled) => {
	// 	await axios
	// 		// const result = await axios
	// 		.get(`/api/users/auth`, config)
	// 		.then((res) => {
	// 			if (!isCancelled) {
	// 				// console.log('PrivateRoute, res =====> ', res);
	// 				console.log('PrivateRoute, res.data.data =====> ', res.data);
	// 				setUser(res.data);
	// 				setLoaded(true);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log('PrivateRoute, error =====> ', error.response);
	// 			setUser({});
	// 			setLoaded(true);
	// 		});
	// };

	// React.useEffect(
	// 	() => {
	// 		let isCancelled = false;

	// 		fetchData(isCancelled);
	// 		return () => {
	// 			isCancelled = true;
	// 		};
	// 		/**
  //    * Input dependencies:
  //    * undefined => every render,
  //    * [a, b] => when a or b change,
  //    * [] => only once
  //    * https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb
  //    */
	// 	},
	// 	[]
	// );

	// if (!loaded) {
	// 	return <div className="private-route__loading">loading...</div>;
	// }

	console.log('============================================>');
	console.log('props from privateRoute hoc ===> ', props);
	console.log('Component from privateRoute hoc ===> ', Component.name);
	console.log('user from privateRoute hoc ===> ', user);
	// console.log('loaded from privateRoute hoc ===> ', loaded);
	// console.log('user?.data?._id from privateRoute hoc ===> ', user?.data?._id);

	return (
		<Route
			{...rest}
			render={(props) =>
				user?._id ? (
				// user?.data?._id ? (
					<div className="page">
						<Header user={user} />
						<Component user={user} { ...props } />
						{/* <Header {...user} />
						<Component {...user} {...props} /> */}
						<Footer />
					</div>
				) : (
					<Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
				)}
		/>
	);
};

// export default PrivateRoute;

const mapReduxStateToProps = state => ({
	processing: state.auth.processing,
	dataFetched: state.auth.dataFetched,
	user: state.auth.user,
	// user: { ...state.auth.user },
	error: state.auth.error,
});

const mapReduxDispatchToProps = dispatch => ({
	checkUserAuth: () => dispatch(fetchUserAuth(dispatch)),

  // onPhraseChange:
  //   (newPhrase) => dispatch(updateSearchPhrase(newPhrase)),
  // // TODO something is wrong here _DONE
  // onMatchingContactSelect:
  //   (selectedMatchingContact) => dispatch(selectMatchingContact(selectedMatchingContact.value)),
  //   // (selectedMatchingContact) => dispatch(updateSearchPhrase(selectedMatchingContact.value)),
});

export default connect(
  mapReduxStateToProps,
  mapReduxDispatchToProps,
)(PrivateRoute);