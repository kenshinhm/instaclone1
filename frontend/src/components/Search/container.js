import React, {Component} from "react";
import PropTypes from "prop-types";
import Search from "./presenter";

class Container extends Component {
    static propTypes = {
        searchByTerm: PropTypes.func.isRequired,
        userList: PropTypes.array,
        imageList: PropTypes.array
    };
    state = {
        loading: true
    };

    componentDidMount() {
        const {searchByTerm} = this.props;
        searchByTerm();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {searchByTerm} = this.props;
        if (prevProps.match.params !== this.props.match.params) {
            searchByTerm();
        }
    }

    componentWillReceiveProps = nextProps => {
        const {searchByTerm, pathname} = this.props;
        if (nextProps.userList && nextProps.imageList) {
            this.setState({
                loading: false
            });
        }
        // if (nextProps.match = == this.props.match) {
        //   searchByTerm();
        // }
        // if (nextProps.pathname !== pathname) {
        //     searchByTerm();
        // }
    };

    render() {
        const {userList, imageList} = this.props;
        return (
            <Search {...this.state} userList={userList} imageList={imageList}/>
        );
    }
}

export default Container;