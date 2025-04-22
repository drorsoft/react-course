import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { GlobalContext } from "../context/globalContext";

export function AppHeader() {

    const { cart } = useContext(GlobalContext)

    return (<nav className="relative flex flex-row justify-center bg-background-accent">
        <h1 className=
            " m-0  rounded p-2  font-bold"
        > גלידה מהאגדות</h1>
        <div id="nav-buttons-container" className="text-sm absolute right-0 h-full flex flex-row ">
            <NavLink to={"/"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>בניית גלידה
            </NavLink>
            <NavLink to={"/checkout"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>הזמנה
                {cart.length > 0 ? ` (${cart.length})` : null}
            </NavLink>
            <NavLink to={"/orders-history"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>הסטורית הזמנות
            </NavLink>


        </div>
    </nav >)
}