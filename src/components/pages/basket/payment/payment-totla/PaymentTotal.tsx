"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image"; // ← удаляем импорт статичной img

// Обновлённый интерфейс
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
	imageUrl: string; // ← обязательно
}

interface PaymentTotalProps {
	onCheckout: () => void;
	isLoading?: boolean;
}

const PaymentTotal = ({ onCheckout, isLoading = false }: PaymentTotalProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [orderTotal, setOrderTotal] = useState(0);
	const [deliveryCost, setDeliveryCost] = useState(0);
	const [totalWithDelivery, setTotalWithDelivery] = useState(0);

	useEffect(() => {
		const loadCart = () => {
			try {
				const raw = localStorage.getItem("cart");
				if (!raw) {
					setCartItems([]);
					setOrderTotal(0);
					setDeliveryCost(0);
					setTotalWithDelivery(0);
					return;
				}

				const items: CartItem[] = JSON.parse(raw);
				setCartItems(items);

				let orderSum = 0;
				items.forEach((item) => {
					const price =
						item.type === "subscription" && item.subscriptionPrice !== undefined
							? item.subscriptionPrice
							: item.price;
					orderSum += price * item.quantity;
				});

				const delivery = orderSum >= 15000 ? 0 : 0;
				setOrderTotal(orderSum);
				setDeliveryCost(delivery);
				setTotalWithDelivery(orderSum + delivery);
			} catch (e) {
				console.error("Failed to load cart in PaymentTotal", e);
				setCartItems([]);
				setOrderTotal(0);
				setDeliveryCost(0);
				setTotalWithDelivery(0);
			}
		};

		loadCart();
	}, []);

	const formatPrice = (price: number) => `${price.toLocaleString()} сом`;

	return (
		<section className="bg-[#FFFDFA] p-4">
			{cartItems.length > 0 && (
				<Description className="text-[16px]">
					{cartItems.some((item) => item.type === "subscription")
						? "По подписке"
						: "Разовый заказ"}
				</Description>
			)}

			{cartItems.map((item) => {
				const originalPrice = item.price * item.quantity;
				const actualPrice =
					item.type === "subscription" && item.subscriptionPrice !== undefined
						? item.subscriptionPrice * item.quantity
						: originalPrice;

				return (
					<div key={item.id} className="py-2 flex justify-between items-center">
						<div className="flex items-center justify-start gap-3">
							<div className="relative overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
								{item.imageUrl ? (
									<Image
										src={item.imageUrl}
										alt={`${item.productTitle} ${item.variantTitle}`}
										fill
										className="rounded-[8px] object-cover"
									/>
								) : (
									<div className="w-full h-full bg-gray-100 rounded-[8px] flex items-center justify-center text-xs text-gray-400">
										Нет фото
									</div>
								)}
								<div className="bg-black border-2 border-gray-300 text-white py-0 px-2 rounded-[8px] absolute top-0 right-0">
									{item.quantity}
								</div>
							</div>
							<div>
								<Description>
									{item.productTitle} - <span className="font-medium">{item.variantTitle}</span>
								</Description>
								<Description className="text-[#515151]">
									{item.type === "subscription" ? "Подписка" : "Разовый заказ"}
								</Description>
							</div>
						</div>
						<Description>
							{item.type === "subscription" && item.subscriptionPrice !== undefined ? (
								<>
									<span className="line-through text-[#515151] mr-1">
										{formatPrice(originalPrice)}
									</span>
									{formatPrice(actualPrice)}
								</>
							) : (
								formatPrice(actualPrice)
							)}
						</Description>
					</div>
				);
			})}

			{cartItems.length === 0 && (
				<Description className="text-gray-500 py-4 text-center">Корзина пуста</Description>
			)}

			{cartItems.length > 0 && (
				<div className="flex flex-col gap-3 mt-4">
					<div className="flex items-center justify-between">
						<Description className="text-[12px]">Сумма заказа</Description>
						<Description className="text-[#0071E3] font-[500] text-[12px]">
							{formatPrice(orderTotal)}
						</Description>
					</div>

					<div className="flex items-center justify-between">
						<Description className="text-[12px]">Доставка</Description>
						<Description className="text-[12px]">
							{deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost)}
						</Description>
					</div>

					<div className="flex items-center justify-between">
						<Description>Итого:</Description>
						<Description className="font-bold">{formatPrice(totalWithDelivery)}</Description>
					</div>
				</div>
			)}

			{cartItems.length > 0 && (
				<Button className="w-full mt-4" onClick={onCheckout} disabled={isLoading}>
					{isLoading ? "Оформление..." : "Перейти к оплате"}
				</Button>
			)}

			<Description className="text-[#0000008F] mt-4">
				Ваш адрес доставки будет сохранен, чтобы было легче оформлять товары
			</Description>
		</section>
	);
};

export default PaymentTotal;