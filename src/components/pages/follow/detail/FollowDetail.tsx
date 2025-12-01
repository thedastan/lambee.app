"use client";
import { Title } from "@/components/ui/text/Title";
import Button from "@/components/ui/button/Button";
import { FiEdit2 } from "react-icons/fi";
import { Description } from "@/components/ui/text/Description";
import LogoTransparent from "@/assets/svg/logo-transparent";
import Image from "next/image";
import img from "@/assets/images/kits.png";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import image from "@/assets/images/Diapers.png";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import FollowDetailModals from "./FollowDetailModals";
import LinkButton from "@/components/ui/button/LinkButton";

const data = [
	{
		img: image,
		title: "Подгузники 25 шт",
		text: "Размер: M",
		price: 1000,
	},
	{
		img: image,
		title: "Подгузники 25 шт",
		text: "Размер: M",
		price: 1000,
	},
];

const FollowDetail = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalFreezeOpen, setIsModalFreezeOpen] = useState(false);

	const [isSelectWeek, setIsSelectWeek] = useState(false);

	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [isModalDateOpen, setIsModalDateOpen] = useState(false);

	const [deliveryFrequency, setDeliveryFrequency] =
		useState<string>("biweekly");

	const [isPay, setIsPay] = useState(false);

	return (
		<section className="">
			<PageHeader
				href={PAGE.FOLLOW}
				description="Подписка"
				title="Подгузники+салфетки"
			/>
			<div className="flex flex-col gap-4 p-4">
				<div className="border border-[#E4E4E7]   rounded-[16px] flex items-center gap-2 p-4">
					<Description>
						<IoMdInformationCircleOutline size={24} />
					</Description>
					<Description>
						Ваша подписка заморожена до 27 ноября. <br /> Вы можете разморозить
						в любое время
					</Description>
				</div>

				<div className="border border-[#E4E4E7] bg-[#FFF3E0] flex justify-between items-center rounded-[8px] w-full h-[170px] overflow-hidden">
					<div className="flex flex-col justify-between items-start gap-6 m-4">
						<div className="flex flex-col gap-2">
							<Description className="font-[600]">
								Подгузники+салфетки
							</Description>
							<div className="flex items-center gap-2">
								<LogoTransparent />
								<Description>Оформлено 23 октября 2025</Description>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Description className="font-[600]">Сэкономлено:</Description>
							<Title className="text-[#0171E3]">5000 с</Title>
						</div>
					</div>

					<div className=" relative object-cover rounded-tr-[8px] w-[119px] h-[250px] rounded-br-[8px]">
						<Image fill objectFit="cover" src={img} alt="img" />
					</div>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Следующая доставка:</Description>
							<Title className="font-[700]">12.10.2025</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsModalDateOpen(true)}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Частота доставки:</Description>
							<Title className="font-[700]">Каждые 2 недели</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsSelectWeek(true)}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Адрес доставки</Description>
							<Title className="font-[700]">Горького 1/2</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsModalOpen(true)}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				<Button onClick={() => setIsModalFreezeOpen(true)}>
					Заморозить подписку
				</Button>

				<div className="w-full flex gap-3">
					<LinkButton href={PAGE.HISTORY_DELIVERY} className="bg-white border border-[#E4E4E7] !text-black w-full !px-4">
						История доставок
					</LinkButton>
					<LinkButton href={PAGE.HISTORY_PAYMENT} className="bg-white border border-[#E4E4E7] !text-black w-full !px-4">
						История оплат
					</LinkButton>
				</div>

				<Button   className="bg-white border border-[#E4E4E7] !text-black w-full">
					Пропустить следующую доставку
				</Button>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Способ оплаты</Description>
							<Title className="font-[700]">Finik/Баланс</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsPay(true)}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				<TitleComponent className="font-bold">
					Что входит в заказ
				</TitleComponent>

				<div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
					{data.map((el, index) => (
						<div
							key={index}
							className="border flex justify-between items-start border-[#E4E4E7] bg-white rounded-[8px] p-4">
							<div className="flex items-center gap-3">
								<div className="w-[92px] h-[92px] rounded-[8px] overflow-hidden relative ">
									<Image fill objectFit="cover" src={el.img} alt="img" />
								</div>
								<div className="flex flex-col gap-1">
									<Title>{el.title}</Title>
									<Description className="text-[#515151]">
										{el.text}
									</Description>
									<Title>{el.price}</Title>
								</div>
							</div>
							<Button
								onClick={() => setIsModalOpen(true)}
								className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
								<FiEdit2 />
							</Button>
						</div>
					))}
				</div>

				<div className="border flex justify-between items-center border-[#E4E4E7] bg-white rounded-[8px] p-4 mb-10">
					<Title>Итого:</Title>
					<Title>1500 с</Title>
				</div>

				<FollowDetailModals
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					isModalFreezeOpen={isModalFreezeOpen}
					setIsModalFreezeOpen={setIsModalFreezeOpen}
					isModalDateOpen={isModalDateOpen}
					setIsModalDateOpen={setIsModalDateOpen}
					isSelectWeek={isSelectWeek}
					setIsSelectWeek={setIsSelectWeek}
					isPay={isPay}
					setIsPay={setIsPay}
					birthDate={birthDate}
					setBirthDate={setBirthDate}
					deliveryFrequency={deliveryFrequency}
					setDeliveryFrequency={setDeliveryFrequency}
				/>
			</div>
		</section>
	);
};

export default FollowDetail;
