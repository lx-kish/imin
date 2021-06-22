import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUserAuth } from './redux/auth/auth.actions';

import Routes from './routes';

const App = (props) => {
  
  // checking authentification before the app launch
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
