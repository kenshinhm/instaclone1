import {applyMiddleware, combineReducers, createStore} from "redux";
import users from "./modules/users";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {routerMiddleware, connectRouter} from 'connected-react-router';

const env = process.env.NODE_ENV;

const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (env === 'development') {
    const {logger} = require('redux-logger');
    middleware.push(logger)
}

const reducer = combineReducers({
    users,
    router: connectRouter(history),
});

let store = initialState =>
    createStore(reducer, applyMiddleware(...middleware));

export {history};
export default store;