"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";

import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { GoChevronRight } from "react-icons/go";
import { useBanners } from "@/redux/hooks/banners";

const SubscriptionSlider = () => {
 
	const { data,isLoading } = useBanners();

  if (isLoading) {
		return (
			<div className="px-4 py-6 relative">
				<div className="w-full pb-10">
					<div className="bg-[#AAA4C2] h-[164px] rounded-[16px] gap-2 relative flex justify-between items-center md:pl-16 pl-5 animate-pulse">
						<div className="flex flex-col gap-3 md:mt-8 mt-6">
							<div className="h-6 w-48 bg-white/30 rounded" />
							<div className="h-4 w-64 bg-white/30 rounded" />
							<div className="h-4 w-24 bg-white/30 rounded mt-2" />
						</div>
						<div className="md:w-[450px] w-[174px] h-full rounded-[16px] md:rounded-bl-[16px] rounded-bl-none bg-[#063B71] flex justify-center items-center">
							<div className="w-20 h-20 bg-white/20 rounded" />
						</div>
					</div>
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
						<div className=" w-full pb-10 ">
							<div className="bg-[#AAA4C2] h-[164px] text-white rounded-[16px] gap-2 relative flex justify-between items-center md:pl-16 pl-5">
								<div className="flex flex-col gap-3 md:mt-8 mt-6">
									<TitleComponent>{el.title}</TitleComponent>
									<Description>{el.description}</Description>
									<Link
										className="flex items-center gap-1 text-[16px] md:mt-4 mt-2"
										href={el.url}>
										Перейти <GoChevronRight />
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
