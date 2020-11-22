import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import config from '../../axios.config';
import NavigationBar from '../../components/navigation/navigation-bar/navigation-bar.component';
import Footer from '../../components/footer/footer.component';

/**
 * PublicRoute component is a High Order Component for rendering
 * protected routes. It receives the following props:
 *
 * @component - protected component, should be rendered;
 * @rest - other props to the component
 */
const PublicRoute = (props) => {
	const { component: Component, privateRoute, path, ...rest } = props;

	const [ user, setUser ] = React.useState({});
	const [ loaded, setLoaded ] = React.useState(false);
	// const [ counter, setCounter ] = React.useState(0);

	// setPrprts(props);

	const fetchData = async (isCancelled) => {
		await axios
			// const result = await axios
			.get(`/api/users/auth`, config)
			.then((res) => {
				if (!isCancelled) {
					// console.log('PrivateRoute, res =====> ', res);
					console.log('PrivateRoute, res.data.data =====> ', res.data);
					setUser(res.data);
					setLoaded(true);
				}
			})
			.catch((error) => {
				console.log('PrivateRoute, error =====> ', error.response);
				setUser({});
				setLoaded(true);
			});
	};

	React.useEffect(
		() => {
			let isCancelled = false;

			fetchData(isCancelled);
			return () => {
				isCancelled = true;
			};
			/**
     * Input dependencies:
     * undefined => every render,
     * [a, b] => when a or b change,
     * [] => only once
     * https://medium.com/@sdolidze/the-iceberg-of-react-hooks-af0b588f43fb
     */
		},
		[]
	);

	if (!loaded) {
		return <div className="private-route__loading">loading...</div>;
	}

	return (
		<Route
			{...rest}
			render={(props) => (
				<React.Fragment>
					<NavigationBar data={{}} />
					<Component {...props} />
					<Footer />
				</React.Fragment>
			)}
		/>
	);
};
export default PublicRoute;
