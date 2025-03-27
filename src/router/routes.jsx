import { BrowserRouter, createBrowserRouter, Route } from "react-router";
import { IceCreamBuilderPage } from "../pages/IceCreamBuilderPage";

import { Routes } from "react-router";
import { Orders } from "../pages/Orders";
import { Order } from "../pages/Order";
import { ProtectedRoute } from "./ProtectedRoute";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";

export const AppRoutes = () => {
    const { isAuth } = useContext(GlobalContext);
    return <Routes>
        <Route path="/" element={<IceCreamBuilderPage />} />
        <Route path="/orders" element={<Orders />} />
        <ProtectedRoute isAllowed={isAuth}>
            <Route path="/order/:orderId" element={<Order />} />
        </ProtectedRoute>
    </Routes>

}