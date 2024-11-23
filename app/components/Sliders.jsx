"use client";

import { Button } from "@nextui-org/react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";
import FavoriteButton from "./FavoriteButton";
import AuthContextProvider from "@/context/AuthContext";
import AddToCartButton from "./AddToCartButton";

export default function FeaturedProductSlider({ featuredProducts }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {featuredProducts?.map((product) => {
          return (
            <div>
              <div className="flex flex-col-reverse md:flex-row gap-4 bg-[#f8f8f8] p-5 md:px-24 md:py-20 w-full">
                <div className="flex flex-col flex-1 gap-4 md:gap-10">
                  <h2 className="text-xs text-gray-500 md:text-base">
                    NEW FASHION
                  </h2>
                  <div className="flex flex-col gap-4">
                    <Link href={`/products/${product?.id}`}>
                      <h1 className="text-xl font-semibold md:text-4xl">
                        {product?.title}
                      </h1>
                    </Link>
                    <h1 className="text-xs text-gray-600 md:text-sm max-w-96 line-clamp-2">
                      {product?.shortDescription}
                    </h1>
                  </div>
                  <AuthContextProvider>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/checkout?type=buynow&productId=${product?.id}`}
                      >
                        <button className="bg-blue-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-lg">
                          BUY NOW
                        </button>
                      </Link>
                      <AddToCartButton productId={product?.id} type={"large"} />
                      <FavoriteButton productId={product?.id} />
                    </div>
                  </AuthContextProvider>
                </div>
                <div className="">
                  <Link href={`/products/${product?.id}`}>
                    <img
                      className="h-[14rem] md:h-[23rem]"
                      src={product?.featureImageURL}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}