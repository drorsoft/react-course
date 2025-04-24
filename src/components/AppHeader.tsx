import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { GlobalContext } from "../context/globalContext";

export function AppHeader() {

    const { cart } = useContext(GlobalContext)

    return (
        <nav className="relative flex flex-col items-stretch   justify-center bg-background-accent sm:flex-row sm:items-center sm:p-0  shadow ">
            <h1 className="m-0 rounded p-2 font-bold text-lg text-center sm:text-base sm:text-right sm:m-2">
                גלידה מהאגדות
            </h1>
            <div
                id="nav-buttons-container"
                className="text-sm static flex flex-row w-full gap-1 items-stretch justify-start sm:absolute sm:right-0 sm:h-full sm:flex-row sm:w-auto sm:gap-0 sm:items-center sm:justify-center p-0"
            >
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        `text-base p-2 w-full text-center ${isActive ? 'bg-button-accent' : ''} flex flex-row items-center justify-center sm:text-xs sm:w-auto sm:p-3 sm:h-full`
                    }
                >
                    בניית גלידה
                </NavLink>
                <NavLink
                    to={"/checkout"}
                    className={({ isActive }) =>
                        `text-base p-2 w-full text-center ${isActive ? 'bg-button-accent' : ''} flex flex-row items-center justify-center sm:text-xs sm:w-auto sm:p-3 sm:h-full`
                    }
                >
                    הזמנה
                    {cart.length > 0 ? ` (${cart.length})` : null}
                </NavLink>
                <NavLink
                    to={"/orders-history"}
                    className={({ isActive }) =>
                        `text-base p-2 w-full text-center ${isActive ? 'bg-button-accent' : ''} flex flex-row items-center justify-center sm:text-xs sm:w-auto sm:p-3 sm:h-full`
                    }
                >
                    הסטורית הזמנות
                </NavLink>
            </div>
        </nav>
    )
}