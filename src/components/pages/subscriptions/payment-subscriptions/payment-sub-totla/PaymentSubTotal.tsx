"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import ModalBottom from "@/components/ui/modal/ModalBottom";
import { Title } from "@/components/ui/text/Title";
import Link from "next/link";
import { GoChevronUp } from "react-icons/go";
import AlertCircle from "@/assets/svg/AlertCircle";

interface CartItem {
	id: number;
	variantId: number;
	variantTitle: string;
	type: "one-time" | "subscription";
	price: number;
	quantity: number;
	itemsCount: number;
	subscriptionPrice?: number; // лучше указать тип number, а не any
	discountPercent?: number;
	productId: number;
	productTitle: string;
	imageUrl: string;
}

interface PaymentSubTotalProps {
	onCheckout: () => void;
	isLoading?: boolean;
}

const PaymentSubTotal = ({ onCheckout, isLoading = false }: PaymentSubTotalProps) => {
	const [subscriptionItems, setSubscriptionItems] = useState<CartItem[]>([]);
	const [subscriptionTotal, setSubscriptionTotal] = useState(0); // сумма к оплате
	const [deliveryCost, setDeliveryCost] = useState(0);
	const [totalWithDelivery, setTotalWithDelivery] = useState(0);
	const [isModal, setIsModal] = useState(false);

	const calculateDeliveryCost = (total: number): number => {
		if (total >= 1000) return 0;
		if (total >= 800) return 90;
		return 130;
	};

	useEffect(() => {
		const loadCart = () => {
			try {
				const raw = localStorage.getItem("cart");
				if (!raw) {
					setSubscriptionItems([]);
					setSubscriptionTotal(0);
					setDeliveryCost(0);
					setTotalWithDelivery(0);
					return;
				}

				const allItems: CartItem[] = JSON.parse(raw);

				// 🔥 Фильтруем ТОЛЬКО подписки
				const items = allItems.filter((item) => item.type === "subscription");

				let total = 0;
				items.forEach((item) => {
					const price = item.subscriptionPrice ?? item.price; // fallback на обычную цену
					total += price * item.quantity;
				});

				const delivery = calculateDeliveryCost(total);
				const finalTotal = total + delivery;

				setSubscriptionItems(items);
				setSubscriptionTotal(total);
				setDeliveryCost(delivery);
				setTotalWithDelivery(finalTotal);
			} catch (e) {
				console.error("Failed to load cart in PaymentSubTotal", e);
				setSubscriptionItems([]);
				setSubscriptionTotal(0);
				setDeliveryCost(0);
				setTotalWithDelivery(0);
			}
		};

		loadCart();
	}, []);

	const formatPrice = (price: number) => `${price.toLocaleString()} сом`;

	return (
		<section className="bg-[#FFFDFA] p-4">
			{subscriptionItems.length > 0 && (
				<Description className="text-[16px]">Подписка</Description>
			)}

			{subscriptionItems.map((item) => {
				const regularPrice = item.price * item.quantity;
				const subscriptionPrice = (item.subscriptionPrice ?? item.price) * item.quantity;

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
									{item.productTitle} -{" "}
									<span className="font-medium">{item.variantTitle}</span>
								</Description>
								<Description className="text-[#515151]">Подписка</Description>
								<Description className="text-[#515151]">
									{item.itemsCount * item.quantity} шт
								</Description>
							</div>
						</div>
						<Description className="flex gap-3">
							<span className="line-through text-gray-600">
								{formatPrice(regularPrice)}
							</span>
							{formatPrice(subscriptionPrice)}
						</Description>
					</div>
				);
			})}

			{subscriptionItems.length === 0 && (
				<Description className="text-gray-500 py-4 text-center">
					Нет товаров по подписке
				</Description>
			)}

			{subscriptionItems.length > 0 && (
				<div className="flex flex-col gap-3 mt-4">
					<div className="flex items-center justify-between">
						<Description className="text-[12px]">Сумма подписки</Description>
						<Description className="text-[#0071E3] font-[500] text-[12px]">
							{formatPrice(subscriptionTotal)}
						</Description>
					</div>

					<div className="flex items-center justify-between">
						<Description className="text-[12px]">Доставка</Description>
						<Description className="text-[12px] flex items-center gap-1">
							{deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost)}
							<span onClick={() => setIsModal(true)}>
								<AlertCircle />
							</span>
						</Description>
					</div>

					<div className="flex items-center justify-between">
						<Description>Итого:</Description>
						<Description className="font-bold">
							{formatPrice(totalWithDelivery)}
						</Description>
					</div>
				</div>
			)}

			{subscriptionItems.length > 0 && (
				<Button
					className="w-full mt-4"
					onClick={onCheckout}
					disabled={isLoading}>
					{isLoading ? "Оформление..." : "Перейти к оплате"}
				</Button>
			)}

			<Description className="text-[#0000008F] mt-4">
				Ваш адрес доставки будет сохранен, чтобы было легче оформлять товары
			</Description>

			{/* Модальное окно с тарифами */}
			<ModalBottom
				isOpen={isModal}
				onClose={() => {
					setIsModal(false);
				}}
				title="Доставка">
				<div className="flex flex-col gap-3">
					<div className="rounded-[8px] p-3 bg-[#FAF9FF] flex flex-col gap-1">
						<Title className="font-semibold">Курьер приедет за 20-25 мин</Title>
						<Description>Режим работы 09:00 - 23:00</Description>
					</div>

					<div className="p-3 flex flex-col gap-1 pb-3 border-b">
						<div className="flex justify-between gap-2">
							<Description>Условия</Description>
							<Title>Корзина</Title>
						</div>
						<div className="flex justify-between gap-2">
							<Description>Доставка 130 сом</Description>
							<Title className="font-semibold">от 0 сом</Title>
						</div>
						<div className="flex justify-between gap-2">
							<Description>Доставка 90 сом</Description>
							<Title className="font-semibold">от 800 сом</Title>
						</div>
						<div className="flex justify-between gap-2">
							<Description>Бесплатная доставка</Description>
							<Title className="font-semibold">от 1000 сом</Title>
						</div>
					</div>

					<div className="rounded-[8px] p-3 bg-[#FAF9FF] flex flex-col gap-2">
						<div className="flex justify-between">
							<Title className="font-semibold">Информация о магазине</Title>
							<Description>
								<GoChevronUp size={23} />
							</Description>
						</div>
						<Description>улица Саякбая Каралаева, 64</Description>
						<Description>
							Исполнитель (продавец) ОсОО “Агрико Групп” г. Бишкек, ул. Калык
							Акиева, 66 ТЦ “Весна” ИНН 01306201410125
						</Description>
						<Description>Доставляем: с 9:00 до 23:00</Description>
						<Description>
							Подробнее -{" "}
							<Link href="https://lambee.kg" target="_blank" rel="noopener noreferrer">
								https://lambee.kg
							</Link>
						</Description>
					</div>

					<div className="flex gap-3 w-full mt-1">
						<Button className="w-full" onClick={() => setIsModal(false)}>
							Хорошо
						</Button>
					</div>
				</div>
			</ModalBottom>
		</section>
	);
};

export default PaymentSubTotal;