import { useParams, useSearchParams } from "react-router";

export const Checkout = () => {
  return (
      <section className="   flex  flex-col items-center justify-start  ">
            <div className=" md:p-10 flex flex-col items-center justify-start gap-5 w-full h-full  ">
                <div id={'checkout-container'} className="w-full bg-white sm:w-96 border-0 sm:border-2 border-slate-400 md:shadow rounded-lg p-4 md:p-10 flex flex-col items-start justify-start gap-3">
                    <h1 className="text-xl font-bold">
                        הזמנת גלידה
                    </h1> 

                </div>
            </div>
        </section>
  );
};
