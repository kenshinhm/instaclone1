import {connect} from 'react-redux';
import Container from "./container";
import {actionCreators as photoAction} from 'redux/modules/photos.js';

// const mapStateToProps = (state, ownProps) => {
//     const {photos: {feed}} = state;
//     return {
//         feed
//     }
// };
//
const mapDispatchToProps = (dispatch, ownProps) => {
    // console.log(ownProps);

    return {
        handleHeartClick: () => {
            if (ownProps.isLiked) {
                dispatch(photoAction.unlikePhoto(ownProps.photoId));
            } else {
                dispatch(photoAction.likePhoto(ownProps.photoId));
            }
        }
    };
};

export default connect(null, mapDispatchToProps)(Container);