import { useState } from "react";
import { TextInput } from "../UI/TextInput";
import { AppSelect } from "../UI/AppSelect";

export const Checkout = () => {

    const [order, setOrder] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: ''
    });

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(order);
    }

    return (
        <section className="p-20 w-full h-full flex flex-col items-center justify-start">
            <div id={'checkout-container'} className="w-96   border-2 border-slate-400 shadow  rounded-lg p-10 flex flex-col items-start justify-start gap-3">
                <h1 className="text-xl font-bold">
                    הזמנת גלידה
                </h1>
                <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full">
                    <div  >

                        <TextInput
                            placeholder={'שם פרטי ושם משפחה'}
                            value={order.name}
                            label={'שם'}
                            onChange={(value) => setOrder(
                                {
                                    ...order,
                                    name: value
                                }
                            )} />
                        {/* add all the other things */}
                        <TextInput
                            placeholder={'אימייל'}
                            type={'email'}
                            value={order.email}
                            label={'אימייל'}
                            onChange={(value) => setOrder(
                                {
                                    ...order,
                                    email: value
                                }
                            )} />
                        <TextInput
                            placeholder={'טלפון'}
                            value={order.phone}
                            type={'tel'}
                            label={'טלפון'}
                            onChange={(value) => setOrder(
                                {
                                    ...order,
                                    phone: value
                                }
                            )} />
                        <TextInput
                            placeholder={'כתובת'}
                            value={order.address}
                            label={'כתובת'}
                            onChange={(value) => setOrder(
                                {
                                    ...order,
                                    address: value
                                }
                            )} />
                        <AppSelect
                            label={'שיטת תשלום'}
                            value={order.paymentMethod}
                            onChange={(value) => setOrder(
                                {
                                    ...order,
                                    paymentMethod: value
                                }
                            )}

                            options={[
                                { label: 'אשראי', value: 'credit' },
                                { label: 'מזומן', value: 'cash' },
                                { label: 'ביט', value: 'bit' },
                            ]} />


                    </div>
                    <button type="submit" className="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-600 transition-all duration-200"> שליחה</button>


                </form>
                <p></p>
                <p></p>
            </div>
        </section>
    );
}