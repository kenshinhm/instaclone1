import React from 'react';
import LoginFom from "./presenter";

class Container extends React.Component {

    state = {
        username: "",
        password: "",
    };

    render() {
        const {username, password} = this.state;
        return (
            <LoginFom username={username} password={password}
                      handleInputChange={this._handleInputChange}
                      handleSubmit={this._handleSubmit}/>
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
}

export default Container;
