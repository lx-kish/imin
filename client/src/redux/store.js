import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from './root-reducer';

const middlewares = [
    promiseMiddleware,
    ReduxThunk
];

if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
}

// applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middlewares),
    ),
    // applyMiddleware(...middlewares)
);

export default store;