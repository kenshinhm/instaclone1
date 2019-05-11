import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";

const CommentBox = (props, context) => (
    <form className={styles.commentBox}>
        <Textarea className={styles.input}
                  placeholder={context.t("Add a comment..")}
                  values={props.comment}
                  onChange={props.handleInputChange}
                  onKeyPress={props.handleKeyPress}/>
    </form>
);

CommentBox.contextTypes = {
    t: PropTypes.func.isRequired
};

CommentBox.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleKeyPress: PropTypes.func.isRequired,
    comment: PropTypes.string.isRequired,
};

export default CommentBox;