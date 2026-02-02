import { InputHTMLAttributes } from "react"

export const AppInput = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {  
    return <input className="w-full px-3 py-2 text-lg bg-blue-100 rounded" 
    {...props}
    ></input>
}