import { useState } from 'react' 
import { AppHeader } from './AppHeader' 
import { AppButton } from './components/button/AppButton'
import { AppLayout } from './layouts/AppLayout'
import { ServingType } from './models/ServingType' 
import { IceCream } from './components/IceCreamResult/IceCreamVisual' 
import { IceCreamTaste } from './models/IcecreamTaste'
import { IceCreamTopping } from './models/IcecreamTopping'
 
 
export function App() {
  const [cupOrCone, setCupOrCone] = useState(ServingType.Cone)
  const [flavour, setFlavour] = useState("שוקולד")
  const [toppings, setToppings] = useState("שוקולד")
 
  return (
    <div className={'bg-amber-300 h-screen w-screen text-black text-center'}>  
   
    <AppHeader></AppHeader>
  
        <div className=" flex flex-col  ">
            <div className='flex flex-col items-center justify-center   h-64'>
                <IceCream serveType={cupOrCone} taste={flavour} topping={toppings} />
            </div>
            <div className="  flex-1 flex flex-col items-center    ">
              <div className=" gap-4 flex flex-col justify-start items-center p-4">
                      <div id='button-container' className='flex flex-col '>
                          <button className={`p-2 w-12 bg-background-accent text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setCupOrCone(cupOrCone ===  ServingType.Cone ?  ServingType.Cup : ServingType.Cone )}>
                              {cupOrCone === 'cone' ? 'גביע' : 'כוס'}
                          </button>
                      </div>
                      <div id='taste-container' className='flex flex-row gap-4'>
                          <button   className={`
              p-2 w-22   text-black hover:ring-1 ring-purple-700 rounded
              `} onClick={() => setFlavour(IceCreamTaste.Vanilla)}>
                              וניל
                          </button>
                          <button className={`p-2 w-22   text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setFlavour(IceCreamTaste.Chocolate)}>
                              שוקולד
                          </button>
                          <button className={`p-2 w-22   text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setFlavour(IceCreamTaste.Strawberry)}>
                              תות שדה
                          </button>
              
                      </div>
                      <div id='toppings-container' className='flex flex-row gap-4'>
                          <button className={`
              p-2 w-22 ${toppings === IceCreamTopping.None ? 'bg-background-accent' : 'bg-secondary'}  text-black hover:ring-1 ring-purple-700 rounded
              `} onClick={() => setToppings(IceCreamTopping.None)}>
                              ללא
                          </button>
                          <button className={`p-2 w-22 ${toppings === IceCreamTopping.Cherry ? 'bg-background-accent' : 'bg-secondary'} text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setToppings(IceCreamTopping.Cherry)}>
                              דובדבן
                          </button>
                          <button className={`p-2 w-22 ${toppings === IceCreamTopping.Sprinkles ? 'bg-background-accent' : 'bg-secondary'} text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setToppings(IceCreamTopping.Sprinkles)}>
                              סוכריות
                          </button>
              
              
                      </div>
                   
                  </div>
            </div>  
        </div> 
    </div>
  )
}


