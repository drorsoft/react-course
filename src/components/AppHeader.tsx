import { Link, NavLink } from "react-router";

export function AppHeader() {
    return (<nav className="relative flex flex-row justify-center bg-background-accent">
        <h1 className=
            " m-0  rounded p-2  font-bold"
        > גלידה מהאגדות</h1>
        <div id="nav-buttons-container" className="text-sm absolute right-0 h-full flex flex-row ">
            <NavLink to={"/as"} className="text-xs p-3 bg-amber-400 flex flex-row items-center justify-center h-full ">בניית גלידה
            </NavLink>

            <a href="#ice-cream-builder " className="text-xs p-3 bg-amber-400 flex flex-row items-center justify-center h-full ">בניית גלידה</a>

            {/* <a href="#orders" className="p-3  h-full flex flex-row items-center justify-center">הזמנות</a> */}

        </div>
    </nav >)
}