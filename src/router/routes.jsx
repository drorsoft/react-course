import { BrowserRouter, createBrowserRouter, Route } from "react-router";
import { IceCreamBuilderPage } from "../pages/IceCreamBuilderPage";
import { About } from "../pages/About";
import { Routes } from "react-router";

export const AppRoutes = () => {
    return <Routes>
        <Route path="/" element={<IceCreamBuilderPage />} />
        <Route path="/about" element={<About />} />
    </Routes>

}