"use client";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import Link from "next/link";

import img1 from "@/assets/images/kids1.png";
import img2 from "@/assets/images/kids2.png";
import img3 from "@/assets/images/kids3.png";
import img4 from "@/assets/images/kids4.png";

import logo from "@/assets/images/logo-blue.png";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { PAGE } from "@/config/pages/public-page.config";
import LinkButton from "@/components/ui/button/LinkButton";

const PreRegistration = () => {
	const images = [img1, img2, img3, img4];

	return (
		<section className="flex justify-between md:flex-row flex-col-reverse bg-[#FFFFFF] w-full h-[100vh]">
			<div className="md:w-[50%] md:mt-0 mt-20 w-full md:h-[100vh] h-full flex justify-center items-center">
				<div className="w-full max-w-[343px] flex flex-col justify-center items-center text-center gap-2">
					<div className="md:flex hidden flex-col gap-2">
						<TitleComponent className="!text-[24px]">
							Забота о вашем малыше
						</TitleComponent>
						<Description className="text-[#747474]">
							Премиальные подгузники, созданные для <br /> комфорта и здоровья
							вашего ребенка
						</Description>
					</div>

					<LinkButton href={PAGE.HOME} className="w-full h-[48px] !bg-[#0071E3] text-[18px] mt-2">
						Продолжить как гость
					</LinkButton>

					<div className="flex items-center font-[400] text-[18px] gap-1 w-full justify-center mt-2">
						<Link className="text-[#0071E3] font-[600]" href={PAGE.AUTH_REGISTRATION}>
							Создать аккаунт
						</Link>
						или
						<Link className="text-[#0071E3] font-[600]" href={PAGE.AUTH_LOGIN}>
							Войти
						</Link>
					</div>
				</div>
			</div>

			<div className="px-10 md:px-0 md:w-[50%] w-full  ">
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

				<div className="flex md:hidden flex-col gap-2 text-center py-4">
					<TitleComponent className="!text-[24px]">
						Забота о вашем малыше
					</TitleComponent>
					<Description className="text-[#747474]">
						Премиальные подгузники, созданные для <br /> комфорта и здоровья
						вашего ребенка
					</Description>
				</div>
			</div>

			<div className="w-full md:hidden flex justify-center py-4">
				<Image width={40} height={40} src={logo} alt="img" />
			</div>
		</section>
	);
};

export default PreRegistration;
