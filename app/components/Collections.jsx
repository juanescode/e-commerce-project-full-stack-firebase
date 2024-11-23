"use client";

import { Button } from "@nextui-org/react";
import { collection } from "firebase/firestore";
import { Heart } from "lucide-react";
import Link from "next/link";
import Slider from "react-slick";

export default function Collections({ collections }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (collections.length === 0) {
    return <></>;
  }

  return (
    <div className="p-5 overflow-hidden md:p-10">
      <Slider {...settings}>
        {(collections?.length <= 2
          ? [...collections, ...collections, ...collections]
          : collections
        )?.map((collection) => {
          return (
            <div className="px-2">
              <div className="flex gap-4 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-7 w-full rounded-xl h-full">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-base font-semibold md:text-lg">
                      {collection?.title}
                    </h1>
                    <h1 className="text-xs text-gray-600 md:text-sm max-w-96 line-clamp-2">
                      {collection?.subTitle}
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/collections/${collection?.id}`}>
                      <button className="px-4 py-2 text-xs text-white bg-blue-500 rounded-lg md:text-sm">
                        SHOP NOW
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="w-full">
                  <img
                    className="h-[4rem] md:h-[9rem]"
                    src={collection?.imageURL}
                    alt={collection?.title}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}