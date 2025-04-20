import { createContext } from "react";

export const GlobalContext = createContext({ isAuth: false, setIsAuth: (value) => { }, cart: [], setCart: (value) => { } });