import { useParams } from "react-router";

export const Order = () => {
    const { orderId } = useParams();
    return (
        <div className="p-20 text-xl">
            <h1>Order</h1>
            <p>This is one order Number {orderId}</p>
            <p></p>
        </div>
    );
}