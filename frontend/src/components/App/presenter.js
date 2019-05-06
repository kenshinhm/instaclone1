import React from 'react';
import {Route, Switch} from "react-router-dom";
import './styles.scss';
import Footer from "../Footer";
import PropTypes from "prop-types";
import Auth from "../Auth";


const App = props => [
    //Nav
    props.isLoggedIn ? <PrivateRoutes key={2}/> : <PublicRoutes key={2}/>,
    <Footer key={3}/>
];

App.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const PrivateRoutes = props => (
    <Switch>
        <Route exact path='/' render={() => "feed"}/>
        <Route exact path='/explore' render={() => "explore"}/>
    </Switch>
);

const PublicRoutes = props => (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route exact path='/forgot' render={() => "password"}/>
    </Switch>
);

export default App;
