import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    latitude: null,
    longitude: null
}
const AddReducer = (state, actions) => {
    switch (actions.type) {
        case "EMPTY_ADDRESS":
            return {
                latitude: null,
                longitude: null
            };
        case "UPDATE_ADDRESS":
            return {
                latitude: actions.payload.latitude,
                longitude: actions.payload.longitude
            };
        default:
            return state;
    }
}

export const AddContext = createContext(INITIAL_STATE);

export const AddContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AddReducer, INITIAL_STATE);
    return (
        <AddContext.Provider
            value={{
                latitude: state.latitude,
                longitude: state.longitude,
                dispatch,
            }}>
            {children}
        </AddContext.Provider>
    )
}