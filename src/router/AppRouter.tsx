import { HashRouter, Route } from "react-router";
import { BrowserRouter, Routes } from "react-router";
import { App } from "../App";
import { Orders } from "../pages/Orders";
import { IcecreamBuilderPage } from "../pages/IcecreamBuilderPage";
import { Checkout } from "../pages/Checkout";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IcecreamBuilderPage />} />
      <Route path="/orders/:orderId?" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};
