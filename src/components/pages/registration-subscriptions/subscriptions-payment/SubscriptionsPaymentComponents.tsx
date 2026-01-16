// src/app/(main)/payment/SubscriptionsPaymentComponents.tsx
"use client";

import { useState } from "react";
import 'alert-go/dist/notifier.css';
import { toast } from "alert-go";
import { useCart } from "@/redux/hooks/useCart";
import SubscriptionsPaymentForma from "./payment-forma/SubscriptionsPaymentForma";
import SubscriptionsPaymentTotal from "./payment-totla/SubscriptionsPaymentTotal";
import { useCreateSubscription } from "@/redux/hooks/useSubscriptions";
import { translateErrorMessage } from "@/lib/errorTranslations";

const SubscriptionsPaymentComponents = () => {
	const [selectedAddressLabel, setSelectedAddressLabel] = useState<string>("Не выбран");
	const [deliveryDates, setDeliveryDates] = useState<string[]>([]); // ← массив!
	const [paymentMethod, setPaymentMethod] = useState<'finik' | 'balance'>('finik');

	const { cart, clear } = useCart();
	const { mutate: createSubscription, isPending: isLoading } = useCreateSubscription();

	const handleAddressChange = (label: string) => {
		setSelectedAddressLabel(label);
	};

	// ✅ Новый обработчик — принимает массив дат
	const handleDeliveryDatesChange = (dates: string[]) => {
		setDeliveryDates(dates);
	};

	const handlePaymentMethodChange = (method: 'finik' | 'balance') => {
		setPaymentMethod(method);
	};

	const handleCheckout = () => {
		if (!selectedAddressLabel || selectedAddressLabel === "Не выбран") {
			toast.error("Пожалуйста, выберите адрес доставки", { position: "top-center" });
			return;
		}

		if (deliveryDates.length === 0) {
			toast.error("Пожалуйста, выберите хотя бы одну дату доставки", { position: "top-center" });
			return;
		}

		const subscriptionItems = cart.filter((item) => item.type === "subscription");
		if (subscriptionItems.length === 0) {
			toast.error("Нет товаров по подписке", { position: "top-center" });
			return;
		}

		const items = subscriptionItems.map((item) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
			apply_to: "each_cycle" as const,
		}));

		// ✅ Преобразуем ВСЕ даты в ISO с временем 10:00
		const deliveries = deliveryDates.map(dateStr => {
			const d = new Date(dateStr);
			d.setHours(10, 0, 0, 0);
			return d.toISOString(); // "2026-01-15T10:00:00.000Z"
		});

		const payload = {
			main_product_variant_id: subscriptionItems[0].variantId,
			address: selectedAddressLabel,
			deliveries, // ← весь массив!
			payment_method: paymentMethod,
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
					message = translateErrorMessage(error.response.data.detail);
				}
				toast.error(String(message), { position: "top-center" });
			},
		});
	};

	const subscriptionItems = cart.filter((item) => item.type === "subscription");
	const totalAmount = subscriptionItems.reduce((sum, item) => sum + (item.subscriptionPrice ?? item.price) * item.quantity, 0);
	const savedAmount = subscriptionItems.reduce((sum, item) => {
		if (item.subscriptionPrice !== undefined) {
			return sum + (item.price - item.subscriptionPrice) * item.quantity;
		}
		return sum;
	}, 0);

	return (
		<div className="md:bg-transparent bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
			<div className="md:p-4 p-0 md:w-[50%] w-full">
				<SubscriptionsPaymentForma 
					onAddressChange={handleAddressChange}
					onDeliveryDatesChange={handleDeliveryDatesChange}  
					onPaymentMethodChange={handlePaymentMethodChange}
				/>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<SubscriptionsPaymentTotal
					totalAmount={totalAmount}
					savedAmount={savedAmount}
					onCheckout={handleCheckout}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default SubscriptionsPaymentComponents;