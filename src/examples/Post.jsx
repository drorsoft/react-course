import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
export const Post = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // This is a mock endpoint, so it will return the same data for every id. 
            // this is the correct way to do it:
            // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            //  setPost(response.data);
            const response = await axios.get(`https://json-placeholder.mock.beeceptor.com/posts`);

            const post = response.data.find((post) => post.id === parseInt(postId));
            setPost(post);
        }
        fetchData();
    }, [])

    return <div dir="ltr" className="p-14 w-screen min-h-screen flex flex-col items-start justify-start   ">
        {post ? (<div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl"> {post.title}  </h1>
            <div className="text-xl"> {post.body} </div>

        </div>) : (<span>Loading post number {postId}...</span>)}

    </div>
}