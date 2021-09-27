import React from 'react';
import { Switch } from 'react-router-dom';

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
import Settings from './pages/settings/settings.page';
import TermsAndConditions from './pages/terms-and-conditions/terms-and-conditions.page';
import UpcomingEventsList from './pages/upcoming-events/upcoming-events-list.page';

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
			<PrivateRoute path="/logout" exact component={LogOut} privateRoute={true} />
			<PrivateRoute path="/profile" exact component={Profile} privateRoute={true} />
			<PrivateRoute path="/settings" exact component={Settings} privateRoute={true} />
			<PrivateRoute path="/upcoming" exact component={UpcomingEventsList} privateRoute={true} />
		</Switch>
	);
};

export default Routes;
