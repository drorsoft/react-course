import { useState } from "react"

export const AppInput = ({...props}) => { 
    // const [value, setValue] = useState('')
    return <input className="w-full px-3 py-2 text-lg bg-blue-100 rounded" 
    {...props}
    ></input>
}