import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { NavLink } from "react-router";

export const OrdersHistory = () => {
    const [allOrdersHistory, setAllOrdersHistory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "orders"));
            const allRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllOrdersHistory(allRecords)
            console.log

        }

        fetchData();
    }, [])

    return (<div className=" w-screen  h-screen overflow-hidden flex flex-col items-start justify-start  ">
        <div className="p-5 overflow-scroll w-screen  h-screen">
            הסטורית הזמנות
            <div dir="ltr" className="flex flex-row   gap-4 justify-start w-full h-44 p-2 ">
                {allOrdersHistory ? (<div className="flex flex-col gap-5 ">
                    {
                        allOrdersHistory.map((order) => <div key={order.id}    ><div className=" w-96   rounded-md p-2 flex flex-col items-start justify-start gap-2 border border-black bg-amber-200">
                            <h1 className="font-bold mb-5"> {order.name} - {order.email}</h1>
                            <div>{order.address}</div>
                        </div></div>)
                    }


                </div>) : (<span>Loading...</span>)}



            </div>
        </div>
    </div >)

}