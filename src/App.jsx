import { useEffect,useRef } from "react";
import { AppHeader } from "./AppHeader";
import { IcecreamBuilderPage } from "./pages/IcecreamBuilderPage";
export function App() {
    const inputRef = useRef (null)

 

  return (
    <div   className={"bg-amber-300 transition-all duration-300  h-screen w-screen text-black text-center"}>
      <AppHeader></AppHeader>
      <IcecreamBuilderPage  />
      <div className="w-full flex flex-row justify-center h-12 bg-white">
      <input ref={inputRef}/>
      <button className="bg-amber-800" onClick={()=>getInputValue()}>

        Get input
      </button>
      </div>
        
    </div>
  );
}
