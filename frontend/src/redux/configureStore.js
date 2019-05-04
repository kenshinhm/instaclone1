import {applyMiddleware, combineReducers, createStore} from "redux";
import users from "./modules/users";
import thunk from "redux-thunk";

const middlewares = [thunk];

const reducer = combineReducers({
    users,
});

let store = () => createStore(reducer, applyMiddleware(...middlewares));

export default store();