import React from 'react';
import * as PropTypes from "prop-types";
import CommentBox from "./presenter";

class Container extends React.Component {

    state = {
        comment: ""
    };

    render() {
        return <CommentBox {...this.state}
                           handleInputChange={this._handleInputChange}
                           handleKeyPress={this._handleKeyPress}/>;
    }

    _handleInputChange = (event) => {
        const {target: {value}} = event;
        this.setState({
            comment: value
        });
    };

    _handleKeyPress = event => {
        const {submitComment} = this.props;
        const {comment} = this.state;
        const {key} = event;
        if (key === "Enter") {
            event.preventDefault();
            this.setState({
                comment: ""
            });
            submitComment(comment);
        }
    };

}

export default Container;
