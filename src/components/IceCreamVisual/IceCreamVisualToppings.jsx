import { IceCreamTopping } from "../../models/IceCreamTopping";
import cherry from "../../assets/svg/cherry.png"
import sprinkles from "../../assets/images/sprinkles.png"


export const Toppings = ({ topping }) => {
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
