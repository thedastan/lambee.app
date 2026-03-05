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
	const [selectedAddress, setSelectedAddress] = useState<{
		city_id: number;
		street: string;
	} | null>(null);
	const [frequencyData, setFrequencyData] = useState<{
		id: number;
		weekday: number;
	} | null>(null);
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>("finikPay");
	const [isLoading, setIsLoading] = useState(false);

	const { cart, clear } = useCart();

	// Фильтруем товары для подписки
	const subscriptionItems = cart.filter((item) => item.type === "subscription");

	// Расчет экономии
	const savedAmount = subscriptionItems.reduce((sum, item) => {
		if (item.subscriptionPrice !== undefined) {
			return sum + (item.price - item.subscriptionPrice) * item.quantity;
		}
		return sum;
	}, 0);

	const handleAddressChange = (city_id: number, street: string) => {
		setSelectedAddress({ city_id, street });
	};

	const handleFrequencyChange = (frequency_id: number, weekday: number) => {
		setFrequencyData({ id: frequency_id, weekday });
	};

	const handleCheckout = async () => {
		// 1. Валидация адреса
		if (!selectedAddress) {
			toast.error("Пожалуйста, выберите адрес доставки", {
				position: "top-center",
			});
			return;
		}

		// 2. Валидация частоты (вот тут срабатывала ошибка, если данные не пришли)
		if (!frequencyData) {
			toast.error("Пожалуйста, выберите день и частоту доставки", {
				position: "top-center",
			});
			return;
		}

		if (subscriptionItems.length === 0) {
			toast.error("В корзине нет товаров для подписки", {
				position: "top-center",
			});
			return;
		}

		// 3. Маппинг метода оплаты
		const backendPaymentMethod: BackendPaymentMethod =
			selectedPaymentMethod === "finikPay"
				? "finik"
				: selectedPaymentMethod === "lambeeBalance"
				? "balance"
				: "bonus";

		// 4. Формирование состава (items теперь массив по документации)
		const items = subscriptionItems.map((item) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
			apply_to: "each_cycle", 
		}));

		// 5. Формирование Payload по документации
		const payload: ICreateSubscriptionPayload = {
			main_product_variant_id: subscriptionItems[0].variantId,
			city_id: selectedAddress.city_id,
			street: selectedAddress.street,
			frequency_id: frequencyData.id,
			weekday: frequencyData.weekday,
			payment_method: backendPaymentMethod,
			items: items, // Теперь массив совпадает с типом в модели
		};

		setIsLoading(true);

		try {
			const response = await subscriptionsService.createSubscription(payload);
			const detail = response.detail;

			if (typeof detail === "string" && detail.startsWith("http")) {
				clear();
				toast.success("Подписка оформлена! Перенаправляем на оплату...", {
					position: "top-center",
				});
				window.location.href = detail;
				return;
			}

			toast.error(detail || "Ошибка при создании подписки", {
				position: "top-center",
			});
		} catch (error: any) {
			const backendDetail = error?.response?.data?.detail;
			toast.error(
				typeof backendDetail === "string" ? backendDetail : "Ошибка сервера",
				{ position: "top-center" }
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="md:bg-transparent bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
			<div className="md:p-4 p-0 md:w-[50%] w-full">
				<PaymentSubForma
					onAddressChange={handleAddressChange}
					onFrequencyChange={handleFrequencyChange} // Передаем хэндлер частоты
					onPaymentMethodChange={setSelectedPaymentMethod}
					selectedMethod={selectedPaymentMethod}
					savedAmount={savedAmount}
				/>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<PaymentSubTotal onCheckout={handleCheckout} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default SubPaymentComponents;
