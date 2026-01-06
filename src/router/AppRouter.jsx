import { HashRouter, Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import { App } from "../App";
import { Orders } from "../pages/Orders";
import { IcecreamBuilderPage } from "../pages/IcecreamBuilderPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IcecreamBuilderPage />} />
      <Route path="/orders/:orderId?" element={<Orders />} />
      <Route path="try" element={<div>This is my try route</div>} />
    </Routes>
  );
};
