// BasketCards.tsx

import React from "react";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import DeleteSvg from "@/assets/svg/delete";

import basket from "@/assets/images/basket.png";

// Убедитесь, что CartItem импортирован правильно
import { CartItem } from "@/redux/hooks/useCart"; // ← рекомендуется использовать общий тип

interface BasketCardsProps {
	oneTimeItems: CartItem[];
	updateQuantity: (id: number, quantity: number) => void;
	removeItem: (id: number) => void;
}

const BasketCards: React.FC<BasketCardsProps> = ({
	oneTimeItems,
	updateQuantity,
	removeItem,
}) => {
	const formatPrice = (price: number) => `${price} сом`;

	if (oneTimeItems.length === 0) {
		return (
			<div className="w-full h-[200px] relative ">
				<Image fill objectFit="contain" src={basket} alt="img" />
			</div>
		);
	}

	return (
		<section className="md:p-0 p-4 flex flex-col gap-4">
			{oneTimeItems.map((item) => (
				<div key={item.id} className="flex items-start flex-col gap-2">
					<div className="flex gap-2 items-center">
						<div className="w-[80px] min-w-[80px] h-[80px] rounded-[8px] relative overflow-hidden">
							{item.imageUrl ? (
								<Image
									src={item.imageUrl}
									alt={item.productTitle}
									fill
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
									Нет фото
								</div>
							)}
						</div>
						<div className="flex flex-col justify-between w-full">
							<div className="flex md:justify-start justify-between gap-2 items-start">
								<div>
									<TitleComponent className="!font-[400] mt-1">
										{item.productTitle}
									</TitleComponent>
								</div>
								<button onClick={() => removeItem(item.id)} className="p-1">
									<DeleteSvg />
								</button>
							</div>

							<Description className="text-[#515151] font-[500] text-[14px] flex gap-2 items-center">
								{item.type === "subscription" &&
								item.subscriptionPrice !== undefined ? (
									<>
										<span className="line-through text-black">
											{formatPrice(item.price * item.quantity)}
										</span>
										{formatPrice(item.subscriptionPrice * item.quantity)} / мес
									</>
								) : (
									formatPrice(item.price * item.quantity)
								)}
							</Description>

							<div className="flex items-center  gap-2">
								<div className="border border-[#E4E4E7] w-full max-w-[90px] rounded-[4px] flex justify-between items-center">
									<button
										onClick={() => {
											if (item.quantity <= 1) {
												removeItem(item.id);
											} else {
												updateQuantity(item.id, item.quantity - 1);
											}
										}}
										className="border-r w-[28px] h-[28px] flex justify-center items-center text-[#515151]">
										<FiMinus />
									</button>
									<Description>{item.quantity}</Description>
									<button
										onClick={() => updateQuantity(item.id, item.quantity + 1)}
										className="border-l w-[28px] h-[28px] flex justify-center items-center text-[#515151]">
										<VscAdd />
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="border px-3 py-2 w-full rounded-[8px] flex items-center justify-between gap-5">
						<div className="flex items-center gap-5">
							<TitleComponent>Размер {item.variantTitle}</TitleComponent>
							<TitleComponent className="text-[#515151] font-[400]">
								{item.itemsCount * item.quantity} шт
							</TitleComponent>
						</div>

						<button className="text-[#515151]">Изменить</button>
					</div>
				</div>
			))}
		</section>
	);
};

export default BasketCards;
