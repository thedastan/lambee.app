"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import DeleteSvg from "@/assets/svg/delete";
import basket from "@/assets/images/basket.png";
import { useCart } from "@/redux/hooks/useCart";
import { MdClose } from "react-icons/md";

interface SubscriptionsCardsProps {
	oneTimeItems: any[];
}

const SubscriptionsCards: React.FC<SubscriptionsCardsProps> = ({
	oneTimeItems,
}) => {
	const [editingItemId, setEditingItemId] = useState<number | null>(null);
	const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
		null
	);
	const [errorMessage, setErrorMessage] = useState<{ [key: number]: string }>(
		{}
	);
	const { changeItemVariant, removeItem, updateQuantity } = useCart();

	const openModal = (itemId: number, currentVariantId: number) => {
		setEditingItemId(itemId);
		setSelectedVariantId(currentVariantId);
	};

	const closeModal = () => {
		setEditingItemId(null);
		setSelectedVariantId(null);
	};

	const saveVariant = (itemId: number) => {
		if (selectedVariantId !== null) {
			changeItemVariant(itemId, selectedVariantId);
		}
		closeModal();
		setErrorMessage((prev) => ({ ...prev, [itemId]: "" }));
	};

	const formatPrice = (price: number) => `${price} сом`;

	if (oneTimeItems.length === 0) {
		return (
			<div className="w-full h-[200px] relative">
				<Image
					fill
					style={{ objectFit: "contain" }}
					src={basket}
					alt="Пустая корзина"
				/>
			</div>
		);
	}

	return (
		<section className="md:p-0 p-4 flex flex-col gap-4 relative">
			{oneTimeItems.map((item: any) => {
				const currentVariantData = item.availableVariants?.find(
					(v: any) => v.id === item.variantId
				);
				const minQty =
					item.type === "subscription"
						? currentVariantData?.min_count_subscription ??
						  currentVariantData?.minCountSubscription ??
						  1
						: 1;

				return (
					<div key={item.id} className="flex flex-col gap-2 pb-4">
						<div className="flex gap-2 items-center">
							<div className="w-[80px] min-w-[80px] h-[80px] rounded-[8px] relative overflow-hidden">
								<Image
									src={item.imageUrl || ""}
									alt={item.productTitle}
									fill
									className="object-cover"
								/>
							</div>
							<div className="flex flex-col justify-between w-full">
								<div className="flex md:justify-start justify-between gap-2 items-start">
									<TitleComponent className="!font-[400] mt-1">
										{item.productTitle}
									</TitleComponent>
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
											{formatPrice(item.subscriptionPrice * item.quantity)} /
											мес
										</>
									) : (
										formatPrice(item.price * item.quantity)
									)}
								</Description>

								<div className="flex items-center gap-2">
									<div className="border border-[#E4E4E7] w-full max-w-[90px] rounded-[4px] flex justify-between items-center">
										<button
											onClick={() => {
												if (item.quantity <= minQty) {
													setErrorMessage((prev) => ({
														...prev,
														[item.id]: `Для этого размера обычно берут ${minQty} упаковок в месяц. Вы можете взять больше или меньше — как вам удобно.`,
													}));
													return;
												}
												updateQuantity(item.id, item.quantity - 1);
												setErrorMessage((prev) => ({ ...prev, [item.id]: "" }));
											}}
											className="border-r w-[28px] h-[28px] flex justify-center items-center text-[#515151]">
											<FiMinus />
										</button>
										<Description>{item.quantity}</Description>
										<button
											onClick={() => {
												updateQuantity(item.id, item.quantity + 1);
												setErrorMessage((prev) => ({ ...prev, [item.id]: "" }));
											}}
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
							<button
								onClick={() => openModal(item.id, item.variantId)}
								className="text-[#515151] text-sm">
								Изменить
							</button>
						</div>

						{errorMessage[item.id] && (
							<Description className=" text-[12px] mt-1 border-[#EAB308] border bg-[#FEF9C3] rounded-[8px] p-4">
								{errorMessage[item.id]}
							</Description>
						)}

						{editingItemId === item.id && (
							<div
								onClick={closeModal}
								className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-[10px]">
								<div
									onClick={(e) => e.stopPropagation()}
									className="bg-white p-4 rounded-[16px] max-w-md w-full">
									<div className="flex justify-between items-center pb-4">
										<div className="flex justify-between items-center mb-2">
											<TitleComponent>Выберите другой размер</TitleComponent>
										</div>

										<button onClick={closeModal} className="px-4 py-2 ">
											<MdClose />
										</button>
									</div>
									<div className="grid md:grid-cols-2 grid-cols-2 w-full border-b pb-4 gap-2 mb-4">
										{item.availableVariants?.map((variant: any) => (
											<button
												key={variant.id}
												onClick={() => setSelectedVariantId(variant.id)}
												className={`p-3 text-left rounded-[8px] border transition-colors ${
													selectedVariantId === variant.id
														? "bg-[#0071E3] text-white border-[#0071E3]"
														: "bg-white border-gray-300 hover:border-[#0071E3]"
												}`}>
												<div className="font-semibold text-[16px]">
													{variant.title}
												</div>
												<div
													className={`text-sm mt-1 ${
														selectedVariantId === variant.id
															? "text-white"
															: "text-[#515151]"
													}`}>
													<Description> {variant.weight_range} кг</Description>
													<Description>{variant.items_count} шт</Description>
												</div>
											</button>
										))}
									</div>

									<div className="flex justify-end gap-2">
										<button
											onClick={closeModal}
											className="px-4 py-2 w-full rounded-[8px] border border-gray-300 text-gray-700 hover:bg-gray-100">
											Закрыть
										</button>
										<button
											onClick={() => saveVariant(item.id)}
											className="px-4 py-2 w-full rounded-[8px] bg-[#0071E3] text-white hover:bg-blue-600">
											Сохранить
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</section>
	);
};

export default SubscriptionsCards;
