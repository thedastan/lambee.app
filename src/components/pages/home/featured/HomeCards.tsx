"use client";

import { useState } from "react";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import { useProduct } from "@/redux/hooks/product";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { useCart } from "@/redux/hooks/useCart";
import Link from "next/link";

const HomeCards = () => {
	const { data, isLoading } = useProduct();
	const { addItem } = useCart(); // ← получаем метод добавления

	const handleBuyNow = (product: any) => {
		// Берём первый вариант
		const firstVariant = product.variants[0];
		if (!firstVariant) {
			toast.error("Нет доступных вариантов товара", { position: "top-center" });
			return;
		}

		const newItem = {
			productId: product.id,
			productTitle: product.title,
			variantId: firstVariant.id,
			variantTitle: firstVariant.title,
			type: "one-time" as const, // или можно спросить у пользователя, но для "Купить сейчас" — разовый
			price: firstVariant.price,
			itemsCount: firstVariant.items_count,
			subscriptionPrice: firstVariant.subscription_price,
			discountPercent: firstVariant.discount_percent,
			quantity: 1,
		};

		try {
			addItem(newItem);
			toast.success("Товар добавлен в корзину!", { position: "top-center" });
		} catch (err: any) {
			toast.warning(err.message || "Товар уже в корзине", {
				position: "top-center",
			});
		}
	};

	if (isLoading) {
		return (
			<section className="pb-10 px-4">
				<div className="w-full pb-4 max-w-[194px] h-6 bg-gray-200 rounded animate-pulse" />
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
			<TitleComponent className="w-full md:max-w-full pb-2">
				Рекомендовано для вашего ребёнка
			</TitleComponent>
			<Description className="!text-[#515151] pb-4">
				Размер подобран по возрасту и весу
			</Description>

			<div className="grid md:grid-cols-2 grid-cols-1 gap-2">
				{data?.detail.map((el, index) => (
					<Link
						href={`/detail/${el.id}`}
						key={index}
						className="p-3 bg-white border border-[#E4E4E7] rounded-[16px] relative">
						<div className="flex gap-3">
							<div className="relative overflow-hidden rounded-[8px] w-[114px] h-[114px]">
								<Image
									fill
									style={{ objectFit: "cover" }}
									src={el.images[0]?.url}
									alt={el.title}
								/>
							</div>
							<div className="w-[138px] flex flex-col gap-1">
								<div className="flex gap-1">
									<Title>{el.title},</Title>
								</div>
								<Description className="text-[#515151]">
									По подписке
								</Description>

								{el.variants.slice(0, 1).map((item, idx) => (
									<div key={idx}>
										<Description className="text-[#515151]">
											Количество: {item.items_count} шт
										</Description>
										<div>
											<Description className="text-[#0071E3] font-[500] text-[16px]">
												{item.subscription_price} c
												<span className="line-through text-[#515151] text-[14px] ml-1">
													{item.price} c
												</span>
											</Description>
											<Description className="text-[#0071E3] rounded-[32px] absolute top-0 right-0 border border-[#0071E3] p-1 px-2">
												{item.discount_percent}% Скидка
											</Description>
										</div>
									</div>
								))}
							</div>
						</div>

						 
						<button
						 onClick={(e) => {
							e.preventDefault();     
							e.stopPropagation();  
							handleBuyNow(el);
						}}
						type="button"
						className="mt-3 w-full flex items-center bg-[#0071E3] px-8 h-[40px] text-[14px] text-md justify-center font-[600] text-white rounded-[8px]">
							Купить сейчас
						</button>
					</Link>
				))}
			</div>
		</section>
	);
};

export default HomeCards;
