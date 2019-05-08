import React from 'react';
import SignupForm from "./presenter";
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired,
        createAccount: PropTypes.func.isRequired,
    };

    state = {
        email: "",
        name: "",
        username: "",
        password: "",
    };

    render() {
        const {email, name, username, password} = this.state;

        return (
            <SignupForm email={email} name={name} username={username} password={password}
                        onChange={this._onChange} onSubmit={this._onSubmit} facebookLogin={this._facebookLogin}/>
        );
    }

    _onChange = event => {
        const {target: {name, value}} = event;
        this.setState({
            [name]: value
        })
    };

    _onSubmit = event => {
        event.preventDefault();
        const {username, password, email, name} = this.state;
        const {createAccount} = this.props;
        createAccount(username, password, email, name);
    };

    _facebookLogin = response => {
        //redux action
        const {facebookLogin} = this.props;
        facebookLogin(response.accessToken);
    }

}

export default Container;
