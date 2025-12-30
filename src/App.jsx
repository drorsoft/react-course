import { useEffect,useRef } from "react";
import { AppHeader } from "./AppHeader";
import { IcecreamBuilderPage } from "./pages/IcecreamBuilderPage";
export function App() {
 

  return (
    <div   className={"bg-amber-300 transition-all duration-300  h-screen w-screen text-black text-center"}>
      <AppHeader></AppHeader>
      <IcecreamBuilderPage  />
 
        
    </div>
  );
}
