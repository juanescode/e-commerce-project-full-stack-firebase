import { ProductCard } from "@/app/components/Products";
import { getProductsByCategory } from "@/lib/firestore/products/read_server";

export default async function RelatedProducts({ categoryId }) {
  const products = await getProductsByCategory({ categoryId: categoryId });
  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-5 max-w-[900px] p-5">
        <h1 className="text-lg font-semibold text-center">Related Products</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
          {products?.map((item) => {
            return <ProductCard product={item} key={item?.id} />;
          })}
        </div>
      </div>
    </div>
  );
}