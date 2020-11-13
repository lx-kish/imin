import React from 'react';
import { Route } from 'react-router-dom';

import NavigationBar from '../../components/navigation/navigation-bar/navigation-bar.component';
import Footer from '../../components/footer/footer.component';

/**
 * PublicRoute component is a High Order Component for rendering
 * protected routes. It receives the following props:
 *
 * @component - protected component, should be rendered;
 * @rest - other props to the component
 */
const PublicRoute = ({ component: Component, ...rest }) => {

	return (
		<Route >
			<NavigationBar user={{}}/>
			<Component {...rest}/>
			<Footer />
		</Route>
	);
};
export default PublicRoute;
