import React from 'react';
import * as PropTypes from "prop-types";
import CommentBox from "components/CommentBox/presenter.js";

class Container extends React.Component {

    state = {
        comment: ""
    };

    render() {
        return <CommentBox {...this.state}
                           {...this.props}
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
        const {key} = event;
        const {submitComment} = this.props;
        const {comment} = this.state;
        if (key === "Enter") {
            event.preventDefault();
            submitComment(comment);
        }
    };
}

export default Container;
