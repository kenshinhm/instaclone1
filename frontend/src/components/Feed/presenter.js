import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import Loading from "components/Loading";

const Feed = (props) => {
    if (props.loading) {
        return <LoadingFeed/>
    } else {
        return "Feed";
    }
};

const LoadingFeed = props => (
    <div className={styles.feed}>
        <Loading/>
    </div>
);

Feed.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Feed;
