import { createBrowserRouter } from "react-router";
import { IceCreamBuilderPage } from "../pages/IceCreamBuilderPage";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: IceCreamBuilderPage,
    },
]);