import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import './index.scss';

import store from './redux/store';

import Routes from './routes';

ReactDOM.render(
  <Provider store={store} >
    <App />
    {/* <BrowserRouter>
      <Routes />
    </BrowserRouter> */}
  </Provider>,
  document.getElementById('root')
);