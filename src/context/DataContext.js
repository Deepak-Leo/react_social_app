import { createContext,useState,useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";

const DataContext=createContext({})

export const DataProvider = ({children})=>{

    const {width}=useWindowSize();

    return(
        <DataContext.Provider value={{
            width
        }}>{children}</DataContext.Provider>
    )
}
export default DataContext