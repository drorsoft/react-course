import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
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
        <div className="w-screen h-screen flex flex-col  ">
            <AppHeader />
            <div className='flex flex-col items-center justify-center   h-64'>
                <IceCream serveType={serveType} taste={taste} topping={toppings} />
            </div>
            <IceCreamBuilderControls serveType={serveType}
                taste={taste} toppings={toppings} toggleServeType={toggleServeType} setTaste={setTaste} setToppings={setToppings} />

        </div>
    )
}
