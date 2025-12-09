import { useState } from 'react' 
import { AppHeader } from './AppHeader'
import { IceCreamResult } from './components/IceCreamResult'
import { AppButton } from './components/button/AppButton'
import { AppLayout } from './layouts/AppLayout'
import { ServingType } from './models/ServingType'
import { SelectionButton } from './components/SelectionButtons'
import { IceCream } from './components/IceCreamVisual/IceCreamVisual'
import { IceCreamBuilderControls } from './components/IceCreamBuilderControls'
 
 
export function App() {
  const [cupOrCone, setCupOrCone] = useState(ServingType.Cone)
  const [flavour, setFlavour] = useState("שוקולד")
  const [toppings, setToppings] = useState("שוקולד")
 
  return (
    <div className={'bg-amber-300 h-screen w-screen text-black text-center'}>  
   
    <AppHeader></AppHeader>
  
 

    return (
        <div className=" flex flex-col  h-full">
            <div className='flex flex-col items-center justify-center   h-64'>
                <IceCream serveType={cupOrCone} taste={flavour} topping={toppings} />
            </div>
            <div className="bg-background-main  flex-1 flex flex-col items-center    ">
                <IceCreamBuilderControls serveType={cupOrCone}
                    taste={flavour} toppings={toppings} toggleServeType={setCupOrCone} setTaste={setFlavour} setToppings={setToppings} />
            
            </div>


        </div>
 
 
    </div>
  )
}


