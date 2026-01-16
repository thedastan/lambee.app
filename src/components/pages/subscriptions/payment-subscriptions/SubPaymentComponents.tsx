// src/app/(main)/payment/PaymentComponents.tsx
"use client";

import { useState } from "react";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { useCart } from "@/redux/hooks/useCart";
import PaymentSubForma from "./payment-sub-forma/PaymentSubForma";
import PaymentSubTotal from "./payment-sub-totla/PaymentSubTotal";
import { subscriptionsService } from "@/redux/services/subscription.service";
import { ICreateSubscriptionPayload } from "@/redux/models/subscription.model";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";
type BackendPaymentMethod = "finik" | "balance" | "bonus";

const SubPaymentComponents = () => {
	const [selectedAddressLabel, setSelectedAddressLabel] = useState("Не выбран");
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>("finikPay");
	const [isLoading, setIsLoading] = useState(false);

	const { cart, clear } = useCart();


	const oneTimeItems = cart.filter((item) => item.type === "subscription");

	 
	const savedAmount = oneTimeItems.reduce((sum, item) => {
		if (item.subscriptionPrice !== undefined) {
			return sum + (item.price - item.subscriptionPrice) * item.quantity;
		}
		return sum;
	}, 0);

	// 🧠 Нормализация ошибок от бэка
	const getErrorMessage = (detail?: string) => {
		if (detail === "Unauthorized") {
			return "Сначала войдите в аккаунт или зарегистрируйтесь";
		}
		return detail || "Не удалось оформить заказ";
	};

	const handleAddressChange = (label: string) => {
		setSelectedAddressLabel(label);
	};

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		setSelectedPaymentMethod(method);
	};

	const handleCheckout = async () => {
		// 🛑 Проверка адреса
		if (selectedAddressLabel === "Не выбран") {
			toast.error("Пожалуйста, выберите адрес доставки", {
				position: "top-center",
			});
			return;
		}

		// 🛒 Только разовые товары
		const oneTimeItems = cart.filter((item) => item.type === "subscription");
		if (oneTimeItems.length === 0) {
			toast.error("Нет товаров для оформления заказа", {
				position: "top-center",
			});
			return;
		}

		// 💳 Маппинг метода оплаты
		let backendPaymentMethod: BackendPaymentMethod | null = null;

		if (selectedPaymentMethod === "finikPay") {
			backendPaymentMethod = "finik";
		} else if (selectedPaymentMethod === "lambeeBalance") {
			backendPaymentMethod = "balance";
		} else if (selectedPaymentMethod === "bonus") {
			backendPaymentMethod = "bonus"; // ← уточните у бэка точное значение
		} else {
			toast.error("Неизвестный способ оплаты", { position: "top-center" });
			return;
		}

		// 📦 items только с нужными полями
		const subscriptionItems = cart.filter((item) => item.type === "subscription");
		if (subscriptionItems.length === 0) {
			toast.error("Нет товаров для оформления подписки", { position: "top-center" });
			return;
		}
	
		// 🔑 Основной товар — первый в списке
		const mainProduct = subscriptionItems[0];
	
		// 📦 Дополнительные товары (все кроме основного)
		const items = oneTimeItems.map((item) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
			apply_to: "each_cycle" as const,
		}));
	
		// 📅 Даты доставки — пока заглушка (замените на реальные!)
		const now = new Date();
		now.setDate(now.getDate() + 3);
		now.setHours(10, 0, 0, 0);
		const deliveryDate = now.toISOString().replace('Z', '+06:00'); // Asia/Bishkek
	
		const payload: ICreateSubscriptionPayload = {
			main_product_variant_id: mainProduct.variantId, // ← обязательно
			address: selectedAddressLabel,                 // ← есть
			deliveries: [deliveryDate],                    // ← обязательно (массив!)
			payment_method: backendPaymentMethod,          // ← есть
			items,                      
		};

		setIsLoading(true);

		try {
			const response = await subscriptionsService.createSubscription(payload);
			const detail = response.detail;

			// ✅ Если вернулся URL оплаты
			if (typeof detail === "string" && detail.startsWith("http")) {
				clear();
				toast.success("Заказ создан! Перенаправляем на оплату...", {
					position: "top-center",
				});
				window.location.href = detail;
				return;
			}

			// ❌ Если бэк вернул ошибку
			toast.error(getErrorMessage(detail), {
				position: "top-center",
			});
		} catch (error: any) {
			console.error("Order creation failed", error);

			const backendDetail = error?.response?.data?.detail;
			const message = getErrorMessage(backendDetail);

			toast.error(message, { position: "top-center" });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="md:bg-transparent bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
			<div className="md:p-4 p-0 md:w-[50%] w-full">
				<PaymentSubForma
					onAddressChange={handleAddressChange}
					onPaymentMethodChange={handlePaymentMethodChange}
					selectedMethod={selectedPaymentMethod}
				/>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<PaymentSubTotal savedAmount={savedAmount} onCheckout={handleCheckout} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default SubPaymentComponents;
