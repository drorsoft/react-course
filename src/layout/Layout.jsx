import { AppHeader } from "../components/AppHeader"

export const Layout = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-col  ">
            <AppHeader />
            {children}

        </div>
    )
}