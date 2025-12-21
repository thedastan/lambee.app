"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import Image from "next/image";

import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { useBanners } from "@/redux/hooks/banners";
import img2 from "@/assets/images/discount.png";

const Banner = () => {
	const { data } = useBanners();

	 

	return (
		<div className="px-4 py-6   relative">
			<Swiper
				modules={[Pagination]}
				pagination={{
					clickable: true,
					bulletClass: "swiper-pagination-bullet",
					bulletActiveClass: "swiper-pagination-bullet-active",
				}}
				style={{ paddingBottom: "40px" }}
				spaceBetween={16}
				slidesPerView={1}
				loop={true}
				speed={800}
				autoplay={{
					delay: 3000,
					disableOnInteraction: false,
				}}
				className=" overflow-hidden">
				{data?.detail.map((el) => (
					<SwiperSlide key={el.id}>
						<div
							className="w-full h-[164px] rounded-[16px] relative p-4"
							style={{
								background:
									"linear-gradient(to right, #9483D7 70%, #189D62 90%)",
							}}>
							<div className="text-white flex flex-col justify-between h-full">
								<div>
									<TitleComponent className="text-[20px]">
										Кэшбек и бонусы
									</TitleComponent>
									<Description>Накопите баллы с каждой покупки</Description>
								</div>

								<div>
									<TitleComponent className="text-[20px]">5%</TitleComponent>
									<Description>Возврат</Description>
								</div>
							</div>
							<Image
								className="w-[131px] h-[131px] absolute bottom-0 md:right-14 right-4"
								src={img2}
								alt="img"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default Banner;
