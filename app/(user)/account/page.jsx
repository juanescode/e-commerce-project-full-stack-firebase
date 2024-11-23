"use client";

import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/lib/firestore/orders/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { user } = useAuth();

  const { data: orders, error, isLoading } = useOrders({ uid: user?.uid });

  if (isLoading) {
    return (
      <div className="flex justify-center py-48">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <main className="flex flex-col gap-4 p-5">
      <h1 className="text-2xl font-semibold">My Orders</h1>
      {(!orders || orders?.length === 0) && (
        <div className="flex flex-col items-center justify-center gap-3 py-11">
          <div className="flex justify-center">
            <img className="h-44" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1>You have no order</h1>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {orders?.map((item, orderIndex) => {
          const totalAmount = item?.checkout?.line_items?.reduce(
            (prev, curr) => {
              return (
                prev + (curr?.price_data?.unit_amount / 100) * curr?.quantity
              );
            },
            0
          );
          return (
            <div className="flex flex-col gap-2 p-4 border rounded-lg">
              <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                  <h3>{orderIndex + 1}</h3>
                  <h3 className="px-2 py-1 text-xs text-blue-500 uppercase bg-blue-100 rounded-lg">
                    {item?.paymentMode}
                  </h3>
                  <h3 className="px-2 py-1 text-xs text-green-500 uppercase bg-green-100 rounded-lg">
                    {item?.status ?? "pending"}
                  </h3>
                  <h3 className="text-green-600">$ {totalAmount}</h3>
                </div>
                <h4 className="text-xs text-gray-600">
                  {item?.timestampCreate?.toDate()?.toString()}
                </h4>
              </div>
              <div>
                {item?.checkout?.line_items?.map((product) => {
                  return (
                    <div className="flex items-center gap-2">
                      <img
                        className="w-10 h-10 rounded-lg"
                        src={product?.price_data?.product_data?.images?.[0]}
                        alt="Product Image"
                      />
                      <div>
                        <h1 className="">
                          {product?.price_data?.product_data?.name}
                        </h1>
                        <h1 className="text-xs text-gray-500">
                          $ {product?.price_data?.unit_amount / 100}{" "}
                          <span>X</span>{" "}
                          <span>{product?.quantity?.toString()}</span>
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}