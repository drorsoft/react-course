import { useContext, useState } from "react";
import { TextInput } from "../UI/TextInput";
import { AppSelect } from "../UI/AppSelect";
import { isValidMobilePhone } from "../validators/isValidMobilePhone";
import { isValidEmail } from "../validators/isValidEmail";

import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { GlobalContext } from "../context/globalContext";
import { iceCreamAbstract } from "../utils/iceCreamAbstract";
import { CheckoutStateType } from "../models/checkoutStateType";
import { useNavigate } from "react-router";

const demoOrder = {
    "name": "chen",
    "email": "chen@mail.com",
    "phone": "0546734399",
    "address": "Kibbutz Eshbal",
    "paymentMethod": "credit"
}

export const Checkout = () => {
    const [checkoutState, setCheckoutState] = useState({ status: CheckoutStateType.NotSent, message: '' }); // NotSent | Sending | OrderReceived | OrderFailed

    const navigate = useNavigate();

    const { cart, setCart } = useContext(GlobalContext);
    const [order, setOrder] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: ''
    });
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: ''
    });
    const validateForm = () => {

        const errors = {
            name: '',
            email: '',
            phone: '',
            address: '',
            paymentMethod: ''
        };
        for (const key in order) {
            if (order[key].trim() === '') {
                errors[key] = 'שדה חובה';
            }
        }

        if (!errors.phone && !isValidMobilePhone(order.phone)) {
            errors.phone = 'נא להכניס מספר טלפון תקין (10 ספרות)'; //  
        }

        if (!errors.email && !isValidEmail(order.email)) {
            errors.email = 'נא להכניס כתובת דואל תקינה'; //  
        }



        setValidationErrors(errors);
        return errors

    }
    const finishOrderProcess = () => {
        setCheckoutState({ status: CheckoutStateType.NotSent, message: '' });
        setCart([]);
        setOrder(demoOrder);
        navigate('/')
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
        setCheckoutState({ status: CheckoutStateType.Sending, message: '' });
        try {
            const docRef = await addDoc(collection(db, "orders"), order);
            const orderId = docRef.id;
            setCheckoutState({ status: CheckoutStateType.OrderReceived, message: orderId });
        } catch (error) {
            console.error("Error adding document: ", error);
            setCheckoutState({ status: CheckoutStateType.OrderFailed, message: error.message });
        }
    }

    return (
        <section className=" w-full h-full flex flex-col items-center justify-start overflow-hidden">
            <div className=" p-10 flex flex-col items-center justify-start gap-5 w-full h-full overflow-scroll">
                <div id={'checkout-container'} className="w-96   border-2 border-slate-400 shadow  rounded-lg p-10 flex flex-col items-start justify-start gap-3">
                    <h1 className="text-xl font-bold">
                        הזמנת גלידה
                    </h1>
                    {checkoutState.status === CheckoutStateType.NotSent && <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full" noValidate>
                        <div className="my-2">
                            <h2> פריטים בהזמנה</h2>
                            <ul>

                                {cart.map((iceCream, index) => <li key={iceCream + index}>
                                    <span> 🍦 </span>
                                    {iceCreamAbstract(iceCream)}</li>)}
                            </ul>
                        </div>
                        <div  >

                            <TextInput
                                placeholder={'שם פרטי ושם משפחה'}
                                value={order.name}
                                label={'שם'}
                                errorText={validationErrors.name}
                                onChange={(value) => setOrder(
                                    {
                                        ...order,
                                        name: value
                                    }
                                )} />

                            <TextInput
                                placeholder={'אימייל'}
                                type={'email'}
                                value={order.email}
                                label={'אימייל'}
                                errorText={validationErrors.email}
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
                                errorText={validationErrors.phone}
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
                                errorText={validationErrors.address}
                                onChange={(value) => setOrder(
                                    {
                                        ...order,
                                        address: value
                                    }
                                )} />
                            <AppSelect
                                label={'שיטת תשלום'}
                                value={order.paymentMethod}
                                errorText={validationErrors.paymentMethod}
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


                    </form>}
                    {checkoutState.status === CheckoutStateType.Sending && <div className="flex flex-row items-center justify-center gap-3 mt-2 ">
                        <div  >
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-blue-500">שולח הזמנה...</span>
                    </div>}
                    {checkoutState.status === CheckoutStateType.OrderReceived && <div className="flex flex-col gap-3   ">
                        ההזמנה התקבלה בהצלחה!

                        <span className=" flex flex-col gap-1">
                            <span>   בדקות הקרובות תשלח אליך לטלפון   </span>
                            <span className="text-blue-500">   {order.phone}     </span>
                            <span>   הודעה עם פרטי ההזמנה ואופן התשלום   </span>

                        </span>
                        <span className=""
                        >מזהה ההזמנה שלך הוא: {checkoutState.message}</span>
                        <button onClick={() => finishOrderProcess()} className="bg-slate-500 text-white p-2 cursor-pointer rounded-md hover:bg-slate-600 transition-all duration-200"> חזרה לעמוד הבית</button>
                    </div>}
                    {checkoutState.status === CheckoutStateType.OrderFailed && <div className="flex flex-col gap-3   ">
                        <span className="text-red-500">
                            <span>שגיאה בשליחת ההזמנה </span>
                            {checkoutState.message}
                        </span>
                        <button onClick={() => setCheckoutState({ status: CheckoutStateType.NotSent, message: '' })} className="bg-slate-500 text-white p-2 cursor-pointer rounded-md hover:bg-slate-600 transition-all duration-200"> חזרה להזמנה</button>
                    </div>}

                </div>
            </div>
        </section>
    );
}