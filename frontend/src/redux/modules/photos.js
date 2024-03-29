//imports
import {actionCreators as userActions} from "redux/modules/user";

//actions
const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";
const ADD_COMMENT = "ADD_COMMENT";

//action creators
function feedAction(feed) {
    return {
        type: SET_FEED,
        feed
    };
}

function likePhotoAction(photoId) {
    return {
        type: LIKE_PHOTO,
        photoId
    };
}

function unlikePhotoAction(photoId) {
    return {
        type: UNLIKE_PHOTO,
        photoId
    };
}

function addComment(photoId, comment) {
    return {
        type: ADD_COMMENT,
        photoId,
        comment
    };
}

//api actions
function likePhoto(photoId) {
    return (dispatch, getState) => {
        //optimistic update before fetch
        dispatch(likePhotoAction(photoId));
        //api
        console.log(getState());
        const {user: {token}} = getState();
        fetch(`/images/${photoId}/likes/`, {
            method: "POST",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    dispatch(userActions.logout());
                } else if (!response.ok) {
                    dispatch(unlikePhotoAction(photoId));
                }
            });
    };
}

function unlikePhoto(photoId) {
    return (dispatch, getState) => {
        //optimistic update before fetch
        dispatch(unlikePhotoAction(photoId));
        //api
        const {user: {token}} = getState();
        fetch(`/images/${photoId}/unlikes/`, {
            method: "DELETE",
            headers: {
                Authorization: `JWT ${token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    dispatch(userActions.logout());
                } else if (!response.ok) {
                    dispatch(likePhotoAction(photoId));
                }
            });
    };
}

function getFeed() {
    return (dispatch, getState) => {
        const {user: {token}} = getState();
        fetch("/images/", {
            headers: {
                "Authorization": `JWT ${token}`
            }
        })
            .then(response => {
                if (response.status === 401) {
                    dispatch(userActions.logout());
                }
                return response.json();
            })
            .then(json => dispatch(feedAction(json)))
            .catch(err => console.log(err));
    };
}

function commentPhoto(photoId, message) {
    // console.log(JSON.stringify({message}));
    return (dispatch, getState) => {
        const {user: {token}} = getState();
        fetch(`/images/${photoId}/comment/`, {
            method: "POST",
            headers: {
                "Authorization": `JWT ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message
            })
        })
            .then(response => {
                if (response.status === 401) {
                    dispatch(userActions.logout());
                }
                return response.json();
            })
            .then(json => {
                if (json.message) {
                    dispatch(addComment(photoId, json));
                }
            })
            .catch(err => console.log(err));
    };

}

//initial state
const initialState = {};

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        case LIKE_PHOTO:
            return applyLikePhoto(state, action);
        case UNLIKE_PHOTO:
            return applyUnlikePhoto(state, action);
        case ADD_COMMENT:
            return applyAddComment(state, action);
        default:
            return state;
    }

}

//reducer functions
function applySetFeed(state, action) {
    const {feed} = action;
    return {
        ...state,
        feed
    };
}

function applyLikePhoto(state, action) {
    const {photoId} = action;
    const {feed} = state;
    const updateFeed = feed.map(photo => {
        if (photo.id === photoId) {
            return {...photo, is_liked: true, like_count: photo.like_count + 1};
        } else {
            return {...photo};
        }
    });
    return {...state, feed: updateFeed};
}

function applyUnlikePhoto(state, action) {
    const {photoId} = action;
    const {feed} = state;
    const updateFeed = feed.map(photo => {
        if (photo.id === photoId) {
            return {...photo, is_liked: false, like_count: photo.like_count - 1};
        } else {
            return {...photo};
        }
    });
    return {...state, feed: updateFeed};
}

function applyAddComment(state, action) {
    const {photoId, comment} = action;
    const {feed} = state;

    const updateFeed = feed.map(photo => {
        if (photo.id === photoId) {
            return {
                ...photo,
                comments: [...photo.comments, comment]
            };
        } else {
            return {...photo};
        }
    });
    return {...state, feed: updateFeed};
}


//exports
const actionCreators = {
    getFeed,
    likePhoto,
    unlikePhoto,
    commentPhoto
};

export {actionCreators};

//default reducer export
export default reducer;



