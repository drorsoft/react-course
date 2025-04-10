import { useState } from "react";
import { TextInput } from "../UI/TextInput";

export const Checkout = () => {
    const [order, setOrder] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: ''
    });

    return (
        <section className="p-20 w-full h-full flex flex-col items-center justify-start">
            <div id={'checkout-container'} className="w-96 h-3/4 border-2 border-slate-400 shadow  rounded-lg p-10 flex flex-col items-start justify-start gap-3">
                <h1 className="text-xl font-bold">
                    הזמנת גלידה
                </h1>
                <form className="flex flex-col gap-4 w-full">
                    <div  >

                        <TextInput
                            value={order.name}
                            label={'שם'}
                            onChange={(value) => setOrder(
                                {
                                    ...order,
                                    name: value
                                }
                            )} />

                    </div>


                </form>
                <p></p>
                <p></p>
            </div>
        </section>
    );
}