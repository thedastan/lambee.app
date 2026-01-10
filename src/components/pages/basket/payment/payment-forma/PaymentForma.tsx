"use client";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React, { useState, useEffect, useMemo } from "react";
import { useUserProfile } from "@/redux/hooks/user"; // ← подключаем

// Тот же CartItem, что и в других компонентах
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

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonuses";

interface PaymentFormaProps {
	onAddressChange?: (label: string) => void;
}

// Ключи для localStorage — такие же, как в ProfileAddress
const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

const PaymentForma = ({ onAddressChange }: PaymentFormaProps) => {
	const { profile } = useUserProfile(); // ← получаем профиль

	const [selectedMethod, setSelectedMethod] =
		useState<PaymentMethod>("finikPay");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");
	const [totalAmount, setTotalAmount] = useState<number>(0);

	// 1. Загружаем сохранённый адрес при монтировании
	useEffect(() => {
		if (profile?.shipping_addresses) {
			const savedId = localStorage.getItem(PROFILE_ADDRESS_KEY);
			if (
				savedId &&
				profile.shipping_addresses.some((addr) => String(addr.id) === savedId)
			) {
				setSelectedAddressId(savedId);
			}
		}
	}, [profile?.shipping_addresses]);

	useEffect(() => {
		if (selectedAddressId) {
			localStorage.setItem(PROFILE_ADDRESS_KEY, selectedAddressId);
			const label = addressOptions.find((a) => a.id === selectedAddressId)?.label;
			if (label) {
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);
				onAddressChange?.(label); // ← вызываем колбэк
			}
		}
	}, [selectedAddressId,  , onAddressChange]);

	// 2. Формируем опции адресов
	const addressOptions = useMemo(() => {
		if (!profile?.shipping_addresses) return [];
		return profile.shipping_addresses.map((addr) => ({
			id: String(addr.id),
			label: addr.address,
		}));
	}, [profile?.shipping_addresses]);

	// 3. Сохраняем выбранный адрес в localStorage при изменении
	useEffect(() => {
		if (selectedAddressId) {
			localStorage.setItem(PROFILE_ADDRESS_KEY, selectedAddressId);
			const label = addressOptions.find(
				(a) => a.id === selectedAddressId
			)?.label;
			if (label) {
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);
			}
		}
	}, [selectedAddressId, addressOptions]);

	// 4. Считаем общую сумму корзины
	useEffect(() => {
		const calculateTotal = () => {
			const raw = localStorage.getItem("cart");
			if (!raw) return 0;

			try {
				const cart: CartItem[] = JSON.parse(raw);
				return cart.reduce((sum, item) => {
					const price =
						item.type === "subscription" && item.subscriptionPrice !== undefined
							? item.subscriptionPrice
							: item.price;
					return sum + price * item.quantity;
				}, 0);
			} catch (e) {
				console.error("Failed to calculate total from cart", e);
				return 0;
			}
		};

		setTotalAmount(calculateTotal());
	}, []);

	const handleSelect = (method: PaymentMethod) => {
		setSelectedMethod(method);
	};

	const isSelected = (method: PaymentMethod) => selectedMethod === method;

	// Получаем текст выбранного адреса
	const selectedAddressLabel =
		addressOptions.find((a) => a.id === selectedAddressId)?.label ||
		"Не выбран";

	return (
		<section className="flex flex-col gap-2">
			<div className="bg-[#FFF3E0] flex justify-between items-center px-4 border-b border-[#F0DBB6] h-[64px]">
				<Description className="text-[#0071E3]">Итого</Description>
				<Title className="font-[600]">{totalAmount.toLocaleString()} сом</Title>
			</div>

			<div className="bg-[#FFFDFA] w-full h-[28px]"></div>
			<div className="bg-[#FFFDFA] p-4 flex flex-col gap-3">
				<Input label="Имя *" value={profile?.name}/>
				<Input label="Фамилия *" value={profile?.surname}/>

				{/* Адрес доставки — как в ProfileAddress */}
				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={() => setIsModalOpen(true)}
						className="w-full h-[48px] px-4 rounded-[8px] text-[16px] font-[600] border border-[#E4E4E7] outline-none transition-all duration-200 text-left">
						{selectedAddressLabel}
					</button>
				</div>

				<Input label="Номер телефона *" value={"+996" + profile?.phone}/>
			</div>

			{/* Модальное окно выбора адреса */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<CustomRadioGroup
						options={addressOptions}
						name="deliveryAddress"
						value={selectedAddressId}
						onChange={setSelectedAddressId}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalOpen(false)}>
							Готово
						</Button>
					</div>
				</div>
			</Modal>

			<div className="flex flex-col gap-4 bg-[#FFFDFA] p-4">
				<Title>Способ оплаты</Title>

				<div className="rounded-[8px] bg-white">
					{/* Finik Pay */}
					<div
						className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
							isSelected("finikPay") ? "border-[#0071E3]" : "border-[#DEDEDE]"
						} rounded-tr-[8px] rounded-tl-[8px]`}
						onClick={() => handleSelect("finikPay")}>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="paymentMethod"
								className="sr-only"
								checked={isSelected("finikPay")}
								readOnly
							/>
							<label className="flex items-center text-[14px] gap-2 cursor-pointer">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										isSelected("finikPay")
											? "border-[#0071E3] bg-[#0071E3]"
											: "border-[#DEDEDE]"
									}`}>
									<span
										className={`w-2 h-2 rounded-full ${
											isSelected("finikPay") ? "bg-white" : "bg-transparent"
										}`}></span>
								</span>
								Finik Pay
							</label>
						</div>

						<span className="bg-[#0071E3] text-white text-[12px] px-2 py-1 rounded-[6px] font-[500]">
							КЭШБЕК 5%
						</span>
					</div>

					{/* Баланс Lambee */}
					<div
						className={`flex items-center justify-between border ${
							isSelected("lambeeBalance")
								? "border-[#0071E3]"
								: "border-[#DEDEDE]"
						} px-4 py-3 cursor-pointer`}
						onClick={() => handleSelect("lambeeBalance")}>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="paymentMethod"
								className="sr-only"
								checked={isSelected("lambeeBalance")}
								readOnly
							/>
							<label className="flex items-center text-[14px] gap-2 cursor-pointer">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										isSelected("lambeeBalance")
											? "border-[#0071E3] bg-[#0071E3]"
											: "border-[#DEDEDE]"
									}`}>
									<span
										className={`w-2 h-2 rounded-full ${
											isSelected("lambeeBalance")
												? "bg-white"
												: "bg-transparent"
										}`}></span>
								</span>
								Баланс Lambee
							</label>
						</div>

						<span className="bg-[#0071E3] text-white text-[12px] px-2 py-1 rounded-[6px] font-[500]">
							КЭШБЕК 5%
						</span>
					</div>

					{/* Бонусы */}
					<div
						className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
							isSelected("bonuses") ? "border-[#0071E3]" : "border-[#DEDEDE]"
						} rounded-br-[8px] rounded-bl-[8px]`}
						onClick={() => handleSelect("bonuses")}>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="paymentMethod"
								className="sr-only"
								checked={isSelected("bonuses")}
								readOnly
							/>
							<label className="flex items-center text-[14px] gap-2 cursor-pointer">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										isSelected("bonuses")
											? "border-[#0071E3] bg-[#0071E3]"
											: "border-[#DEDEDE]"
									}`}>
									<span
										className={`w-2 h-2 rounded-full ${
											isSelected("bonuses") ? "bg-white" : "bg-transparent"
										}`}></span>
								</span>
								Бонусы - 500
							</label>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PaymentForma;
