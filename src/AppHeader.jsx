import { NavLink } from "react-router";

export function AppHeader() {
  return (
    <header className="w-screen bg-pink-300 h-16 flex flex-row justify-center items-center shadow-xl">
      <div className="absolute right-0 pr-6 flex flex-row gap-6 h-16  ">
      
        <NavLink
          className={
            ({isActive})=>
            "bg-amber-200/30   h-full justify-center items-center flex flex-col px-4 " + (isActive ? "font-bold bg-amber-200/80 " : "")
        }
          to={"/"}
        >
          <span>בניית גלידה</span>
        </NavLink>
         <NavLink
          className={
            ({isActive})=>
            "bg-amber-200/30   h-full justify-center items-center flex flex-col px-4 " + (isActive ? "font-bold bg-amber-200/80 " : "")
        } 
          to={"/orders"}>הזמנות</NavLink>
      </div>
      <h1 className="text-lg font-bold">חנות הגלידות שלי</h1>
    </header>
  );
}
