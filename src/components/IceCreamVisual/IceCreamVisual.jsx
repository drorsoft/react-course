import { IceCreamTaste } from '../../models/IceCreamTaste'
import { IceCreamTopping } from '../../models/IceCreamTopping'
import './IceCreamVisual.css'
import { Toppings } from './IceCreamVisualToppings'

export const IceCream = ({ serveType, taste, topping }) => {

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
                    {topping !== IceCreamTopping.None ? <Toppings topping={topping} /> : null}

                </div>
            ) : null}


            <div className={serveType === 'cone' ? 'cone' : 'cup'}>

            </div>
        </div >
    )
}