import { useState } from 'react' 
import { AppHeader } from './AppHeader'
import { IceCreamResult } from './components/IceCreamResult'
import { AppButton } from './components/button/AppButton'
import { AppLayout } from './layouts/AppLayout'
 
 
export function App() {
 
  const [cupOrCone, setCupOrCone] = useState("cone")
  
  const [flavour, setFlavour] = useState("שוקולד")



  return (
    <div className={'bg-white h-screen w-screen text-black'}>  
    <AppHeader></AppHeader>
    <IceCreamResult   cupOrCone={cupOrCone}>

    </IceCreamResult>
  
      <AppButton  onClick={() =>  setCupOrCone("cup")}>
         ספל
      </AppButton>
      <AppButton onClick={() =>  setCupOrCone("cone")}>
          גביע
      </AppButton>
      <p>
        הגשה ב
        {cupOrCone === "cone" ? "גביע": "ספל" }
      </p>
        <button onClick={() =>  setFlavour("שוקולד")}>
        שוקולד
        </button>
      <button onClick={() =>  setFlavour("וניל")}>
        וניל
      </button>
          <button onClick={() =>  setFlavour("תות")}>
        תות
      </button>
      <p>

       גלידה בטעם

        {flavour}
      </p>
 
    </div>
  )
}


