import React from 'react';

import NavigationBar from '../../components/navigation/navigation-bar/navigation-bar.component';
import Footer from '../../components/footer/footer.component';

const Layout = props => {

    return (
        <>
            {/* <NavigationBar /> */}
            <>
                {props.children}
            </>
            <Footer />
        </>
    );
};

export default Layout;