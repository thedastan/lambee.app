"use client";
import FilterMenu from "@/components/ui/button/FilterMenu";
import PageHeader from "@/components/ui/heading/PageHeader";
import SearchInput from "@/components/ui/input/SearchInput";
import React from "react";

import image from "@/assets/images/Diapers.png";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import Image from "next/image";
import { PAGE } from "@/config/pages/public-page.config";
import Button from "@/components/ui/button/Button";

const data = [
	{
		id: 1,
		image: image,
		title: "Подгузники",
		status: "В обработке",
		suspended: "Подписка приостановлена",
		diapers: 50,
		panties: 50,
		payment: "Finik",
		address: "Горького 1/2",
		next_delivery: "17.10.2025 до 15:00",
		old_price: 600,
		new_price: 500,
	},
	{
		id: 2,
		image: image,
		title: "Салфетки",
		suspended: "",
		status: "В пути",
		diapers: 50,
		panties: 50,
		payment: "Finik",
		address: "Горького 1/2",
		next_delivery: "17.10.2025 до 15:00",
		old_price: 600,
		new_price: 500,
	},
	{
		id: 3,
		image: image,
		title: "Трусики",
		suspended: "",
		status: "В пути",
		diapers: 50,
		panties: 50,
		payment: "Finik",
		address: "Горького 1/2",
		next_delivery: "17.10.2025 до 15:00",
		old_price: 600,
		new_price: 500,
	},
];

const PaymentHistory = () => {

  const getStatusBadgeClass = (status: string) => {
		switch (status) {
			case "В обработке":
				return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
			case "В пути":
				return "text-[#0071E3] border-[#B5D5FF] bg-[#E6F0FF]";
			default:
				return "text-gray-600 border-gray-300 bg-gray-100";
		}
	};

	return (
		<section>
			<PageHeader title="История оплат" href={PAGE.HOME} />

			<div className="p-4">
				<div className="flex gap-3 pb-6">
					<SearchInput placeholder="Поиск" />
					<FilterMenu />
				</div>

				<div className=" grid grid-cols-1 md:grid-cols-3 gap-3 ">
					{data.map((el, index) => (
						<div key={index} className="border border-[#E4E4E7] rounded-[16px] p-4 bg-white w-full relative block">
							{/* Header */}
							<div className="flex items-center justify-between gap-2 border-b pb-3 border-[#E4E4E7]">
								<div className="flex w-full   h-[45px] gap-3 items-center">
									<div className="relative w-[40px] h-[40px] overflow-hidden rounded-[8px]">
										<Image
											fill
											className="object-cover rounded-[8px]"
											src={el.image}
											alt={el.title}
										/>
									</div>

									<div className="">
										<Title className="!text-[20px] font-[700]">
											{el.title}
										</Title>
										<Description className="text-[#515151]">
											{el.suspended}
										</Description>
									</div>
								</div>

								{/* ✅ Вынесено в отдельный компонент */}
								 
							</div>

							{/* Content */}
							<div className="flex flex-col gap-4 mt-3">
								<div className="flex items-center justify-between">
									<Title className="text-[#515151]">Статус:</Title>
									<Title
										className={`rounded-full p-1 px-3 border ${getStatusBadgeClass(
											el.status
										)}`}>
										{el.status}
									</Title>
								</div>
								<div className="flex items-center justify-between">
									<Title>Подгузники, M4</Title>
									<Title>{el.diapers} шт</Title>
								</div>
								<div className="flex items-center justify-between">
									<Title>Трусики, M1</Title>
									<Title>{el.panties} шт</Title>
								</div>
								<div className="flex items-center justify-between">
									<Title>Способ оплаты:</Title>
									<Title>{el.payment}</Title>
								</div>
								<div className="flex items-center justify-between">
									<Title>Адрес доставки:</Title>
									<Title>{el.address}</Title>
								</div>
								<div className="flex items-center justify-between">
									<Title>
										Следующая <br /> доставка:
									</Title>
									<Title className="w-full max-w-[100px] text-end">
										{el.next_delivery}
									</Title>
								</div>
								<div className="flex items-center justify-between">
									<Title>Общая сумма:</Title>
									<Title className="flex gap-3">
											{el.new_price}c
									</Title>
								</div>
							</div>

              <Button className="bg-transparent border border-[#E4E4E7] !text-black w-full mt-4">Скачать чек</Button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default PaymentHistory;
