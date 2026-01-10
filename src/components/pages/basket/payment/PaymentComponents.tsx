// src/app/(main)/payment/PaymentComponents.tsx
"use client";

import { useState } from "react";
import PaymentTotal from "./payment-totla/PaymentTotal";
import PaymentForma from "./payment-forma/PaymentForma";
import 'alert-go/dist/notifier.css';
import { toast } from "alert-go";
import { orderService } from "@/redux/services/orders.service";
import { useCart } from "@/redux/hooks/useCart";

const PaymentComponents = () => {
	const [selectedAddressLabel, setSelectedAddressLabel] = useState<string>("Не выбран");
	const [isLoading, setIsLoading] = useState(false);
	const { cart, clear } = useCart(); // ← получаем корзину и метод очистки

	// Обработчик изменения адреса из PaymentForma
	const handleAddressChange = (label: string) => {
		setSelectedAddressLabel(label);
	};

	// Обработчик оформления заказа
	const handleCheckout = async () => {
		if (!selectedAddressLabel || selectedAddressLabel === "Не выбран") {
			toast.error("Пожалуйста, выберите адрес доставки", { position: "top-center" });
			return;
		}

		if (cart.length === 0) {
			toast.error("Корзина пуста", { position: "top-center" });
			return;
		}

		// Формируем payload для отправки
		const items = cart.map((item) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
		}));

		const payload = {
			address: selectedAddressLabel,
			items,
		};

		setIsLoading(true);
		try {
			const response = await orderService.createOneTimeOrder(payload);
			const paymentUrl = response.data?.detail;

			if (typeof paymentUrl === "string" && paymentUrl.trim().startsWith("http")) {
				// Успешно → очищаем корзину
				clear();
				// Редирект на оплату
				window.location.href = paymentUrl;
			} else {
				toast.error("Некорректный ответ от сервера: не получен URL оплаты");
			}
		} catch (error: any) {
			console.error("Order creation failed", error);
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