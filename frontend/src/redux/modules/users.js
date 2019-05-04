// initial state

const initialState = {
    isLoggedIn: localStorage.getItem("jst") || false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;