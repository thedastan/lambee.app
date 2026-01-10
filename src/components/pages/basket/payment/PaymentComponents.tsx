// src/app/(main)/payment/PaymentComponents.tsx
"use client";

import { useState, useEffect } from "react";
import PaymentTotal from "./payment-totla/PaymentTotal";
import PaymentForma from "./payment-forma/PaymentForma";
import 'alert-go/dist/notifier.css';
import { toast } from "alert-go";
import { orderService } from "@/redux/services/orders.service";

const PaymentComponents = () => {
	const [selectedAddressLabel, setSelectedAddressLabel] = useState<string>("Не выбран");
	const [isLoading, setIsLoading] = useState(false);

	// Обработчик изменения адреса из PaymentForma
	const handleAddressChange = (label: string) => {
		setSelectedAddressLabel(label);
	};

	// Обработчик оформления заказа
	const handleCheckout = async () => {
		if (!selectedAddressLabel || selectedAddressLabel === "Не выбран") {
			toast.error("Пожалуйста, выберите адрес доставки",{position:"top-center"});
			return;
		}

		// Загружаем корзину из localStorage
		const rawCart = localStorage.getItem("cart");
		if (!rawCart) {
			toast.error("Корзина пуста",{position:"top-center"});
			return;
		}

		let cartItems: any[];
		try {
			cartItems = JSON.parse(rawCart);
		} catch (e) {
			console.error("Failed to parse cart", e);
			toast.error("Ошибка чтения корзины",{position:"top-center"});
			return;
		}

		// Формируем payload для отправки
		const items = cartItems.map((item: any) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
		}));

		const payload = {
			address: selectedAddressLabel,
			items,
		};

		setIsLoading(true);
		try {
			// Отправляем запрос на создание заказа
			const response = await orderService.createOneTimeOrder(payload);

			// Ожидаем, что бэкенд вернёт URL оплаты в response.data.detail
			const paymentUrl = response.data?.detail;

			if (typeof paymentUrl === "string" && paymentUrl.trim().startsWith("http")) {
				// Редирект на внешний URL (Finik QR)
				window.location.href = paymentUrl;
			} else {
				toast.error("Некорректный ответ от сервера: не получен URL оплаты");
			}
		} catch (error: any) {
			console.error("Order creation failed", error);

			// Пытаемся извлечь сообщение об ошибке
			let message = "Не удалось оформить заказ";
			if (error?.response?.data?.detail) {
				message = error.response.data.detail;
			} else if (error?.message) {
				message = error.message;
			}

			toast.error(String(message));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="md:bg-transparent bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
			<div className="md:p-4 p-0 md:w-[50%] w-full">
				<PaymentForma onAddressChange={handleAddressChange} />
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<PaymentTotal onCheckout={handleCheckout} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default PaymentComponents;