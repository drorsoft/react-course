import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { NavLink } from "react-router";
import { firebaseProvider } from "../firebase/firebaseProvider";

export const OrdersHistory = () => {
    const [allOrdersHistory, setAllOrdersHistory] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await firebaseProvider().getDocs(firebaseProvider().collection(db, "orders"));
            const allRecords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllOrdersHistory(allRecords)
            console.log

        }

        fetchData();
    }, [])

    // Helper function to translate payment method to Hebrew
    const getPaymentMethodHebrew = (method) => {
        switch (method) {
            case 'credit':
                return 'אשראי';
            case 'cash':
                return 'מזומן';
            case 'bit':
                return 'ביט';
            default:
                return method;
        }
    };

    return (<div className=" w-screen  h-screen overflow-hidden flex flex-col items-start justify-start  ">
        <div className="p-5 overflow-scroll w-screen  h-screen">
            הסטורית הזמנות
            <div className="flex flex-row   gap-4 justify-start w-full h-44 p-2 ">
                {allOrdersHistory && allOrdersHistory.length > 0 ? (
                    <div className="flex flex-col gap-2 w-full">
                        {allOrdersHistory.map((order) => (
                            <div key={order.id}>
                                <div className=" w-full md:w-96   rounded-md p-2 flex flex-col items-start justify-start gap-2 border border-black  ">
                                    <h1 className="font-bold mb-1"> {order.name} </h1>
                                    <span className="flex flex-row flex-wrap text-xs gap-1 items-start justify-start w-full">
                                        <span>  {order.phone}</span>
                                        <span> </span>
                                        <span>   {order.email}</span>
                                        <span> </span>
                                        <span>   {order.address}</span>
                                        <span> </span>
                                    </span>
                                    <span className=" text-xs">כמות פריטים בהזמנה: {order.items ? order.items.length : 0}</span>
                                    <span className="font-bold text-xs " >שיטת תשלום:
                                        <span className="font-bold  ">   {getPaymentMethodHebrew(order.paymentMethod)}</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : allOrdersHistory && allOrdersHistory.length === 0 ? (
                    <span>לא נמצאו הזמנות</span>
                ) : (
                    <span>Loading...</span>
                )}



            </div>
        </div>
    </div >)

}