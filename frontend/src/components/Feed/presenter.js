import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import Loading from "components/Loading";
import FeedPhoto from "components/FeedPhoto";

const Feed = (props) => {
    if (props.loading) {
        return <LoadingFeed/>
    } else if (props.feed) {
        return <RenderFeed feed={props.feed}/>
    }
};

const LoadingFeed = () => (
    <div className={styles.feed}>
        <Loading/>
    </div>
);

const RenderFeed = ({feed}) => (
    <div className={styles.feed}>
        {feed.map(photo => <FeedPhoto {...photo} key={photo.id}/>)}
    </div>
);

Feed.propTypes = {
    loading: PropTypes.bool.isRequired
};

export default Feed;
