const CartReducer = (state, actions) => {
    switch (actions.type) {
        case "SET_ITEMS":
            return {
                items: actions.payload,
            };
        case "EDIT_ITEMS":
            return {
                items: actions.payload,
            };
        default:
            return state;
    }
}
export default CartReducer;