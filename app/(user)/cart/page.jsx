"use client";

import { useAuth } from "@/context/AuthContext";
import { useProduct } from "@/lib/firestore/products/read";
import { useUser } from "@/lib/firestore/user/read";
import { updateCarts } from "@/lib/firestore/user/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
      <h1 className="text-2xl font-semibold">Cart</h1>
      {(!data?.carts || data?.carts?.length === 0) && (
        <div className="flex flex-col items-center justify-center w-full h-full gap-5 py-20">
          <div className="flex justify-center">
            <img className="h-[200px]" src="/svgs/Empty-pana.svg" alt="" />
          </div>
          <h1 className="font-semibold text-gray-600">
            Please Add Products To Cart
          </h1>
        </div>
      )}
      <div className="p-5 w-full md:max-w-[900px] gap-4 grid grid-cols-1 md:grid-cols-2">
        {data?.carts?.map((item, key) => {
          return <ProductItem item={item} key={item?.id} />;
        })}
      </div>
      <div>
        <Link href={`/checkout?type=cart`}>
          <button className="px-5 py-2 text-sm text-white bg-blue-500 rounded-lg">
            Checkout
          </button>
        </Link>
      </div>
    </main>
  );
}

function ProductItem({ item }) {
  const { user } = useAuth();
  const { data } = useUser({ uid: user?.uid });

  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: product } = useProduct({ productId: item?.id });

  const handleRemove = async () => {
    if (!confirm("Are you sure?")) return;
    setIsRemoving(true);
    try {
      const newList = data?.carts?.filter((d) => d?.id != item?.id);
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsRemoving(false);
  };

  const handleUpdate = async (quantity) => {
    setIsUpdating(true);
    try {
      const newList = data?.carts?.map((d) => {
        if (d?.id === item?.id) {
          return {
            ...d,
            quantity: parseInt(quantity),
          };
        } else {
          return d;
        }
      });
      await updateCarts({ list: newList, uid: user?.uid });
    } catch (error) {
      toast.error(error?.message);
    }
    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-3 px-3 py-3 border rounded-xl">
      <div className="p-1 h-14 w-14">
        <img
          className="object-cover w-full h-full rounded-lg"
          src={product?.featureImageURL}
          alt=""
        />
      </div>
      <div className="flex flex-col w-full gap-1">
        <h1 className="text-sm font-semibold">{product?.title}</h1>
        <h1 className="text-sm text-green-500">
          $ {product?.salePrice}{" "}
          <span className="text-xs text-gray-500 line-through">
            $ {product?.price}
          </span>
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <Button
            onClick={() => {
              handleUpdate(item?.quantity - 1);
            }}
            isDisabled={isUpdating || item?.quantity <= 1}
            isIconOnly
            size="sm"
            className="w-4 h-6"
          >
            <Minus size={12} />
          </Button>
          <h2>{item?.quantity}</h2>
          <Button
            onClick={() => {
              handleUpdate(item?.quantity + 1);
            }}
            isDisabled={isUpdating}
            isIconOnly
            size="sm"
            className="w-4 h-6"
          >
            <Plus size={12} />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleRemove}
          isLoading={isRemoving}
          isDisabled={isRemoving}
          isIconOnly
          color="danger"
          size="sm"
        >
          <X size={13} />
        </Button>
      </div>
    </div>
  );
}