"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProduct } from "@/lib/firestore/products/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const [pageLimit, setPageLimit] = useState(10);
  const [lastSnapDocList, setLastSnapDocList] = useState([]);

  useEffect(() => {
    setLastSnapDocList([]);
  }, [pageLimit]);

  const {
    data: products,
    error,
    isLoading,
    lastSnapDoc,
  } = useProducts({
    pageLimit: pageLimit,
    lastSnapDoc:
      lastSnapDocList?.length === 0
        ? null
        : lastSnapDocList[lastSnapDocList?.length - 1],
  });

  const handleNextPage = () => {
    let newStack = [...lastSnapDocList];
    newStack.push(lastSnapDoc);
    setLastSnapDocList(newStack);
  };

  const handlePrePage = () => {
    let newStack = [...lastSnapDocList];
    newStack.pop();
    setLastSnapDocList(newStack);
  };

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col flex-1 w-full gap-3 px-5 overflow-x-auto md:pr-5 md:px-0 rounded-xl">
      <table className="border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="px-3 py-2 font-semibold bg-white border-l rounded-l-lg border-y">
              SN
            </th>
            <th className="px-3 py-2 font-semibold bg-white border-y">Image</th>
            <th className="px-3 py-2 font-semibold text-left bg-white border-y">
              Title
            </th>
            <th className="px-3 py-2 font-semibold text-left bg-white border-y">
              Price
            </th>
            <th className="px-3 py-2 font-semibold text-left bg-white border-y">
              Stock
            </th>
            <th className="px-3 py-2 font-semibold text-left bg-white border-y">
              Orders
            </th>
            <th className="px-3 py-2 font-semibold text-left bg-white border-y">
              Status
            </th>
            <th className="px-3 py-2 font-semibold text-center bg-white border-r rounded-r-lg border-y">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((item, index) => {
            return (
              <Row
                index={index + lastSnapDocList?.length * pageLimit}
                item={item}
                key={item?.id}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-between py-3 text-sm">
        <Button
          isDisabled={isLoading || lastSnapDocList?.length === 0}
          onClick={handlePrePage}
          size="sm"
          variant="bordered"
        >
          Previous
        </Button>
        <select
          value={pageLimit}
          onChange={(e) => setPageLimit(e.target.value)}
          className="px-5 rounded-xl"
          name="perpage"
          id="perpage"
        >
          <option value={3}>3 Items</option>
          <option value={5}>5 Items</option>
          <option value={10}>10 Items</option>
          <option value={20}>20 Items</option>
          <option value={100}>100 Items</option>
        </select>
        <Button
          isDisabled={isLoading || products?.length === 0}
          onClick={handleNextPage}
          size="sm"
          variant="bordered"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Row({ item, index }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;

    setIsDeleting(true);
    try {
      await deleteProduct({ id: item?.id });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/products/form?id=${item?.id}`);
  };

  return (
    <tr>
      <td className="px-3 py-2 text-center bg-white border-l rounded-l-lg border-y">
        {index + 1}
      </td>
      <td className="px-3 py-2 text-center bg-white border-y">
        <div className="flex justify-center">
          <img
            className="object-cover w-10 h-10"
            src={item?.featureImageURL}
            alt=""
          />
        </div>
      </td>
      <td className="px-3 py-2 bg-white border-y whitespace-nowrap">
        {item?.title}{" "}
        {item?.isFeatured === true && (
          <span className="ml-2 bg-gradient-to-tr from-blue-500 to-indigo-400 text-white text-[10px] rounded-full px-3 py-1">
            Featured
          </span>
        )}
      </td>
      <td className="px-3 py-2 bg-white border-y whitespace-nowrap">
        {item?.salePrice < item?.price && (
          <span className="text-xs text-gray-500 line-through">
            $ {item?.price}
          </span>
        )}{" "}
        $ {item?.salePrice}
      </td>
      <td className="px-3 py-2 bg-white border-y">{item?.stock}</td>
      <td className="px-3 py-2 bg-white border-y">{item?.orders ?? 0}</td>
      <td className="px-3 py-2 bg-white border-y">
        <div className="flex">
          {item?.stock - (item?.orders ?? 0) > 0 && (
            <div className="px-2 py-1 text-xs font-bold text-green-500 bg-green-100 rounded-md">
              Available
            </div>
          )}
          {item?.stock - (item?.orders ?? 0) <= 0 && (
            <div className="px-2 py-1 text-xs text-red-500 bg-red-100 rounded-md">
              Out Of Stock
            </div>
          )}
        </div>
      </td>
      <td className="px-3 py-2 bg-white border-r rounded-r-lg border-y">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleUpdate}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
          >
            <Edit2 size={13} />
          </Button>
          <Button
            onClick={handleDelete}
            isLoading={isDeleting}
            isDisabled={isDeleting}
            isIconOnly
            size="sm"
            color="danger"
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}