import { ButtonHTMLAttributes } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

export const AppButton = ({
    className = '',
    ...props
}: AppButtonProps) => {
    return <button  className= {`bg-amber-300 p-2  rounded  hover:bg-blue-400 ${className} `
    }  {...props}

    >

    </button>
}
