import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {routerMiddleware, connectRouter} from 'connected-react-router';
import {composeWithDevTools} from "redux-devtools-extension";
import {i18nState} from "redux-i18n";
import photos from "./modules/photos";
import user from "./modules/user";

const env = process.env.NODE_ENV;

const history = createBrowserHistory();

const middleware = [thunk, routerMiddleware(history)];

if (env === 'development') {
    const {logger} = require('redux-logger');
    middleware.push(logger)
}

const reducer = combineReducers({
    user,
    photos,
    router: connectRouter(history),
    i18nState
});

let store;
if (env === 'development') {
    store = initialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));
} else {
    store = initialState => createStore(reducer, applyMiddleware(...middleware));
}


export {history};
export default store;