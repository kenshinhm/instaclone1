import React from 'react';
import Feed from "./presenter";
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        getFeed: PropTypes.func.isRequired
    };

    state = {
        loading: true
    };

    componentDidMount() {
        const {getFeed} = this.props;
        if (this.props.feed) {
            this.setState({
                loading: false,
            })
        } else {
            getFeed();
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.feed) {
            this.setState({
                loading: false,
            })
        }
    }

    render() {
        const {feed} = this.props;
        return (
            <Feed {...this.state} feed={feed}/>
        );
    }
}

export default Container;
