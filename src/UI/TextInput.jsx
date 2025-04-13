export const TextInput = ({ label, value, onChange, errorText, ...props }) => {

    return (
        <div className="flex flex-col ">
            <label className="flex flex-col gap-2 w-full">
                <span className="text-sm text-gray-700 dark:text-gray-200 snuggle flex flex-row gap-2">
                    {label}

                </span>
                <input
                    {...props}
                    className={`p-2 outline-1  outline-gray-300 
                        focus:outline-2 focus:outline-background-accent rounded-md w-full`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>
            <span className="text-xs text-red-800 h-5  ">
                {errorText}
            </span>

        </div>
    );
}