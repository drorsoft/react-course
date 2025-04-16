import { BrowserRouter, createBrowserRouter, Route } from "react-router";
import { IceCreamBuilderPage } from "../pages/IceCreamBuilderPage";

import { Routes } from "react-router";
import { Orders } from "../pages/Orders";
import { Order } from "../pages/Order";
import { ProtectedRoute } from "./ProtectedRoute";
import { useContext } from "react";
import { GlobalContext } from "../context/globalContext";
import { Checkout } from "../pages/Checkout";
import { AllPosts } from "../examples/AllPosts";
import { Post } from "../examples/Post";

export const AppRoutes = () => {
    const { isAuth } = useContext(GlobalContext);
    return (
        <Routes>
            <Route path="/" element={<IceCreamBuilderPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/requests" element={<AllPosts />} />
            <Route path="/post/:postId" element={<Post />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={
                <ProtectedRoute isAllowed={isAuth}>
                    <Order />
                </ProtectedRoute>} />
        </Routes>)
}