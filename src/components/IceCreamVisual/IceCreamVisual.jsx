import { IceCreamTaste } from '../../models/IceCreamTaste'
import cherry from "../assets/svg/cherry.png"
import sprinkles from "../assets/images/sprinkles.png"
import './IceCream.css'
import { IceCreamTopping } from '../../models/IceCreamTopping';

const Toppings = ({ topping }) => {
    switch (topping) {
        case IceCreamTopping.Cherry:
            return (
                <img src={cherry} alt='cherry' className='absolute  -top-10 left-8 w-6 h-12' />)
        case IceCreamTopping.Sprinkles:
            return (
                <img src={sprinkles} alt='sprinkles' className='absolute    -top-1 left-0 w-22 rounded-t-full h-12' style={{ filter: 'drop-shadow(1px 1px 1px black)' }} />)

        default:
            return null
    }

};

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
                    <Toppings topping={topping} />

                </div>
            ) : null}


            <div className={serveType === 'cone' ? 'cone' : 'cup'}>

            </div>
        </div >
    )
}