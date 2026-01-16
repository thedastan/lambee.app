// src/app/(main)/basket/basket-cards/BasketCards.tsx
import React, { useState } from "react";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import DeleteSvg from "@/assets/svg/delete";
import basket from "@/assets/images/basket.png";
import { useCart } from "@/redux/hooks/useCart";

interface BasketCardsProps {
	oneTimeItems: any[]; // можно оставить any, так как мы не используем напрямую
}

const BasketCards: React.FC<BasketCardsProps> = ({ oneTimeItems }) => {
	const [editingItemId, setEditingItemId] = useState<number | null>(null);
	const { changeItemVariant, removeItem, updateQuantity } = useCart();

	const toggleEdit = (id: number) => {
		setEditingItemId(editingItemId === id ? null : id);
	};

	const formatPrice = (price: number) => `${price} сом`;

	if (oneTimeItems.length === 0) {
		return (
			<div className="w-full h-[200px] relative">
				<Image fill objectFit="contain" src={basket} alt="Пустая корзина" />
			</div>
		);
	}

	const handleVariantChange = (itemId: number, newVariantId: number) => {
		changeItemVariant(itemId, newVariantId);
		setEditingItemId(null);
	};

	return (
		<section className="md:p-0 p-4 flex flex-col gap-4">
			{oneTimeItems.map((item: any) => (
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

							<div className="flex items-center gap-2">
								<div className="border border-[#E4E4E7] w-full max-w-[90px] rounded-[4px] flex justify-between items-center">
									<button
										onClick={() => {
											if (item.quantity <= 1) {
												removeItem(item.id);
											} else {
												updateQuantity(item.id, item.quantity - 1);
											}
										}}
										className="border-r w-[28px] h-[28px] flex justify-center items-center text-[#515151]"
									>
										<FiMinus />
									</button>
									<Description>{item.quantity}</Description>
									<button
										onClick={() => updateQuantity(item.id, item.quantity + 1)}
										className="border-l w-[28px] h-[28px] flex justify-center items-center text-[#515151]"
									>
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

						<button
							onClick={() => toggleEdit(item.id)}
							className="text-[#515151] text-sm"
						>
							{editingItemId === item.id ? "Готово" : "Изменить"}
						</button>
					</div>

					{editingItemId === item.id && (
						<div className="w-full mt-2 p-3 bg-white border border-[#E4E4E7] rounded-[8px]">
							<Description className="text-[#515151] mb-2">
								Выберите другой размер:
							</Description>
							<div className="grid md:grid-cols-3 grid-cols-2 w-full gap-2">
								{item.availableVariants?.map((variant: any) => (
									<button
										key={variant.id}
										onClick={() => handleVariantChange(item.id, variant.id)}
										className={`p-3 text-left rounded border transition-colors ${
											item.variantId === variant.id
												? "bg-[#0071E3] text-white border-[#0071E3]"
												: "bg-white border-gray-300 hover:border-[#0071E3]"
										}`}
									>
										<div className="font-medium">{variant.title}</div>
										<div
											className={`text-sm mt-1 ${
												item.variantId === variant.id
													? "text-white"
													: "text-[#515151]"
											}`}
										>
											{variant.weight_range} кг • {variant.items_count} шт
										</div>
									</button>
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</section>
	);
};

export default BasketCards;