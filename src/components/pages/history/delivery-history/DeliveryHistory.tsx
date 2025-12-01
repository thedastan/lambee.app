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

const data = [
	{
		date: "23.10.2025",
		time: "09:00",
		month: "октября",
		card: [
			{
				img: image,
				title: "Подгузники",
				size: "M",
				old_price: 600,
				new_price: 500,
			},
			{
				img: image,
				title: "Подгузники",
				size: "M",
				old_price: 600,
				new_price: 500,
			},
		],
	},
	{
		date: "23.09.2025",
		time: "09:00",
		month: "Сентябрь",

		card: [
			{
				img: image,
				title: "Подгузники",
				size: "M",
				old_price: 600,
				new_price: 500,
			},
			{
				img: image,
				title: "Подгузники",
				size: "M",
				old_price: 600,
				new_price: 500,
			},
		],
	},
];
const DeliveryHistory = () => {
	return (
		<section>
			<PageHeader
				title="История доставок"
        href={PAGE.HOME}
			/>

			<div className="p-4">
				<div className="flex gap-3 pb-6">
					<SearchInput placeholder="Поиск" />
					<FilterMenu />
				</div>

				<div className=" grid grid-cols-1 md:grid-cols-3 gap-3 ">
					{data.map((el, index) => (
						<div key={index} className="w-full">
							<Description className="text-[#515151]">{el.month}</Description>
							<div className="bg-white rounded-[16px] mt-2 p-4 border border-[#E4E4E7]">
								<Description className="text-[#515151] pb-1">
									Доставлено:
								</Description>
								<Title>
									{el.date} {el.time}
								</Title>
								<div className="flex flex-col gap-2 mt-2">
									{el.card.map((item, index) => (
										<div key={index} className="flex items-center gap-2">
											<div className=" relative overflow-hidden rounded-[8px] w-[92px] min-w-[92px] h-[92px]">
												<Image
													src={item.img}
													objectFit="cover"
													fill
													alt="img"
												/>
											</div>

											<div className="">
												<Title>{item.title}</Title>
												<Description className="text-[#515151]">
													Размер: {item.size}
												</Description>
												<Title className="flex gap-3">
													<span className="text-[#AAA4C2] font-[500]">
														{item.new_price}c
													</span>
													<span className="line-through text-[#515151]">
														{item.old_price}c
													</span>
												</Title>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default DeliveryHistory;
