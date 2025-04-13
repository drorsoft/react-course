export const AppSelect = ({ label, value, options, onChange, errorText, ...props }) => {
    return (
        <div className=" ">
            <label className="flex flex-col gap-2 w-full relative">
                <span className="text-sm text-gray-700 dark:text-gray-200 snuggle">
                    {label}
                </span>
                <select
                    {...props}
                    className={`p-2 outline-1  outline-gray-300  
                        focus:outline-2 focus:outline-background-accent rounded-md w-full appearance-none`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}

                </select>
                <span className="w-2 h-2 absolute top-11 left-4 rotate-45 font-bold text-slate-500 border-r-2 border-b-2 border-slate-400">
                </span>
                <span className="text-xs text-red-800 h-5  ">
                    {errorText}
                </span>
            </label>
        </div>
    );
}