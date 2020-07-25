import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/home.page';
import About from './pages/lvl2-pages/about.page';
import Contact from './pages/contact/contact.page';
import Educators from './pages/lvl2-pages/educators.page';
import Partners from './pages/lvl2-pages/partners.page';
import Students from './pages/lvl2-pages/students.page';
import SignUp from './pages/sign-up/sign-up.component';
import SignIn from './pages/sign-in/sign-in.component';
import LogOut from './pages/log-out/log-out.component';
import Profile from './pages/profile/profile.component';
import TermsAndConditions from './pages/terms-and-conditions/terms-and-conditions.page';

import Layout from './hoc/layout/layout.hoc';
import Auth from './hoc/auth/auth.hoc';
// import Auth from './hoc/auth';

const Routes = () => {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/about' exact component={About} />
                <Route path='/contact' exact component={Contact} />
                <Route path='/educators' exact component={Educators} />
                <Route path='/students' exact component={Students} />
                <Route path='/partners' exact component={Partners} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/logout' exact component={LogOut} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/terms' exact component={TermsAndConditions} />
                {/* <Route path='/login' exact component={Auth(Login, false)}/>
                <Route path='/user' exact component={Auth(User, true)}/>
                <Route path='/user/logout' exact component={Auth(Logout, true)}/>
                <Route path='/user/add' exact component={Auth(AddReview, true)}/>
                <Route path='/user/register' exact component={Auth(Register, true)}/>
                <Route path='/user/edit-post/:id' exact component={Auth(EditReview, true)}/>
                <Route path='/books/:id' exact component={Auth(BookView, null)} />
                <Route path='/user/user-reviews' exact component={Auth(UserPosts, true)}/> */}
            </Switch>
        </Layout>
    );
};

export default Routes;