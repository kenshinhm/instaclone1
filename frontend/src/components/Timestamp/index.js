import React from 'react';
import PropTypes from 'prop-types';
import styles from "./styles.scss";

const Timestamp = (props, context) => props.time;

Timestamp.propTypes = {
    time: PropTypes.string.isRequired
};

export default Timestamp;




