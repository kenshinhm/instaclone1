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
        getFeed();
    }


    render() {
        return (
            <Feed {...this.state}/>
        );
    }
}

export default Container;
