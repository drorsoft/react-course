import { useState } from 'react' 
import { AppHeader } from './AppHeader'
import { IceCreamResult } from './components/IceCreamResult'
import { AppButton } from './components/button/AppButton'
import { AppLayout } from './layouts/AppLayout'
import { ServingType } from './models/ServingType'
import { SelectionButton } from './components/SelectionButtons'
 
 
export function App() {
  const [cupOrCone, setCupOrCone] = useState(ServingType.Cone)
  const [flavour, setFlavour] = useState("שוקולד")

  // 
  return (
    <div className={'bg-amber-300 h-screen w-screen text-black text-center'}>  
   
    <AppHeader></AppHeader>
    <IceCreamResult flavour={flavour}  cupOrCone={cupOrCone}>

    </IceCreamResult>
  
      <AppButton  onClick={() =>  setCupOrCone("cup")}>
         ספל
      </AppButton>
      <AppButton onClick={() =>  setCupOrCone("cone")}>
          גביע
      </AppButton>
      <SelectionButton setFlavour={setFlavour}/>
   
     
 

 
    </div>
  )
}


