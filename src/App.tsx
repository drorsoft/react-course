import { useEffect, useRef } from "react";
import { AppHeader } from "./AppHeader";
import { IcecreamBuilderPage } from "./pages/IcecreamBuilderPage";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";

const anotherAsyncFunction = async () => {
  return 2;
};
function promiseFn () {
  return new Promise (resolve=> {
    anotherAsyncFunction().then (res2=> {
     resolve (2 *res2 )  
    })
  })
}
async function asyncFuncion() {
  const firtsResult = await anotherAsyncFunction();
  return firtsResult * 2;
}
export function App() {
  useEffect(() => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ abc: "this is resolved 🙂", arr: [] });
      }, 3000);
    });

    asyncFuncion().then((r) => console.log(r));
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
