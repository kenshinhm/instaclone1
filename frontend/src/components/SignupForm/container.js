import React from 'react';
import SignupForm from "./presenter";

class Container extends React.Component {

    state = {
        email: "",
        fullname: "",
        username: "",
        password: "",
    };

    render() {
        const {email, fullname, username, password} = this.state;

        return (
            <SignupForm email={email} fullname={fullname} username={username} password={password}
                        onChange={this._onChange} onSubmit={this._onSubmit}/>
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
        console.log(this.state);
    };

}

export default Container;
