"use client";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import Link from "next/link";

import { useProduct } from "@/redux/hooks/product";

const HomeCards = () => {
	const { data, isLoading } = useProduct();

	if (isLoading) {
		return (
			<section className="pb-10 px-4">
				<div className="w-full   pb-4 max-w-[194px] h-6 bg-gray-200 rounded animate-pulse" />
				<div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-3">
					{[...Array(4)].map((_, index) => (
						<div
							key={index}
							className="p-3 bg-white border border-[#E4E4E7] rounded-[16px] animate-pulse">
							<div className="flex gap-3">
								<div className="relative overflow-hidden rounded-[8px] w-[114px] h-[114px] bg-gray-200" />
								<div className="w-[138px] flex flex-col gap-2">
									<div className="h-5 bg-gray-200 rounded w-3/4" />
									<div className="h-4 bg-gray-200 rounded w-1/2" />
									<div className="h-4 bg-gray-200 rounded w-2/3" />
									<div className="flex items-center gap-1">
										<div className="h-4 bg-gray-200 rounded w-12" />
										<div className="h-4 bg-gray-200 rounded w-10 line-through" />
									</div>
									<div className="h-5 bg-gray-200 rounded w-20 self-end" />
								</div>
							</div>
							<div className="mt-3 h-10 bg-gray-200 rounded" />
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="pb-10 px-4">
			<TitleComponent className="w-full md:max-w-full pb-2  ">
			Рекомендовано для вашего ребёнка
			</TitleComponent>
			<Description className="!text-[#515151] pb-4">Размер подобран по возрасту и весу</Description>

			<div className=" grid md:grid-cols-2 grid-cols-1 gap-2">
				{data?.detail.map((el, index) => (
					<Link
						key={index}
						href={`/detail/${el.id}`}
						className="p-3 bg-white border border-[#E4E4E7] rounded-[16px]  relative">
						<div className="flex gap-3">
							<div className=" relative overflow-hidden rounded-[8px] w-[114px] h-[114px]">
								<Image
									fill
									objectFit="cover"
									src={el.images[0]?.url}
									alt="img"
								/>
							</div>
							<div className="w-[138px] flex flex-col gap-1">
								<div className="flex gap-1">
									<Title>{el.title},</Title>
								</div>
								<Description className="text-[#515151]">
									По подписке
								</Description>
								<Description className="text-[#515151]">
									Количество: {el.items_count} шт
								</Description>

								<div key={index} className="">
									<Description className="text-[#0071E3] font-[500] text-[16px]">
										{el.subscription_price} c
										<span className="line-through text-[#515151] text-14px ml-1">
											{el.price} c
										</span>
									</Description>
									<Description className="text-[#0071E3] rounded-[32px] absolute top-0 right-0 border border-[#0071E3] p-1 px-2">
										{el.discount_percent}% Скидка
									</Description>
								</div>
							</div>
						</div>
						<Button className="mt-3 w-full">Купить сейчас</Button>
					</Link>
				))}
			</div>
		</section>
	);
};

export default HomeCards;
