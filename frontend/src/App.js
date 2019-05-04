import React from 'react';
import style from './App.module.scss';
import {Provider} from "react-redux";
import store from "./redux/configureStore";


function App() {
    return (
        <Provider store={store}>
            <div className={style.app}>
                Hello World
            </div>
        </Provider>
    );
}

export default App;
