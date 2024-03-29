import React from 'react';
import ReactDOM from 'react-dom';
// import {BrowserRouter} from "react-router-dom";
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from "./redux/configureStore";
import {Provider} from "react-redux";
import I18n from 'redux-i18n'
import {translations} from "./translations";
import App from "./components/App";

ReactDOM.render(
    <Provider store={store()}>
        <I18n translations={translations} initialLang="en" fallbackLang="en">
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </I18n>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
