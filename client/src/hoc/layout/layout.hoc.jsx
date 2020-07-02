import React from 'react';
import NavigationBar from '../../components/navigation/navigation-bar/navigation-bar.component';
import Footer from '../../components/footer/footer.component';

const Layout = props => {
    return (
        <React.Fragment>
            <NavigationBar />
            <React.Fragment>
                {props.children}
            </React.Fragment>
            <Footer />
        </React.Fragment>
    );
};

export default Layout;