import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CheckoutStateType } from "../models/CheckoutStateType";
import { isValidEmail } from "../validators/isValidEmail";
import { isValidMobilePhone } from "../validators/isValidMobilePhone";
import { AppInput } from "../components/AppInput";
 

 

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

    const  [ cart, setCart]   = useState({});
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
            const orderWithItems = { ...order, items: cart };
            setCart ({})
         
        } catch (error) {
            console.error("Error adding document: ", error);
            setCheckoutState({ status: CheckoutStateType.OrderFailed, message: error.message });
        }
    }

    return (
        <section className=" w-full h-full flex flex-col items-center justify-start overflow-hidden">
            <div className=" md:p-10 flex flex-col items-center justify-start gap-5 w-full h-full overflow-scroll">
                <div id={'checkout-container'} className="w-full sm:w-96 border-0 sm:border-2 border-slate-400 md:shadow rounded-lg p-4 md:p-10 flex flex-col items-start justify-start gap-3">
                    <h1 className="text-xl font-bold">
                        הזמנת גלידה
                    </h1>
                    {checkoutState.status === CheckoutStateType.NotSent && <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full" noValidate>
                        <div className="my-2 flex flex-col gap-4">
                        
                     

                            <AppInput 
                                placeholder={'שם פרטי ושם משפחה'}
                                value={order.name}  
                                onChange={(ev) => setOrder(
                                    {
                                        ...order,
                                        name:  ev.target.value
                                    }
                                )} />

                            <AppInput 
                                placeholder={'אימייל'}
                                type={'email'}
                                value={order.email}
                                
                                onChange={(ev) => setOrder(
                                    {
                                        ...order,
                                        email: ev.target.value
                                    }
                                )} />
                            <AppInput 
                                placeholder={'טלפון'}
                                value={order.phone}
                                type={'tel'}  
                                onChange={(ev) => setOrder(
                                    {
                                        ...order,
                                        phone:  ev.target.value
                                    }
                                )} />
                            <AppInput 
                                placeholder={'כתובת'}
                                value={order.address}  
                                onChange={(ev) => setOrder(
                                    {
                                        ...order,
                                        address:  ev.target.value
                                    }
                                )} />
                          


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