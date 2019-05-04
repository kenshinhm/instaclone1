import {applyMiddleware, combineReducers, createStore} from "redux";
import users from "./modules/users";
import thunk from "redux-thunk";

const env = process.env.NODE_ENV;

const middlewares = [thunk];

if (env === 'development') {
    const {logger} = require('redux-logger');
    middlewares.push(logger)
}

const reducer = combineReducers({
    users,
});

let store = initialState =>
    createStore(reducer, applyMiddleware(...middlewares));

export default store();