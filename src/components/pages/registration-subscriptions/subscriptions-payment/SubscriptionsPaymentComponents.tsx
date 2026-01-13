// src/app/(main)/payment/SubscriptionsPaymentComponents.tsx

"use client";

import { useState } from "react";
import 'alert-go/dist/notifier.css';
import { toast } from "alert-go";
import { useCart } from "@/redux/hooks/useCart";
import SubscriptionsPaymentForma from "./payment-forma/SubscriptionsPaymentForma";
import SubscriptionsPaymentTotal from "./payment-totla/SubscriptionsPaymentTotal";
import { useRouter } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";
import { useCreateSubscription } from "@/redux/hooks/useSubscriptions";

const SubscriptionsPaymentComponents = () => {
	const [selectedAddressLabel, setSelectedAddressLabel] = useState<string>("Не выбран");
	const [firstDeliveryDate, setFirstDeliveryDate] = useState<string | null>(null); // ← новое
	const router = useRouter();
	const { cart, clear } = useCart();

	const { mutate: createSubscription, isPending: isLoading } = useCreateSubscription();

	const handleAddressChange = (label: string) => {
		setSelectedAddressLabel(label);
	};

	const handleDeliveryDateChange = (date: string) => {
		setFirstDeliveryDate(date);
	};

	const handleCheckout = () => {
		if (!selectedAddressLabel || selectedAddressLabel === "Не выбран") {
			toast.error("Пожалуйста, выберите адрес доставки", { position: "top-center" });
			return;
		}

		if (!firstDeliveryDate) {
			toast.error("Пожалуйста, выберите дату первой доставки", { position: "top-center" });
			return;
		}

		const subscriptionItems = cart.filter((item) => item.type === "subscription");

		if (subscriptionItems.length === 0) {
			toast.error("Нет товаров по подписке", { position: "top-center" });
			return;
		}

		// 📦 Формируем payload с deliveries
		const items = subscriptionItems.map((item) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
			apply_to: "each_cycle" as const,
		}));

		// Преобразуем дату в ISO формат с временем
		const deliveryDateTime = new Date(firstDeliveryDate);
		// Устанавливаем время, например, 10:00 утра
		deliveryDateTime.setHours(10, 0, 0, 0);
		const isoDate = deliveryDateTime.toISOString(); // "2026-01-12T10:00:00.000Z"

		const payload = {
			main_product_variant_id: subscriptionItems[0].variantId,
			address: selectedAddressLabel,
			deliveries: [isoDate], // ← теперь не пустой!
			items,
		};

		createSubscription(payload, {
			onSuccess: (data) => {
				const paymentUrl = data?.detail;
				if (typeof paymentUrl === "string" && paymentUrl.trim().startsWith("http")) {
					clear();
					window.location.href = paymentUrl;
				} else {
					toast.error("Не удалось получить ссылку для оплаты", { position: "top-center" });
				}
			},
			onError: (error: any) => {
				console.error("Ошибка создания подписки:", error);
				let message = "Не удалось оформить подписку";
				if (error?.response?.data?.detail) {
					message = error.response.data.detail;
				}
				toast.error(String(message), { position: "top-center" });
			},
		});
	};

	return (
		<div className="md:bg-transparent bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
			<div className="md:p-4 p-0 md:w-[50%] w-full">
				<SubscriptionsPaymentForma 
					onAddressChange={handleAddressChange}
					onDeliveryDateChange={handleDeliveryDateChange} // ← передаём
				/>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<SubscriptionsPaymentTotal onCheckout={handleCheckout} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default SubscriptionsPaymentComponents;