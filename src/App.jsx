import { useState } from "react"
import { IceCreamBuilderPage } from "./pages/IceCreamBuilderPage"
import { GlobalContextProvider } from "./context/globalContextProvider"

export const App = () => {

  return <GlobalContextProvider>
    <IceCreamBuilderPage />
  </GlobalContextProvider >
}

