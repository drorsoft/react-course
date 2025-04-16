import axios from "axios";
import { useEffect, useState } from "react"

export const NetworkRequests = () => {
    const [firstPost, setFirstPost] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("https://json-placeholder.mock.beeceptor.com/posts");
            const firstPost = response.data[0];
            setFirstPost(firstPost);
        }
        fetchData();
    }, [])

    return (<div className="p-5 w-screen min-h-screen flex flex-col items-start justify-start  ">
        Network requests
        <div dir="ltr" className="flex flex-row gap-4 justify-start    w-full h-44 p-2  ">

            {firstPost ? (<div>
                <h1 className="font-bold mb-5"> {firstPost.title} </h1>
                <div>{firstPost.body}</div>
            </div>) : (<span>Loading...</span>)}




        </div>
    </div>)
}
