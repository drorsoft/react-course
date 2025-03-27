import { useState } from "react"
import { IceCreamBuilderPage } from "./pages/IceCreamBuilderPage"
import { GlobalContextProvider } from "./context/globalContextProvider"
import { BrowserRouter, Outlet, Router, RouterProvider } from "react-router"
import { AppRoutes } from "./router/routes"
import { Layout } from "./layout/Layout"

export const App = () => {

  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>

    </GlobalContextProvider >)
}

