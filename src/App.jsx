import { useState } from 'react' 
import { AppHeader } from './AppHeader'
import { IceCreamResult } from './components/IceCreamResult'
import { AppButton } from './components/button/AppButton'
import { AppLayout } from './layouts/AppLayout'
import { ServingType } from './models/ServingType'
 
 
export function App() {
  const [cupOrCone, setCupOrCone] = useState(ServingType.Cone)
  const [flavour, setFlavour] = useState("שוקולד")

  // 
  return (
    <div className={'bg-amber-300 h-screen w-screen text-black text-center'}>  
   
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
        {cupOrCone === ServingType.Cone ? "גביע": "ספל" }
      </p>

      <p>

       גלידה בטעם

        {flavour}
      </p>
 
    </div>
  )
}


