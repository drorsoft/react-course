import { createContext, useState } from "react";
import { GlobalContext } from "./globalContext";

export const GlobalContextProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)
    const [cart, setCart] = useState([])

    return <GlobalContext.Provider value={{ isAuth, setIsAuth, cart, setCart }}>
        {children}
    </GlobalContext.Provider>
}
