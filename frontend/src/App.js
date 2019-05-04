import React from 'react';
import {Link, Route} from "react-router-dom";

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
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/contacts'>Contacts</Link></li>
                </ul>
            </nav>
            <Route exact={true} path='/' component={Welcome}/>
            <Route path='/contacts' component={Contacts}/>
        </header>
    );
};

const Welcome = () => <h1>Welcome to the best contact app!</h1>;

const Contacts = ({match}) => (
    <div>
        <ul>
            <li><Link to='/contacts/lynn'>lynn</Link></li>
            <li><Link to='/contacts/mike'>mike</Link></li>
        </ul>
        <Route exact={true} path={`${match.path}`} render={() => <h3>select a contact}</h3>}/>
        <Route path={`${match.path}/:contactName`} component={Contact}/>
    </div>
);

const Contact = ({match}) => (`your friend name is ${match.params.contactName}`);

export default App;
