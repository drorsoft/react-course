import axios from "axios";
import { useEffect, useState } from "react"

export const AllPosts = () => {
    const [allPosts, setAllPosts] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("https://json-placeholder.mock.beeceptor.com/posts");

            setAllPosts(response.data);
        }
        fetchData();
    }, [])

    return (<div className="p-5 w-screen min-h-screen flex flex-col items-start justify-start  ">
        Network requests
        <div dir="ltr" className="flex flex-row gap-4 justify-start    w-full h-44 p-2  ">

            {allPosts ? (<div className="flex flex-col gap-5">
                {
                    allPosts.map((post) => <div key={post.id} className="w-3/4    rounded-md p-2 flex flex-col items-start justify-start gap-2 border border-black">
                        <h1 className="font-bold mb-5"> {post.title} </h1>
                        <div>{post.body}</div>
                    </div>)
                }


            </div>) : (<span>Loading...</span>)}




        </div>
    </div>)
}
