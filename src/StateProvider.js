import React, { createContext, useContext, useReducer } from "react";

//prepare data layer
export const StateContext = createContext();

//wrap our app and provide datalayer to every component
export const StateProvider = ({reducer, initialState, children}) => {
    return(
         <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
   
};

//pull info from the datalayer
export const useStateValue =  () => useContext(StateContext);
