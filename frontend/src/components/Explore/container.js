import React from 'react';
import Explore from "./presenter";
import * as PropTypes from "prop-types";

class Container extends React.Component {

    static propTypes = {
        getExplore: PropTypes.func.isRequired,
        userList: PropTypes.array
    };

    state = {
        loading: true
    };

    componentDidMount() {
        const {getExplore} = this.props;
        if (this.props.userList) {
            this.setState({
                loading: false,
            });
        } else {
            getExplore();
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.userList) {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const {userList} = this.props;
        return (
            <Explore {...this.state} userList={userList}/>
        );
    }
}

export default Container;
