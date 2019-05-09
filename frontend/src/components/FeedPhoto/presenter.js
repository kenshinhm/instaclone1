import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import PhotoActions from "components/PhotoActions";

const FeedPhoto = (props, context) => {
    console.log(props);
    return (
        <div className={styles.feedPhoto}>
            <header>
                <img src={props.creator.profile_image || require("images/noPhoto.jpg")}
                     alt={props.creator.username}/>
                <div>
                    <span>{props.creator.username}</span>
                    <span>{props.location}</span>
                </div>
            </header>
            <img src={props.file} alt={props.caption}/>
            <div>
                <PhotoActions number={props.like_count}/>
            </div>
        </div>
    );
};

FeedPhoto.propTypes = {
    creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,

    location: PropTypes.string.isRequired,

    file: PropTypes.string.isRequired,

    like_count: PropTypes.number.isRequired,

    caption: PropTypes.string.isRequired,

    comments: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            creator: PropTypes.shape({
                profile_image: PropTypes.string,
                username: PropTypes.string.isRequired
            }).isRequired,
        })
    ).isRequired,

    create_time: PropTypes.string.isRequired,
};

export default FeedPhoto;