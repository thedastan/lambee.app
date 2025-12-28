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
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";

const Banner = () => {
	const { data, isLoading } = useBanners();

	// Внутри компонента Banner, в блоке isLoading:
	if (isLoading) {
		return (
			<div className="px-4 py-6 pb-[64px]">
				<div className="w-full h-[164px] rounded-[16px] overflow-hidden relative p-4">
					{/* Анимированный скелетон */}
					<div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse-skeleton rounded-[16px]"></div>

					{/* Контент-заглушки */}
					<div className="relative z-10 flex flex-col justify-between h-full text-white">
						<div>
							<div className="h-5 w-3/4 bg-white/20 rounded mb-2"></div>
							<div className="h-4 w-1/2 bg-white/20 rounded"></div>
						</div>
						<div className="h-4 w-16 bg-white/20 rounded "></div>
					</div>

					{/* Стили для анимации — лучше вынести в глобальный CSS или здесь через style */}
					<style jsx>{`
						@keyframes pulse-skeleton {
							0% {
								background-position: 200% 0;
							}
							100% {
								background-position: -200% 0;
							}
						}
						.animate-pulse-skeleton {
							animation: pulse-skeleton 1.5s infinite linear;
						}
					`}</style>
				</div>
			</div>
		);
	}

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
									"linear-gradient(to right, #0071E3 70%, #189D62 90%)",
							}}>
							<div className="text-white flex flex-col justify-between h-full">
								<div>
									<TitleComponent className="text-[20px]">
										{el.title}
									</TitleComponent>
									<Description>{el.description}</Description>
								</div>

								<Link
									href={el.url}
									target="_blank"
									className="w-fit text-sm font-medium flex items-center gap-1">
									Перейти <GoChevronRight />
								</Link>
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
