import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/context/AuthContext";
import AddToCartButton from "./AddToCartButton";
import { getProductReviewCounts } from "@/lib/firestore/products/count/read";
import { Suspense } from "react";
import MyRating from "./MyRating";

export default function ProductsGridView({ products }) {
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-lg font-semibold text-center">Products</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </section>
  );
}

export function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-3 p-4 border rounded-lg">
      <div className="relative w-full">
        <img
          src={product?.featureImageURL}
          className="object-cover w-full h-48 rounded-lg"
          alt={product?.title}
        />
        <div className="absolute top-1 right-1">
          <AuthContextProvider>
            <FavoriteButton productId={product?.id} />
          </AuthContextProvider>
        </div>
      </div>
      <Link href={`/products/${product?.id}`}>
        <h1 className="text-sm font-semibold line-clamp-2">{product?.title}</h1>
      </Link>
      <div className="">
        <h2 className="text-sm font-semibold text-green-500">
          $ {product?.salePrice}{" "}
          <span className="text-xs text-gray-600 line-through">
            $ {product?.price}
          </span>
        </h2>
      </div>
      <p className="text-xs text-gray-500 line-clamp-2">
        {product?.shortDescription}
      </p>
      <Suspense>
        <RatingReview product={product} />
      </Suspense>
      {product?.stock <= (product?.orders ?? 0) && (
        <div className="flex">
          <h3 className="text-xs font-semibold text-red-500 rounded-lg">
            Out Of Stock
          </h3>
        </div>
      )}
      <div className="flex items-center w-full gap-4">
        <div className="w-full">
          <Link href={`/checkout?type=buynow&productId=${product?.id}`}>
            <button className="flex-1 w-full px-4 py-2 text-xs text-white bg-blue-500 rounded-lg">
              Buy Now
            </button>
          </Link>
        </div>
        <AuthContextProvider>
          <AddToCartButton productId={product?.id} />
        </AuthContextProvider>
      </div>
    </div>
  );
}

async function RatingReview({ product }) {
  const counts = await getProductReviewCounts({ productId: product?.id });
  return (
    <div className="flex items-center gap-3">
      <MyRating value={counts?.averageRating ?? 0} />
      <h1 className="text-xs text-gray-400">
        <span>{counts?.averageRating?.toFixed(1)}</span> ({counts?.totalReviews}
        )
      </h1>
    </div>
  );
}