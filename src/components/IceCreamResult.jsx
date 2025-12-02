import { ServingType } from '../models/ServingType'
import style from './IceCreamResult.module.css'

export const IceCreamResult=( {
        cupOrCone ,
        flavour
    } 
)=> { 
    return <div className= {
     ""
    }

    >הגלידה שלי 
    
       <p>
        הגשה ב
        {cupOrCone === ServingType.Cone ? "גביע": "ספל" }
      </p>

      <p>

       גלידה בטעם

        {flavour}
      </p>
    
    </div>
}