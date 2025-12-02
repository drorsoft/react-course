import { useState } from 'react' 
import { AppHeader } from './AppHeader'
import { IceCreamResult } from './components/IceCreamResult'
import { AppButton } from './components/button/AppButton'
import { AppLayout } from './layouts/AppLayout'
 
 
export function App() {
 
  const [cupOrCone, setCupOrCone] = useState("cone")
  
  const [flavour, setFlavour] = useState("שוקולד")



  return (
    <div className={'bg-white h-screen w-screen text-black text-center'}>  
    <AppHeader></AppHeader>
    <IceCreamResult   cupOrCone={cupOrCone}>

    </IceCreamResult>
  
      <AppButton  onClick={() =>  setCupOrCone("cup")}>
         ספל
      </AppButton>
      <AppButton onClick={() =>  setCupOrCone("cone")}>
          גביע
      </AppButton>
      <div className='flex flex-row gap-6 w-full justify-center'>
       <button onClick={() =>  setFlavour("שוקולד")}>
        שוקולד
        </button>
      <button onClick={() =>  setFlavour("וניל")}>
        וניל
      </button>
          <button onClick={() =>  setFlavour("תות")}>
        תות
      </button>
      </div>
     
 

       <p>
        הגשה ב
        {cupOrCone === "cone" ? "גביע": "ספל" }
      </p>

      <p>

       גלידה בטעם

        {flavour}
      </p>
 
    </div>
  )
}


