import { useState } from "react";
import { TextInput } from "../UI/TextInput";
import { AppSelect } from "../UI/AppSelect";
import { isValidMobilePhone } from "../validators/isValidMobilePhone";
import { isValidEmail } from "../validators/isValidEmail";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const demoOrder = {
    "name": "chen",
    "email": "chen@mail.com",
    "phone": "0546734399",
    "address": "Kibbutz Eshbal",
    "paymentMethod": "credit"
}

export const Checkout = () => {
    const [order, setOrder] = useState(demoOrder || {
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

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        validateForm();
        const docRef = await addDoc(collection(db, "orders"), order);
        console.log('docRef', docRef);
    }

    return (
        <section className="p-20 w-full h-full flex flex-col items-center justify-start">
            <div id={'checkout-container'} className="w-96   border-2 border-slate-400 shadow  rounded-lg p-10 flex flex-col items-start justify-start gap-3">
                <h1 className="text-xl font-bold">
                    הזמנת גלידה
                </h1>
                <form onSubmit={submitHandler} className="flex flex-col gap-4 w-full" noValidate>
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


                </form>
                <p></p>
                <p></p>
            </div>
        </section>
    );
}