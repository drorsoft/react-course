import { Link, NavLink } from "react-router";

export function AppHeader() {
    return (<nav className="relative flex flex-row justify-center bg-background-accent">
        <h1 className=
            " m-0  rounded p-2  font-bold"
        > גלידה מהאגדות</h1>
        <div id="nav-buttons-container" className="text-sm absolute right-0 h-full flex flex-row ">
            <NavLink to={"/"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>בניית גלידה
            </NavLink>
            <NavLink to={"/checkout"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>הזמנה
            </NavLink>
            <NavLink to={"/orders-history"} className={({ isActive }) => `text-xs p-3 ${isActive ? 'bg-button-accent' : ' '} flex flex-row items-center justify-center h-full `}>הסטורית הזמנות
            </NavLink>


        </div>
    </nav >)
}