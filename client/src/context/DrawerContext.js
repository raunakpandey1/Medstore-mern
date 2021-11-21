import { createContext, useReducer} from "react";

const isOpen = false;
const reducer = (state, action)=>{
    switch(action){
        case 'setOpen':
            return !state;
        default:
            return !state;
    }
}
const DrawerContext = createContext(isOpen);
const DrawerContextProvider = ({children})=>{
    const [state, opendispatch] = useReducer(reducer, isOpen);

    const setOpen = ()=>{
        opendispatch('setOpen');
    }
    return (
        <DrawerContext.Provider
        value={{
            isOpen: state, 
            setOpen}}>
            {children}
        </DrawerContext.Provider>
    )
}

export default DrawerContext;
export {DrawerContextProvider};