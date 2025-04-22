import { useContext, useState } from "react";
import { IceCream } from "../components/IceCreamVisual/IceCreamVisual";
import { IceCreamTopping } from "../models/IceCreamTopping";
import { IceCreamBuilderControls } from "../components/IceCreamBuilderControls";
import { GlobalContext } from "../context/globalContext";
import { useNavigate } from "react-router";




export const IceCreamBuilderPage = () => {
    const [serveType, setServeType] = useState('cone') // cone | cup
    const [taste, setTaste] = useState(null) // vanilla | chocolate | strawberry
    const [toppings, setToppings] = useState(IceCreamTopping.None) // none | cherry | sprinkles

    const navigate = useNavigate()

    const { cart, setCart } = useContext(GlobalContext)
    const gotoCheckout = () => {
        navigate('/checkout')
    }

    const addToOrder = () => {
        const newItem = {
            serveType: serveType,
            taste: taste,
            toppings: toppings
        }
        setCart([...cart, newItem])

        setTaste(null)
        setToppings(IceCreamTopping.None)
    }


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
                    <button disabled={!taste} className={`p-2  bg-button-submit  disabled:opacity-50   text-black hover:ring-1 ring-purple-700 rounded`} onClick={addToOrder} >
                        הוספה להזמנה
                    </button>
                    <button onClick={gotoCheckout} disabled={cart.length === 0} className={`p-2 bg-button-accent disabled:opacity-50 text-black hover:ring-1 ring-purple-700 rounded`}  >
                        סיום הזמנה
                    </button>
                </div>
            </div>


        </div>
    )
}
