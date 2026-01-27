import { useEffect, useRef } from "react";
import { AppHeader } from "./AppHeader";
import { IcecreamBuilderPage } from "./pages/IcecreamBuilderPage";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";
export function App() {
  useEffect(() => {
    fetch("http://api.open-notify.org/iss-now.json").then((response) => {
       response.json().then((json) => {
        console.log(json);
      });
    });
  }, []);

  return (
    <div
      className={
        "bg-amber-300 transition-all duration-300  h-screen w-screen text-black text-center"
      }
    >
      <BrowserRouter>
        <AppHeader></AppHeader>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}
