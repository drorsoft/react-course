import { useEffect } from "react";
import { AppHeader } from "./AppHeader";
import { AppRouter } from "./router/AppRouter";
import { BrowserRouter } from "react-router";

const anotherAsyncFunction = async (): Promise<number> => {
  return 2;
};

function promiseFn(): Promise<number> {
  return new Promise(resolve => {
    anotherAsyncFunction().then(res2 => {
      resolve(2 * res2)
    })
  })
}

async function asyncFuncion(): Promise<number> {
  const firtsResult = await anotherAsyncFunction();
  return firtsResult * 2;
}

export function App() {
  useEffect(() => {
    const promise = new Promise<{ abc: string; arr: any[] }>((resolve) => {
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
