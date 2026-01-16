// src/app/(main)/payment/PaymentComponents.tsx
"use client";

import { useState } from "react";
import PaymentTotal from "./payment-totla/PaymentTotal";
import PaymentForma from "./payment-forma/PaymentForma";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { orderService } from "@/redux/services/orders.service";
import { useCart } from "@/redux/hooks/useCart";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";
type BackendPaymentMethod = "finik" | "balance" | "bonus";

const PaymentComponents = () => {
	const [selectedAddressLabel, setSelectedAddressLabel] = useState("Не выбран");
	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>("finikPay");
	const [isLoading, setIsLoading] = useState(false);

	const { cart, clear } = useCart();

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
		const oneTimeItems = cart.filter((item) => item.type === "one-time");
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
		const items = oneTimeItems.map((item) => ({
			product_variant_id: item.variantId,
			quantity: item.quantity,
		}));

		const payload = {
			address: selectedAddressLabel,
			payment_method: backendPaymentMethod,
			items,
		};

		setIsLoading(true);

		try {
			const response = await orderService.createOneTimeOrder(payload);
			const detail = response.data?.detail;

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
				<PaymentForma
					onAddressChange={handleAddressChange}
					onPaymentMethodChange={handlePaymentMethodChange}
					selectedMethod={selectedPaymentMethod}
				/>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<PaymentTotal onCheckout={handleCheckout} isLoading={isLoading} />
			</div>
		</div>
	);
};

export default PaymentComponents;
