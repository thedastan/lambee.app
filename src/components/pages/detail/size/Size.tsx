// src/components/pages/detail/size/Size.tsx
"use client";

import { useState } from "react";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { IoCheckmark } from "react-icons/io5";
import Button from "@/components/ui/button/Button";
import { Detail } from "@/redux/models/product.model";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";

// interface SizeItem {
// 	item: string;
// }

// Убираем SizeData — используем данные напрямую из product.variants
interface HeroDetailProps {
	product: Detail;
}

const SizeDetail = ({ product }: HeroDetailProps) => {
	// const [selectedSize, setSelectedSize] = useState<any | null>(null);  

	// const openModal = (size: any) => {
	// 	setSelectedSize(size);
	// };

	return (
		<section className="p-4 w-full m-4 bg-white rounded-[8px] border">
			<TitleComponent>Выберите свой размер:</TitleComponent>

			{/* <div className="grid grid-cols-2 gap-3 mt-3">
				{product.variants.map((el) => (
					<div
						key={el.id}
						onClick={() => openModal(el)}
						className={`p-3 bg-white border rounded-[8px] flex flex-col gap-1 cursor-pointer ${
							selectedSize?.id === el.id
								? "border-[#AAA4C2]"
								: "border-[#E4E4E7]"
						}`}>
						<Title className="text-[14px] font-[600]">{el.title}</Title>
						<Description className="text-[#515151]">
							{el.weight_range} кг
						</Description>
					</div>
				))}
			</div> */}

			{/* {selectedSize && (
				<div className="flex flex-col justify-center items-center">
					<Description className="mt-4 pb-3 text-start w-full">
						Выберите тип заказа:
					</Description>
					<span className="text-[12px] text-white bg-[#AAA4C2] p-1 px-2 rounded-tr-[2px] rounded-tl-[2px] rounded-br-0 rounded-bl-0">
						Скидка {selectedSize.discount_percent}%
					</span>
					<div
						className="bg-white border-[#AAA4C2] border rounded-[8px] w-full p-4 relative"
						onClick={(e) => e.stopPropagation()}>
						<Title className="text-[16px] font-[600]">
							По подписке - {selectedSize.items_count} штук
						</Title>

						<div className="mt-2">
							<div className="flex items-center gap-2">
								<Description className="text-[#AAA4C2] font-[500]">
									{selectedSize.subscription_price} с
								</Description>
								<Description className="line-through text-[#515151]">
									{selectedSize.price} с
								</Description>
							</div>
							<div className="list-disc space-y-2 mt-4">
								<div className="flex items-start justify-start gap-2">
									<div className="w-8">
										<IoCheckmark className="text-[#AAA4C2] w-8" size={20} />
									</div>
									<Description className="text-[#515151]">
										{selectedSize.items_count} шт. в упаковке
									</Description>
								</div>
								 
							</div>
						</div>
					</div>

					<div
						className="bg-white mt-3 border-[#AAA4C2] flex justify-between items-start border rounded-[8px] w-full p-4 relative"
						onClick={(e) => e.stopPropagation()}>
						<div className="flex flex-col gap-2">
							<Title className="text-[16px] font-[600]">
								Разовый заказ
							</Title>
							<Description className="flex items-center gap-2">
								<IoCheckmark className="w-8" size={20} />
								{selectedSize.items_count} шт.
							</Description>
						</div>
						<Description>{selectedSize.subscription_price} c</Description>
					</div>
				</div>
			)} */}

			<div className="flex flex-col justify-center items-center gap-4 mt-6">
				<Title className="font-[600]">Доставка в течение месяца</Title>
				<Button className="w-full max-w-full ">
					Добавить в корзину
				</Button>
				<div className="grid grid-cols-2 md:grid-cols-4   gap-2 mt-4 w-full">
					{product.benefits.map((el, index) => (
						<div
							key={index}
							className="flex flex-col justify-center items-center w-full max-w-full  ">
							<div className="bg-[#DCDCDC] relative overflow-hidden w-[40px] h-[40px] rounded-[8px]">
								<Image fill objectFit="cover" src={el.icon.trim()} alt="icon" />
							</div>
							<Description className="text-[#515151] mt-2">{el.title}</Description>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SizeDetail;