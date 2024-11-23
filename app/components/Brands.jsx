"use client";

import Slider from "react-slick";

export default function Brands({ brands }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (brands.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col justify-center gap-8 p-5 overflow-hidden md:p-10">
      <Slider {...settings}>
        {(brands?.length <= 2
          ? [...brands, ...brands, ...brands]
          : brands
        )?.map((brand) => {
          return (
            <div className="px-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className="h-20 p-2 overflow-hidden border rounded-lg md:p-5">
                  <img
                    className="object-cover w-full h-full"
                    src={brand?.imageURL}
                    alt=""
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