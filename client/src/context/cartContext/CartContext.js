import { createContext, useReducer } from "react"
import CartReducer from "./CartReducer";

const INITIAL_STATE = {
    items: []
}

export const CartContext = createContext(INITIAL_STATE);

export const CartContextProvider = ({children}) => {
    const [state, cartDispatch] = useReducer(CartReducer, INITIAL_STATE);
    return (
        <CartContext.Provider
            value={{
                items: state.items,
                cartDispatch
            }}>
                {children}
        </CartContext.Provider>
    )
}