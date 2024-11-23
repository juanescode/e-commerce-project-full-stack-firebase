// import AddToCartButton from "@/app/components/AddToCartButton";
// import FavoriteButton from "@/app/components/FavoriteButton";
import MyRating from "@/app/components/MyRating";
import AuthContextProvider from "@/context/AuthContext";
import { getBrand } from "@/lib/firestore/brands/read_server";
import { getCategory } from "@/lib/firestore/categories/read_server";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import Link from "next/link";
import { Suspense } from "react";

export default function Details({ product }) {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="flex gap-3">
        <Category categoryId={product?.categoryId} />
        <Brand brandId={product?.brandId} />
      </div>
      <h1 className="text-xl font-semibold md:text-4xl">{product?.title}</h1>
      <Suspense fallback="Failed To Load">
        <RatingReview product={product} />
      </Suspense>
      <h2 className="text-sm text-gray-600 line-clamp-3 md:line-clamp-4">
        {product?.shortDescription}
      </h2>
      <h3 className="text-lg font-bold text-green-500">
        $ {product?.salePrice}{" "}
        <span className="text-sm text-gray-700 line-through">
          $ {product?.price}
        </span>
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
          <button className="bg-black text-white rounded-lg px-4 py-1.5">
            Buy Now
          </button>
        </Link>
        <AuthContextProvider>
          {/* <AddToCartButton type={"cute"} productId={product?.id} /> */}
        </AuthContextProvider>
        <AuthContextProvider>
          {/* <FavoriteButton productId={product?.id} /> */}
        </AuthContextProvider>
      </div>
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="py-1 text-sm font-semibold text-red-500 rounded-lg">
            Out Of Stock
          </h3>
        </div>
      )}
      <div className="flex flex-col gap-2 py-2">
        <div
          className="text-gray-600"
          dangerouslySetInnerHTML={{ __html: product?.description ?? "" }}
        ></div>
      </div>
    </div>
  );
}

async function Category({ categoryId }) {
  const category = await getCategory({ id: categoryId });
  return (
    <Link href={`/categories/${categoryId}`}>
      <div className="flex items-center gap-1 px-3 py-1 border rounded-full">
        <img className="h-4" src={category?.imageURL} alt="" />
        <h4 className="text-xs font-semibold">{category?.name}</h4>
      </div>
    </Link>
  );
}

async function Brand({ brandId }) {
  const brand = await getBrand({ id: brandId });
  return (
    <div className="flex items-center gap-1 px-3 py-1 border rounded-full">
      <img className="h-4" src={brand?.imageURL} alt="" />
      <h4 className="text-xs font-semibold">{brand?.name}</h4>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex items-center gap-3">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-sm text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}