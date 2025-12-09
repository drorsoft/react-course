import { useState } from "react";
import { AppHeader } from "./AppHeader";
import { AppButton } from "./components/button/AppButton";
import { AppLayout } from "./layouts/AppLayout";
import { ServingType } from "./models/ServingType";
import { IceCream } from "./components/IceCreamResult/IceCreamResult";
import { IceCreamTaste } from "./models/IcecreamTaste";
import { IceCreamTopping } from "./models/IcecreamTopping";
import { IcecreamBuilderPage } from "./pages/IcecreamBuilderPage";

export function App() {
  const [cupOrCone, setCupOrCone] = useState(ServingType.Cone);
  const [flavour, setFlavour] = useState("שוקולד");
  const [toppings, setToppings] = useState("שוקולד");

  return (
    <div className={"bg-amber-300 h-screen w-screen text-black text-center"}>
      <AppHeader></AppHeader>
      <IcecreamBuilderPage />
    </div>
  );
}
