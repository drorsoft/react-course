import { useEffect, useMemo, useRef, useState } from "react";

import "./IceCreamResult.css";
import { Toppings } from "./IceResultVisualToppings";
import { IceCreamTaste } from "../../models/IcecreamTaste";

export const IceCreamResult = ({ serveType, taste, topping }) => { 
    const [top, setTop] = useState(0)

    setTimeout (()=>{
        setTop(1)
    }, 1000)

  const memoToppings = useMemo(() => <Toppings topping={topping} />, [topping]);

  const scoopColor = (taste) => {
    switch (taste) {
      case IceCreamTaste.Chocolate:
        return "#704b03";
      case IceCreamTaste.Vanilla:
        return "#fffdf7";
      case IceCreamTaste.Strawberry:
        return "#FA5053";
      default:
        return "#fffdf7";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {taste ? (
        <div
          id="ice-cream-scoop"
          className={`bg-amber-400 ${ top === 0 ? 'top-14' : 'top-8'} duration-150  transition-all  w-22 h-22 rounded-full relative  ring-1 ring-slate-400  `}
          style={{ backgroundColor: scoopColor(taste) }}
        >
          {memoToppings} 
        </div>
      ) : null}

      <div className={serveType === "cone" ? "cone" : "cup"}></div>
    </div>
  );
};
