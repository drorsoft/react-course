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
    <AppLayout/>
    <AppHeader></AppHeader>
    <IceCreamResult anotherProp={"abc123"} cupOrCone={cupOrCone}>

    </IceCreamResult>
  
      <AppButton      onClick={() =>  setCupOrCone("cup")}>
         ספל
      </AppButton>
      <button onClick={() =>  setCupOrCone("cone")}>
          גביע
      </button>
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


      <div className="card">
      
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}


