export function AppHeader() {
    return (<nav className="relative flex flex-row justify-center bg-background-accent">
        <h1 className=
            " m-0 text-small rounded p-2  font-bold"
        > גלידה מהאגדות</h1>
        <div id="nav-buttons-container" className="text-sm absolute right-0 h-full flex flex-row">
            <a href="#home" className="bg-amber-400 h-full flex flex-row items-center justify-center">הזמנות</a>
            <a href="#home flex flex-row items-center justify-center h-full " >בניית גלידה</a>
        </div>
    </nav>)
}