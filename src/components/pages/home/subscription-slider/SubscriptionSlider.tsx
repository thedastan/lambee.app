// components/SubscriptionSlider.tsx

"use client"; // Это клиентский компонент — нужно для Swiper

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";

import img from "@/assets/images/diapers.png";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { GoChevronRight } from "react-icons/go";

const SubscriptionSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Скидка 20%",
      subtitle: "На первый месяц подписки",
      image: img,
      link: "#",
    },
    {
      id: 1,
      title: "Скидка 20%",
      subtitle: "На первый месяц подписки",
      image: img,
      link: "#",
    },
    {
      id: 1,
      title: "Скидка 20%",
      subtitle: "На первый месяц подписки",
      image: img,
      link: "#",
    },
    {
      id: 1,
      title: "Скидка 20%",
      subtitle: "На первый месяц подписки",
      image: img,
      link: "#",
    },
  ];

  return (
    <div className="px-4 py-6   relative">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        spaceBetween={16}
        slidesPerView={1}
        loop={true}
        speed={800}
        autoplay={{
          delay: 3000, // каждые 3 секунды
          disableOnInteraction: false, // продолжать автоплей после взаимодействия
        }}
        className=" overflow-hidden">
        {slides.map((el) => (
          <SwiperSlide key={el.id}>
            <div className=" w-full pb-10 ">
              {/* Левая часть — текст */}
              <div className="bg-[#AAA4C2] h-[164px] text-white rounded-[16px] gap-2 relative flex justify-between items-center md:pl-16 pl-5">
                <div className="flex flex-col gap-3 md:mt-8 mt-6">
                  <TitleComponent>{el.title}</TitleComponent>
                  <Description>{el.subtitle}</Description>
                  <Link
                    className="flex items-center gap-1 text-[16px] md:mt-4 mt-2"
                    href={el.link}>
                    Перейти <GoChevronRight  />
                  </Link>
                </div>
                <div className="md:w-[450px] w-[174px] h-full rounded-[16px] md:rounded-bl-[16px] rounded-bl-none bg-[#063B71] flex justify-center items-center">
                  <Image
                    width={83}
                    height={79}
                    objectFit="contain"
                    src={el.image}
                    alt="diapers"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SubscriptionSlider;
