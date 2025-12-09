import { useMemo } from 'react'
 
import './IceCreamVisual.css'
import { Toppings } from './IceResultVisualToppings'
import { IceCreamTaste } from '../../models/IcecreamTaste'




export const IceCream = ({ serveType, taste, topping }) => {
    const memoToppings = useMemo(() => <Toppings topping={topping} />, [topping])

    const scoopColor = (taste) => {
        switch (taste) {
            case IceCreamTaste.Chocolate:
                return '#704b03'
            case IceCreamTaste.Vanilla:
                return '#fffdf7'
            case IceCreamTaste.Strawberry:
                return '#FA5053'
            default:
                return '#fffdf7'
        }
    }

    return (
        <div className='flex flex-col items-center justify-center'>

            {taste ? (
                <div id='ice-cream-scoop' className={`bg-amber-400 w-22 h-22 rounded-full relative top-8 ring-1 ring-slate-400  `} style={{ backgroundColor: scoopColor(taste) }}>
                    {memoToppings}
                </div>
            ) : null}


            <div className={serveType === 'cone' ? 'cone' : 'cup'}>

            </div>
        </div >
    )
}