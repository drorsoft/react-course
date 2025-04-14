import axios from "axios";
import { useEffect } from "react"

export const NetworkRequests = () => {

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("https://json-placeholder.mock.beeceptor.com/posts");
            console.log(response);
        }
        fetchData();
    }, [])

    return (<div className="p-5 w-screen min-h-screen flex flex-col items-start justify-start  ">

        <div className="flex flex-row gap-4 justify-start   bg-pink-400 w-full h-44 p-2  ">
            Network requests


        </div>
    </div>)
}
