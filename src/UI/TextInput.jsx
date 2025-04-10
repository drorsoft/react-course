export const TextInput = ({ label, value, onChange, ...props }) => {
    return (
        <div className=" ">
            <label className="flex flex-col gap-2 w-full">
                <span className="text-sm text-gray-700 dark:text-gray-200 snuggle">
                    {label}
                </span>
                <input
                    {...props}
                    className={`p-2 outline-1  outline-gray-300 
                        focus:outline-2 focus:outline-background-accent rounded-md w-full`}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>
        </div>
    );
}