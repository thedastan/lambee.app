"use client";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import React, { useState } from "react";
import image from "@/assets/images/Diapers.png";
import { FiEdit2 } from "react-icons/fi";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import LogoTransparent from "@/assets/svg/logo-transparent";
import Modal from "@/components/ui/modal/Modal";
import Input from "@/components/ui/input/Input";

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

const MyOrdersDetail = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div>
			<PageHeader
				href={PAGE.MYORDERS}
				description="Разовый заказ"
				title="Заказ #123"
			/>

			<div className="p-4 flex flex-col gap-4">
				<Title className="flex items-center gap-2">
					<LogoTransparent /> Оформлено 23 октября 2025{" "}
				</Title>

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
							<Button className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
								<FiEdit2 />
							</Button>
						</div>
					))}
				</div>

				<div className="border flex justify-between items-center border-[#E4E4E7] bg-white rounded-[8px] p-4">
					<Title>Итого:</Title>
					<Title>1500 с</Title>
				</div>

				<div className="flex gap-4 w-full">
					<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4 w-full">
						<div className="flex gap-3 items-center">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">Доставка:</Description>
								<Title className="font-[700]">12.10.2025</Title>
							</div>
						</div>
					</div>

					<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4 w-full">
						<div className="flex gap-3 items-center">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">Статус:</Description>
								<Title className="text-[#B54708] border-[#FEDF89] bg-[#FFFAEB] rounded-full p-1 px-3 border">
									В обработке
								</Title>
							</div>
						</div>
					</div>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description className="text-[#515151]">
								Способ оплаты
							</Description>
							<Title className="font-[700]">Finik/Баланс</Title>
						</div>
					</div>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description className="text-[#515151]">
								Адрес доставки
							</Description>
							<Title className="font-[700]">Горького 1/2</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsModalOpen(true)}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<Input
						label={
							<>
								Введите адрес <span className="text-[#FFA655]">*</span>
							</>
						}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]" />

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalOpen(false)}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default MyOrdersDetail;
