import { useParams, useSearchParams } from "react-router";
import { AppInput } from "../components/AppInput";
import { useState } from "react";

export const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
  });

  return (
    <section
      dir={"rtl"}
      className="   flex  flex-col items-center justify-start  "
    >
      <div className=" md:p-10 flex flex-col items-center justify-start gap-5 w-full h-full  ">
        <div
          id={"checkout-container"}
          className="w-full bg-white sm:w-96 border-0 sm:border-2 border-slate-400 md:shadow rounded-lg p-4 md:p-10 flex flex-col items-start justify-start gap-3"
        >
          <h1 className="text-xl font-bold">הזמנת גלידה</h1>
          <form className="w-full">
            <AppInput
              onChange={(e) => {
                setCheckoutData({
                  ...checkoutData,
                  name: e.target.value,
                });
              }}
              value={checkoutData.name}
              placeholder={"שם המזמין"}
            />
            <AppInput
              onChange={(e) => {
                setCheckoutData({
                  ...checkoutData,
                  phone: e.target.value,
                });
              }}
              value={checkoutData.phone}
              placeholder={"טלפון"}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
