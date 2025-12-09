 
import { IceCreamTopping } from "../models/IcecreamTopping"
import { IceCreamTaste } from "../models/IcecreamTaste"
 

export const IceCreamBuilderControls = ({ serveType, taste, toppings, toggleServeType, setTaste, setToppings }) => { 
    return <div className=" gap-4 flex flex-col justify-start items-center p-4">
        <div id='button-container' className='flex flex-col '>
            <button className={`p-2 w-12 bg-background-accent text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => toggleServeType()}>
                {serveType === 'cone' ? 'גביע' : 'כוס'}
            </button>
        </div>
        <div id='taste-container' className='flex flex-row gap-4'>
            <button   className={`
p-2 w-22   text-black hover:ring-1 ring-purple-700 rounded
`} onClick={() => setTaste(IceCreamTaste.Vanilla)}>
                וניל
            </button>
            <button className={`p-2 w-22   text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setTaste(IceCreamTaste.Chocolate)}>
                שוקולד
            </button>
            <button className={`p-2 w-22   text-black hover:ring-1 ring-purple-700 rounded`} onClick={() => setTaste(IceCreamTaste.Strawberry)}>
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
}