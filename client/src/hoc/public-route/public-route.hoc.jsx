import React from 'react';
// import axios from 'axios';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

// import config from '../../axios.config';
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';

/**
 * PublicRoute component is a High Order Component for rendering
 * protected routes. It receives the following props:
 *
 * @component - protected component, should be rendered;
 * @rest - other props to the component
 */
const PublicRoute = (props) => {
	const { 
		component: Component,
		privateRoute,
		path,
		processing,
		dataFetched,
		status,
		// user,
		error,
		...rest
	} = props;
	
	console.log(
		'%c PublicRoute component, { ...props } ===> ',
		'color: orangered; font-weight: bold;',
		{ ...props }
	);
	// const { component: Component, privateRoute, path, ...rest } = props;

	// const [ user, setUser ] = React.useState({});
	// const [ loaded, setLoaded ] = React.useState(false);

	// const fetchData = async (isCancelled) => {
	// 	await axios
	// 		// const result = await axios
	// 		.get(`/api/users/auth`, config)
	// 		.then((res) => {
	// 			if (!isCancelled) {
	// 				// console.log('PrivateRoute, res =====> ', res);
	// 				console.log('PublicRoute, res.data.data =====> ', res.data);
	// 				setUser(res.data);
	// 				setLoaded(true);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.log('PublicRoute, error =====> ', error.response);
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

	if (processing) {
		return <div className="private-route__loading">loading...</div>;
	}

	return (
		<Route
			{...rest}
			render={(props) => (
				<div className="page">
					<Header />
					{/* <Header user={{}} /> */}
					<Component {...props} />
					<Footer />
				</div>
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

export default connect(
	mapReduxStateToProps,
  null,
)(PublicRoute);
// export default PublicRoute;
