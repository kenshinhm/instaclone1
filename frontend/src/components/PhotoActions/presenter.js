import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import Ionicon from 'react-ionicons';

const PhotoActions = (props, context) => (
    <div className={styles.actions}>
        <div className={styles.icons}>
            <span className={styles.icon}>
                <Ionicon icon='ios-heart-outline' fontSize='24px' color='black'/>
            </span>
            <span className={styles.icon}>
                <Ionicon icon='ios-text-outline' fontSize='24px' color='black'/>
            </span>
        </div>
        <span className={styles.likes}>
            {props.number} {props.number === 1 ? context.t("like") : context.t("likes")}
        </span>
    </div>
);

PhotoActions.contextTypes = {
    t: PropTypes.func.isRequired
};

PhotoActions.propTypes = {
    number: PropTypes.number.isRequired
};

export default PhotoActions;
