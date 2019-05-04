import React from 'react';
import {Route} from "react-router-dom";

function App() {
    return (
        <div>
            <Header/>
        </div>
    );
}

const Header = () => {
    return (
        <header>
            <h1>My Contacts</h1>
            <Route exact={true} path='/' component={Welcome}/>
            <Route path='/contacts' component={Contacts}/>
        </header>
    );
};

const Welcome = () => <h1>Welcome to the best contact app!</h1>;

const Contacts = () => (
    <ul>
        <li>Lynn</li>
        <li>Jisu</li>
        <li>Japan</li>
    </ul>
);

export default App;
