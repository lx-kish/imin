import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [
    logger,
    promiseMiddleware,
    ReduxThunk
];

// applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;