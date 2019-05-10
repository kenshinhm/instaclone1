import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";

const CommentBox = (props, context) => (
    <form>
        <textarea placeholder={context.t("Add a comment..")}>

        </textarea>
    </form>
);

CommentBox.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CommentBox;