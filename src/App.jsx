import { useState } from "react"
import { IceCreamBuilderPage } from "./pages/IceCreamBuilderPage"

export const App = () => {
  const [isUserAuth, setIsUserAuth] = useState(true)
  return <IceCreamBuilderPage isUserAuth={isUserAuth} />
}

