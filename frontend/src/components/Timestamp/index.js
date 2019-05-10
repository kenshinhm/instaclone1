import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.scss";

const Timestamp = (props, context) => (
    <span className={styles.time}>{props.time}</span>
);

Timestamp.propTypes = {
    time: PropTypes.string.isRequired
};

export default Timestamp;




