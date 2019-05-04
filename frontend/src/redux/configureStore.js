import {combineReducers, createStore} from "redux";
import users from "./modules/users";

const reducer = combineReducers({
    users,
});

let store = () => createStore(reducer);

export default store();