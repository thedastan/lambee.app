"use client";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React, { useState, useEffect, useMemo } from "react";
import { useUserProfile, useCreateShippingAddress } from "@/redux/hooks/user";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";

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
type ModalType = "select" | "add" | null;

// 🔹 Новые типы для частоты доставки
type DeliveryFrequency = "weekly" | "biweekly" | "triweekly" | "monthly";

const DELIVERY_FREQUENCY_OPTIONS = [
	{ value: "weekly", label: "Каждую неделю" },
	{ value: "biweekly", label: "Каждые 2 недели" },
	{ value: "triweekly", label: "Каждые 3 недели" },
	{ value: "monthly", label: "Каждый месяц" },
];

interface PaymentFormaProps {
	onAddressChange?: (label: string) => void;
	onDeliveryDateChange?: (date: string) => void; // ← новое
}

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

const SubscriptionsPaymentForma = ({
	onAddressChange,
	onDeliveryDateChange,
}: PaymentFormaProps) => {
	const { profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();

	const [selectedMethod, setSelectedMethod] =
		useState<PaymentMethod>("finikPay");
	const [modalType, setModalType] = useState<ModalType>(null);
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");
	const [newAddressValue, setNewAddressValue] = useState("");
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// 🔹 Состояния для частоты доставки
	const [selectedFrequency, setSelectedFrequency] =
		useState<DeliveryFrequency | null>(null);
	const [tempFrequency, setTempFrequency] = useState<DeliveryFrequency | null>(
		null
	);
	const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);

	// 🔹 Состояние для даты первой доставки
	const [firstDeliveryDate, setFirstDeliveryDate] = useState<string | null>(
		null
	);

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

	// 2. Формируем опции адресов
	const addressOptions = useMemo(() => {
		if (!profile?.shipping_addresses) return [];
		return profile.shipping_addresses.map((addr) => ({
			id: String(addr.id),
			label: addr.address,
		}));
	}, [profile?.shipping_addresses]);

	// 3. Сохраняем выбранный адрес и уведомляем родителя
	useEffect(() => {
		if (selectedAddressId) {
			localStorage.setItem(PROFILE_ADDRESS_KEY, selectedAddressId);
			const label = addressOptions.find(
				(a) => a.id === selectedAddressId
			)?.label;
			if (label) {
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);
				onAddressChange?.(label);
			}
		}
	}, [selectedAddressId, addressOptions, onAddressChange]);

	// 4. Считаем сумму ТОЛЬКО по подпискам
	useEffect(() => {
		const calculateTotal = () => {
			const raw = localStorage.getItem("cart");
			if (!raw) return 0;

			try {
				const cart: CartItem[] = JSON.parse(raw);
				const subscriptionItems = cart.filter(
					(item) => item.type === "subscription"
				);
				return subscriptionItems.reduce((sum, item) => {
					const price =
						item.subscriptionPrice !== undefined
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

	const closeModal = () => {
		setModalType(null);
	};

	const openSelectModal = () => {
		setModalType("select");
	};

	const openAddModal = () => {
		setNewAddressValue("");
		setModalType("add");
	};

	const handleAddAddress = async () => {
		if (!newAddressValue.trim()) return;

		try {
			await createShippingAddress(newAddressValue.trim());
			await refetchProfile();
			toast.success("Адрес успешно добавлен", { position: "top-center" });
			setModalType("select");
		} catch (err) {
			console.error("Ошибка добавления адреса:", err);
			toast.error("Не удалось добавить адрес.", { position: "top-center" });
		}
	};

	const handleAddressChange = (id: string) => {
		setSelectedAddressId(id);
	};

	const handleSelect = (method: PaymentMethod) => {
		setSelectedMethod(method);
	};

	const isSelected = (method: PaymentMethod) => selectedMethod === method;

	const selectedAddressLabel =
		addressOptions.find((a) => a.id === selectedAddressId)?.label ||
		"Не выбран";

	// 🔹 Частота доставки — логика
	const openFrequencyModal = () => {
		if (!selectedAddressId) {
			toast.warning("Сначала выберите адрес доставки", {
				position: "top-center",
			});
			return;
		}
		setTempFrequency(selectedFrequency);
		setIsFrequencyModalOpen(true);
	};

	const handleFrequencySave = () => {
		if (tempFrequency) {
			setSelectedFrequency(tempFrequency);
		}
		setIsFrequencyModalOpen(false);
	};

	const getFrequencyLabel = () => {
		if (!selectedFrequency) return "Выберите частоту";
		return (
			DELIVERY_FREQUENCY_OPTIONS.find((o) => o.value === selectedFrequency)
				?.label || "Не выбрана"
		);
	};

	// 🔹 Обработка выбора даты
	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = e.target.value;
		setFirstDeliveryDate(date);
		onDeliveryDateChange?.(date);
	};

	// Минимальная дата — сегодня + 3 дня
	const getMinDate = () => {
		const today = new Date();
		today.setDate(today.getDate() + 3);
		return today.toISOString().split("T")[0];
	};

	return (
		<section className="flex flex-col gap-2">
			<div className="bg-[#FFF3E0] flex justify-between items-center px-4 border-b border-[#F0DBB6] h-[64px]">
				<Description className="text-[#0071E3]">Итого</Description>
				<Title className="font-[600]">{totalAmount.toLocaleString()} сом</Title>
			</div>

			<div className="bg-[#FFFDFA] w-full h-[28px]"></div>
			<div className="bg-[#FFFDFA] p-4 flex flex-col gap-3">
				<Input label="Имя *" value={profile?.name || ""} readOnly />
				<Input label="Фамилия *" value={profile?.surname || ""} readOnly />

				{/* Адрес доставки */}
				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={openSelectModal}
						className="w-full h-[48px] px-4 rounded-[8px] text-[16px] font-[400] border border-[#E4E4E7] outline-none transition-all duration-200 text-left">
						{selectedAddressLabel}
					</button>
				</div>

				<Input
					label="Номер телефона *"
					value={profile?.phone ? `+996${profile.phone}` : ""}
					readOnly
				/>

				{/* Частота доставки */}
				<div className="">
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Частота доставки *
					</label>
					<button
						onClick={openFrequencyModal}
						className={`w-full h-[48px] px-4 border-[#E4E4E7] text-[#000000] rounded-[8px] text-[16px] font-[400] border outline-none transition-all duration-200 text-left flex justify-between items-center `}>
						<span>{getFrequencyLabel()}</span>
						<span className="text-[#515151]">
							<svg
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16">
								<path d="M7.5 11L4 7.5l-1 1L7.5 13 12 8.5l-1-1L7.5 11z" />
							</svg>
						</span>
					</button>
				</div>

			 

				<label className="block text-[14px] font-medium text-[#515151] ">
					Дата первой доставки *
				</label>

				<DatePicker
					selected={firstDeliveryDate ? new Date(firstDeliveryDate) : null}
					onChange={(date: Date | null) => {
						if (date) {
							const isoDate = date.toISOString().split("T")[0]; // "2026-01-15"
							setFirstDeliveryDate(isoDate);
							onDeliveryDateChange?.(isoDate);
						}
					}}
					minDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} // минимум через 3 дня
					dateFormat="dd.MM.yyyy"
					calendarClassName="custom-calendar" // для кастомизации
					className="w-full h-[48px] px-4 rounded-[8px] border border-[#E4E4E7] outline-none"
					placeholderText="Выберите дату"
				/>
			</div>

			{/* Модальное окно: выбор адреса */}
			<Modal
				isOpen={modalType === "select"}
				onClose={closeModal}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<CustomRadioGroup
						options={addressOptions}
						name="deliveryAddress"
						value={selectedAddressId}
						onChange={handleAddressChange}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<Button
						className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
						onClick={openAddModal}>
						Добавить ещё адрес
					</Button>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={closeModal}>
							Отмена
						</Button>
						<Button className="w-full" onClick={closeModal}>
							Готово
						</Button>
					</div>
				</div>
			</Modal>

			{/* Модальное окно: добавление адреса */}
			<Modal
				isOpen={modalType === "add"}
				onClose={closeModal}
				title="Добавить адрес">
				<div className="flex flex-col gap-3">
					<Input
						label={
							<>
								Адрес <span className="text-[#FF5F57]">*</span>
							</>
						}
						value={newAddressValue}
						onChange={(e) => setNewAddressValue(e.target.value)}
						placeholder="Введите адрес доставки"
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={closeModal}>
							Отмена
						</Button>
						<Button
							className="w-full"
							onClick={handleAddAddress}
							disabled={isCreating || !newAddressValue.trim()}>
							{isCreating ? "Добавление..." : "Сохранить"}
						</Button>
					</div>
				</div>
			</Modal>

			{/* Модальное окно: выбор частоты доставки */}
			<Modal
				isOpen={isFrequencyModalOpen}
				onClose={() => setIsFrequencyModalOpen(false)}
				title="Частота доставки">
				<div className="flex flex-col gap-4">
					<Description className="text-[14px]">
						Выберите частоту доставки *
					</Description>

					{/* Кастомное поле ввода */}
					<div className="relative">
						<button
							type="button"
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="w-full h-[48px] px-4 rounded-[8px] border border-[#E4E4E7] text-[16px] font-[600] text-left bg-white flex justify-between items-center">
							<span>
								{tempFrequency
									? DELIVERY_FREQUENCY_OPTIONS.find(
											(o) => o.value === tempFrequency
									  )?.label
									: "Выберите частоту"}
							</span>
							<svg
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
								className={`transition-transform ${
									isDropdownOpen ? "rotate-180" : ""
								}`}>
								<path d="M7.5 11L4 7.5l-1 1L7.5 13 12 8.5l-1-1L7.5 11z" />
							</svg>
						</button>

						{/* Выпадающий список */}
						{isDropdownOpen && (
							<div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg z-50 max-h-[100px] overflow-y-auto">
								{DELIVERY_FREQUENCY_OPTIONS.map((option) => (
									<div
										key={option.value}
										onClick={() => {
											setTempFrequency(option.value as DeliveryFrequency);
											setIsDropdownOpen(false);
										}}
										className={`px-4 py-3 cursor-pointer transition-colors ${
											tempFrequency === option.value
												? "bg-[#F0F9FF] border-l-4 border-[#0071E3]"
												: "hover:bg-gray-50"
										}`}>
										{option.label}
									</div>
								))}
							</div>
						)}
					</div>

					<div className="border-b mt-2"></div>

					{/* Кнопки */}
					<div className="flex gap-3 mt-3">
						<Button
							className="flex-1 border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsFrequencyModalOpen(false)}>
							Отмена
						</Button>
						<Button
							className="flex-1"
							onClick={handleFrequencySave}
							disabled={!tempFrequency}>
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

export default SubscriptionsPaymentForma;
