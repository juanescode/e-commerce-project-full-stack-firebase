"use client";

import { ProductCard } from "@/app/components/Products";
import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { CircularProgress } from "@nextui-org/react";

export default function Page() {
  const { user } = useAuth();
  const { data, isLoading } = useUser({ uid: user?.uid });
  if (isLoading) {
    return (
      <div className="flex justify-center w-full p-10">
        <CircularProgress />
      </div>
    );
  }
  return (
    <main className="flex flex-col items-center justify-center gap-3 p-5">
      <h1 className="text-2xl font-semibold">Favorites</h1>
      {(!data?.favorites || data?.favorites?.length === 0) && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1 className="font-semibold text-gray-600">
            Please Add Products To Favorites
          </h1>
        </div>
      )}
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data?.favorites?.map((productId) => {
          return <ProductItem productId={productId} key={productId} />;
        })}
      </div>
    </main>
  );
}

function ProductItem({ productId }) {
  const { data: product } = useProduct({ productId: productId });
  return <ProductCard product={product} />;
}