import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/home.page';
import About from './pages/lvl2-pages/about.page';
import Contact from './pages/contact/contact.page';
import Educators from './pages/lvl2-pages/educators.page';
import Partners from './pages/lvl2-pages/partners.page';
import Students from './pages/lvl2-pages/students.page';
import SignUp from './pages/sign-up/sign-up.page';
import SignIn from './pages/sign-in/sign-in.page';
import LogOut from './pages/log-out/log-out.page';
import Profile from './pages/profile/profile.page';
import Account from './pages/account/account.page';
import TermsAndConditions from './pages/terms-and-conditions/terms-and-conditions.page';

import PrivateRoute from './hoc/private-route/private-route.hoc';
import PublicRoute from './hoc/public-route/public-route.hoc';

const Routes = () => {
	return (
		<Switch>
			<PublicRoute path="/" exact component={Home} privateRoute={false} />
			<PublicRoute path="/about" exact component={About} privateRoute={false} />
			<PublicRoute path="/contact" exact component={Contact} privateRoute={false} />
			<PublicRoute path="/educators" exact component={Educators} privateRoute={false} />
			<PublicRoute path="/students" exact component={Students} privateRoute={false} />
			<PublicRoute path="/partners" exact component={Partners} privateRoute={false} />
			<PublicRoute path="/signup" exact component={SignUp} privateRoute={false} />
			<PublicRoute path="/signin" exact component={SignIn} privateRoute={false} />
			<PublicRoute path="/terms" exact component={TermsAndConditions} privateRoute={false} />
			{/* <Route path="/" exact component={Home} />
				<Route path="/about" exact component={About} />
				<Route path="/contact" exact component={Contact} />
				<Route path="/educators" exact component={Educators} />
				<Route path="/students" exact component={Students} />
				<Route path="/partners" exact component={Partners} />
				<Route path="/signup" exact component={SignUp} />
				<Route path="/signin" exact component={SignIn} /> */}
			<PrivateRoute path="/logout" exact component={LogOut} privateRoute={true} />
			<PrivateRoute path="/profile" exact component={Profile} privateRoute={true} />
			<PrivateRoute path="/account" exact component={Account} privateRoute={true} />
			{/* <Route path="/terms" exact component={TermsAndConditions} /> */}
		</Switch>
	);
};

export default Routes;
