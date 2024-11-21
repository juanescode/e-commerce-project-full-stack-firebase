"use client";

import { useCollections } from "@/lib/firestore/collections/read";
import { deleteCollection } from "@/lib/firestore/collections/write";
import { Button, CircularProgress } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ListView() {
  const { data: collections, error, isLoading } = useCollections();

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
    <div className="flex flex-col flex-1 gap-3 px-5 md:pr-5 md:px-0 rounded-xl">
      <h1 className="text-xl">Collections</h1>
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
              Products
            </th>
            <th className="px-3 py-2 font-semibold text-center bg-white border-r rounded-r-lg border-y">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {collections?.map((item, index) => {
            return <Row index={index} item={item} key={item?.id} />;
          })}
        </tbody>
      </table>
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
      await deleteCollection({ id: item?.id });
      toast.success("Successfully Deleted");
    } catch (error) {
      toast.error(error?.message);
    }
    setIsDeleting(false);
  };

  const handleUpdate = () => {
    router.push(`/admin/collections?id=${item?.id}`);
  };

  return (
    <tr>
      <td className="px-3 py-2 text-center bg-white border-l rounded-l-lg border-y">
        {index + 1}
      </td>
      <td className="px-3 py-2 text-center bg-white border-y">
        <div className="flex justify-center">
           {/* w-10 */}
          <img className="object-cover h-10" src={item?.imageURL} alt="" />
        </div>
      </td>
      <td className="px-3 py-2 bg-white border-y">{item?.title}</td>
      <td className="px-3 py-2 bg-white border-y">{item?.products?.length}</td>
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