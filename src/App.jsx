import { useState } from "react"
import { IceCreamBuilderPage } from "./pages/IceCreamBuilderPage"
import { GlobalContextProvider } from "./context/globalContextProvider"
import { Router, RouterProvider } from "react-router"
import { routes } from "./router/routes"

export const App = () => {

  return <GlobalContextProvider>
    <RouterProvider router={routes} />
  </GlobalContextProvider >
}

