import React from 'react';
import LoginFom from "./presenter";
import PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        facebookLogin: PropTypes.func.isRequired
    };

    state = {
        username: "",
        password: "",
    };

    render() {
        const {username, password} = this.state;
        return (
            <LoginFom username={username} password={password}
                      handleInputChange={this._handleInputChange}
                      handleSubmit={this._handleSubmit}
                      handleFacebookLogin={this._handleFacebookLogin}
            />
        );
    }

    _handleInputChange = event => {
        const {target: {value, name}} = event;
        // const value = event.target.value;
        // const name = event.target.name;
        this.setState({
            [name]: value
        })
    };

    _handleSubmit = event => {
        event.preventDefault();
        //redux action
    };

    _handleFacebookLogin = response => {
        const {facebookLogin} = this.props;
        facebookLogin(response.accessToken);
        //redux action
    }
}

export default Container;
