import React from 'react';
import img1 from "@/assets/images/kids1.png";
import img2 from "@/assets/images/kids2.png";
import img3 from "@/assets/images/kids3.png";
import img4 from "@/assets/images/kids4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const ImageSwipwr = () => {

	const images = [img1, img2, img3, img4];


  return (
    <div className="px-10 md:block hidden md:px-0 md:w-[50%] w-full  ">
    <div className=" relative w-full md:h-[100vh] h-[320px]">
      <Swiper
        modules={[Pagination]}
        pagination={{
          el: ".pagination_dev",
          clickable: true,
          bulletElement: "span",
          bulletClass: "swiper-pagination-bullet_dev",
          bulletActiveClass: "swiper-pagination-bullet-active_dev",
        }}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="w-full h-full">
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative md:rounded-none rounded-[8px] overflow-hidden w-full md:h-[100vh] h-[286px]">
              <Image
                fill
                alt="slider"
                src={img}
                className="object-cover"
                priority={idx === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Контейнер пагинации */}
      <div className="pagination_dev absolute bottom-4 left-0 right-0 flex justify-center z-10"></div>
    </div>
  </div>
  );
};

export default ImageSwipwr;