import React from 'react';
import Navigation from "./presenter";
import PropTypes from "prop-types";

class Container extends React.Component {
    static propTypes = {
        goToSearch: PropTypes.func.isRequired,
    };

    state = {
        term: ""
    };

    render() {
        return (
            <Navigation value={this.state.term}
                        onSubmit={this._onSubmit}
                        onInputChange={this._onInputChange}/>
        );
    }

    _onInputChange = (event) => {
        const {target: {value}} = event;
        this.setState({
            term: value
        });
    };

    _onSubmit = (event) => {
        const {goToSearch} = this.props;
        const {term} = this.state;
        event.preventDefault();
        this.setState({
            term: ""
        });
        goToSearch(term);
    };
}

export default Container;
