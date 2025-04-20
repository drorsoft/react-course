import { useState } from "react";
import { IceCream } from "../components/IceCreamVisual/IceCreamVisual";
import { IceCreamTopping } from "../models/IceCreamTopping";
import { IceCreamBuilderControls } from "../components/IceCreamBuilderControls";


export const IceCreamBuilderPage = () => {
    const [serveType, setServeType] = useState('cone') // cone | cup
    const [taste, setTaste] = useState(null) // vanilla | chocolate | strawberry
    const [toppings, setToppings] = useState(IceCreamTopping.None) // none | cherry | sprinkles
    function toggleServeType() {
        if (serveType === 'cone') {
            setServeType('cup')
        } else {
            setServeType('cone')
        }
    }

    return (
        <div className=" flex flex-col  h-full">
            <div className='flex flex-col items-center justify-center   h-64'>
                <IceCream serveType={serveType} taste={taste} topping={toppings} />
            </div>
            <div className="bg-background-main  flex-1 flex flex-col items-center    ">
                <IceCreamBuilderControls serveType={serveType}
                    taste={taste} toppings={toppings} toggleServeType={toggleServeType} setTaste={setTaste} setToppings={setToppings} />
                <div id='taste-container' className='flex flex-row gap-4 '>
                    <button className={`p-2 w-22 ${'bg-background-accent'} text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setTaste('vanilla')}>
                        הוספה להזמנה
                    </button>
                </div>
            </div>


        </div>
    )
}
