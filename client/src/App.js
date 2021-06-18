import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUserAuth } from './redux/auth/auth.actions';

import Routes from './routes';

const App = (props) => {
  
  // authentification check before launch the app
  const { checkUserAuth } = props;

  checkUserAuth();

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

const mapReduxDispatchToProps = dispatch => ({
	checkUserAuth: () => dispatch(fetchUserAuth(dispatch)),
});

export default connect(
  null,
  mapReduxDispatchToProps,
)(App);
