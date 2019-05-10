import React from 'react';
import styles from './styles.scss';
import PropTypes from "prop-types";
import Textarea from "react-textarea-autosize";

const CommentBox = (props, context) => (
    <form>
        <Textarea placeholder={context.t("Add a comment..")}>

        </Textarea>
    </form>
);

CommentBox.contextTypes = {
    t: PropTypes.func.isRequired
};

export default CommentBox;