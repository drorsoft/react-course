import { createContext, useState } from "react";
import { GlobalContext } from "./globalContext";

export const GlobalContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

    return <GlobalContext.Provider value={{ isAuth, setIsAuth }}>
        {children}
    </GlobalContext.Provider>
}