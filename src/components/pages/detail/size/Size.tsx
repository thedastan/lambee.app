"use client";

import { useState, useEffect } from "react";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { DetailPro } from "@/redux/models/product.model";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IoStarSharp } from "react-icons/io5";
import { useProductReviews } from "@/redux/hooks/product";
import Button from "@/components/ui/button/Button";
import { toast } from "alert-go";
import 'alert-go/dist/notifier.css';

interface CartItem {
	id: number;
	variantId: number;
	variantTitle: string;
	type: "one-time" | "subscription";
	price: number;
	quantity: number;
	itemsCount: number;
	subscriptionPrice?: number;
	discountPercent?: number;
	productId: number;
	productTitle: string;
}

interface HeroDetailProps {
	product: DetailPro;
	productId: number;
}

const SizeDetail = ({ product, productId }: HeroDetailProps) => {
	const { data } = useProductReviews(productId);
	const allReviews = data?.detail.results || [];
	const reviewCount = allReviews.length;

	const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
	const [selectedOrderType, setSelectedOrderType] = useState<"one-time" | "subscription" | null>(null);

	const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);

  const handleAddToCart = () => {
    if (selectedVariantId === null || selectedOrderType === null || !selectedVariant) {
      toast.warning("Пожалуйста, выберите размер и тип заказа",{position:"top-center"});
      return;
    }
  
    // Убедимся, что цены — числа
    const priceNum = Number(selectedVariant.price);
    const subPriceNum = selectedVariant.subscription_price
      ? Number(selectedVariant.subscription_price)
      : undefined;
  
    if (isNaN(priceNum) || (subPriceNum !== undefined && isNaN(subPriceNum))) {
      console.error("Invalid price values:", selectedVariant);
      toast.error("Ошибка: некорректная цена товара",{position:"top-center"});
      return;
    }
  
    const cartItem: CartItem = {
      id: Date.now(),
      productId: productId,
      productTitle: product.title,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      type: selectedOrderType,
      price: selectedOrderType === "subscription" && subPriceNum !== undefined
        ? subPriceNum
        : priceNum,
      itemsCount: selectedVariant.items_count,
      subscriptionPrice: subPriceNum,
      discountPercent: selectedVariant.discount_percent,
      quantity: 1,
    };
  
    try {
      const raw = localStorage.getItem("cart");
      const existingCart = raw ? JSON.parse(raw) : [];
  
      const isDuplicate = existingCart.some(
        (item: CartItem) =>
          item.productId === cartItem.productId &&
          item.variantId === cartItem.variantId &&
          item.type === cartItem.type
      );
  
      if (isDuplicate) {
        toast.warning("Этот товар уже добавлен в корзину!",{position:"top-center"});
      } else {
        const newCart = [...existingCart, cartItem];
        localStorage.setItem("cart", JSON.stringify(newCart, null, 2)); // + отступы для дебага
        toast.success("Товар добавлен в корзину!",{position:"top-center"});
				window.dispatchEvent(new Event("cartUpdated"));
      }
    } catch (err) {
      console.error("Failed to save cart", err);
      toast.error("Не удалось сохранить товар в корзину",{position:"top-center"});
    }
  };

	return (
		<section className="p-4 w-full bg-white rounded-[8px] border">
			<TitleComponent>Выберите свой размер:</TitleComponent>

			<div className="w-full grid grid-cols-2 gap-2 mt-4">
				{product.variants.map((el) => (
					<div
						key={el.id}
						onClick={() => setSelectedVariantId(el.id)}
						className={`border flex flex-col gap-1 rounded-[8px] p-3 cursor-pointer transition-all duration-200 ${
							selectedVariantId === el.id ? "bg-[#0071E3] text-white" : ""
						}`}
					>
						<Title className="font-semibold">{el.title}</Title>
						<Description
							className={`transition-all duration-200 ${
								selectedVariantId === el.id ? "text-white" : "text-[#515151]"
							}`}
						>
							{el.weight_range} кг
						</Description>
						<Description
							className={`transition-all duration-200 ${
								selectedVariantId === el.id ? "text-white" : "text-[#515151]"
							}`}
						>
							{el.items_count} шт
						</Description>
					</div>
				))}
			</div>

			{selectedVariant && (
				<div className="w-full p-4 border rounded-[8px] flex flex-col gap-2 mt-4">
					<Title className="font-[600]">{product.title}</Title>
					<Description className="flex items-center gap-1">
						<IoStarSharp />
						<IoStarSharp />
						<IoStarSharp />
						<IoStarSharp />
						<IoStarSharp />
						<span className="text-[#515151] ml-2">
							{reviewCount.toLocaleString()} отзывов
						</span>
					</Description>
					<Description className="w-full max-w-[280px]">{product.description}</Description>

					<div className="border-b w-full mt-2" />

					<Description className="text-[#141414] mt-2">Выберите тип заказа:</Description>

					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Подписка */}
						<div
							onClick={() => setSelectedOrderType("subscription")}
							className={`p-3 rounded-[8px] relative border cursor-pointer transition-all duration-200 flex flex-col gap-2 ${
								selectedOrderType === "subscription"
									? "bg-[#0071E3] text-white"
									: ""
							}`}
						>
							<Title className="font-[600] w-full max-w-[185px]">
								По подписке - {selectedVariant.items_count} шт
							</Title>
							<div className="flex items-center gap-1">
								<Title className="font-medium">
									{selectedVariant.subscription_price} сом в месяц
								</Title>
								<span
									className={`line-through ml-1 transition-all duration-200 ${
										selectedOrderType === "subscription" ? "text-white" : "text-gray-500"
									}`}
								>
									{selectedVariant.price} сом
								</span>
							</div>
							<Title
								className={`px-2 py-[1px] uppercase transition-all duration-200 text-[15px] font-[600] rounded-[7px] rounded-tl-none absolute top-0 right-0 ${
									selectedOrderType === "subscription"
										? "bg-[#ffffff] text-[#000000]"
										: "bg-[#0071E3] text-[#ffffff]"
								}`}
							>
								Скидка {selectedVariant.discount_percent}%
							</Title>
						</div>

						{/* Разовый заказ */}
						<div
							onClick={() => setSelectedOrderType("one-time")}
							className={`p-3 rounded-[8px] relative cursor-pointer transition-all duration-200 border ${
								selectedOrderType === "one-time"
									? "bg-[#0071E3] text-white"
									: "border-gray-300"
							}`}
						>
							<div className="flex justify-between">
								<Description className="font-[600]">Разовый заказ</Description>
								<Description>{selectedVariant.price} сом</Description>
							</div>
							<div className="w-full mt-2 max-w-[90px] rounded-[4px] flex justify-center items-center">
								<p
									className={`transition-all duration-200 ${
										selectedOrderType === "one-time" ? "text-white" : "text-gray-600"
									}`}
								>
									{selectedVariant.items_count} шт
								</p>
							</div>
						</div>
					</div>

					<Title className="font-[600] text-center mt-2">Доставка в течение месяца</Title>
					<Button onClick={handleAddToCart} className="w-full max-w-full">
						Добавить в корзину
					</Button>
				</div>
			)}

			<div className="flex flex-col justify-center items-center gap-4 mt-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 w-full">
					{product.benefits.map((el, index) => (
						<div
							key={index}
							className="flex flex-col justify-center items-center w-full max-w-full"
						>
							<div className="bg-[#DCDCDC] relative overflow-hidden w-[40px] h-[40px] rounded-[8px]">
								<Image fill style={{ objectFit: "cover" }} src={el.icon.trim()} alt="icon" />
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