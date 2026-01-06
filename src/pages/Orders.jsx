import { useParams, useSearchParams } from "react-router";

export const Orders = () => {
    const [queryParams,] = useSearchParams()
    

    const params = useParams()
    // 
     console.log(new Map(queryParams)  )
    


  return (
    <div className="h-screen w-full bg-white text-black" dir={'rtl'}>
      <div className="flex flex-col bg-amber-300 h-1/2 w-full">
        <h1 className="">ההזמנות שלי</h1>
        אתה צופה בהזמנה מספר
        &nbsp;
        {
            params.orderId
        }
      </div>
      Orders
    </div>
  );
};
