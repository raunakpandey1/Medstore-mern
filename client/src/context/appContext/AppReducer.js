const AppReducer = (state, actions) => {
    switch (actions.type) {
        case "EMPTY_STATE":
            return {
                authenticated: false,
                user: null,
                seller: null,
                error: false
            };
        case "FETCH_SUCCESS":
            return {
                authenticated: true,
                user: actions.payload,
                seller: actions.seller,
                error: false
            };
        case "FETCH_FAILED":
            return {
                authenticated: false,
                user: null,
                seller: null,
                error: actions.payload
            };
        default:
            return state;
    }
}
export default AppReducer;