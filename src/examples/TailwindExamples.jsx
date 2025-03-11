
const Item = ({ children }) => {
    return <div className="w-20 h-12 border border-blue-400 p-4 bg-amber-200  "> Item {children}</div>
}

export const TailwindExamples = () => {
    return (<div className="p-5 w-screen min-h-screen flex flex-col items-center justify-center  ">
        <div className="flex flex-row gap-4 justify-start   bg-pink-400 w-full h-44 p-2  ">
            <Item>1</Item>
            <Item>2</Item>
            <Item>3</Item>
            <Item>4</Item>
            <Item>5</Item>
            <div className="w-20 h-12 border border-blue-400 p-4 bg-amber-200 flex-1/3">
                Item 6
            </div>

        </div>
    </div>)
}
