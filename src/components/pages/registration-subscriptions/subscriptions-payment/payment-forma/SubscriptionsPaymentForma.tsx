// src/app/(main)/payment/payment-forma/SubscriptionsPaymentForma.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useUserProfile, useCreateShippingAddress } from "@/redux/hooks/user";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";

import GuestAddressModal from "./GuestAddressModal";
import DeliveryDatePicker from "./DeliveryDatePicker";
import PaymentMethodSection from "./PaymentMethodSection";
import { IoCheckmark } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

// Типы
type PaymentMethod = "finikPay" | "lambeeBalance" | "bonuses";
type DeliveryFrequency = "weekly" | "biweekly" | "triweekly" | "monthly";
type ModalType = "select" | "add" | "guest-address" | null;

const DELIVERY_FREQUENCY_OPTIONS = [
	{ value: "weekly", label: "Каждую неделю" },
	{ value: "biweekly", label: "Каждые 2 недели" },
	{ value: "triweekly", label: "Каждые 3 недели" },
	{ value: "monthly", label: "Каждый месяц" },
];

interface SubscriptionsPaymentFormaProps {
	onAddressChange?: (label: string) => void;
	onDeliveryDatesChange?: (dates: string[]) => void;
	onPaymentMethodChange?: (method: "finik" | "balance") => void;
}

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

export default function SubscriptionsPaymentForma({
	onAddressChange,
	onDeliveryDatesChange,
	onPaymentMethodChange,
}: SubscriptionsPaymentFormaProps) {
	const { profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();

	const [selectedMethod, setSelectedMethod] =
		useState<PaymentMethod>("finikPay");
	const [modalType, setModalType] = useState<ModalType>(null);
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");
	const [newAddressValue, setNewAddressValue] = useState("");
	const [totalAmount, setTotalAmount] = useState<number>(0);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const [selectedFrequency, setSelectedFrequency] =
		useState<DeliveryFrequency | null>(null);
	const [tempFrequency, setTempFrequency] = useState<DeliveryFrequency | null>(
		null
	);
	const [isFrequencyModalOpen, setIsFrequencyModalOpen] = useState(false);
	const [deliveryDates, setDeliveryDates] = useState<(string | null)[]>([]);

	// Гостевые поля
	const [guestName, setGuestName] = useState("");
	const [guestSurname, setGuestSurname] = useState("");
	const [guestPhone, setGuestPhone] = useState("");
	const [guestAddress, setGuestAddress] = useState("");

	const isAuthorized = !!profile;
	const minDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

	// === Эффекты ===
	useEffect(() => {
		if (isAuthorized && profile?.shipping_addresses) {
			const savedId = localStorage.getItem(PROFILE_ADDRESS_KEY);
			if (
				savedId &&
				profile.shipping_addresses.some((addr) => String(addr.id) === savedId)
			) {
				setSelectedAddressId(savedId);
			}
		}
	}, [isAuthorized, profile?.shipping_addresses]);

	const addressOptions = useMemo(() => {
		if (!isAuthorized || !profile?.shipping_addresses) return [];
		return profile.shipping_addresses.map((addr) => ({
			id: String(addr.id),
			label: addr.address,
		}));
	}, [isAuthorized, profile?.shipping_addresses]);

	useEffect(() => {
		if (isAuthorized && selectedAddressId) {
			localStorage.setItem(PROFILE_ADDRESS_KEY, selectedAddressId);
			const label = addressOptions.find(
				(a) => a.id === selectedAddressId
			)?.label;
			if (label) {
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);
				onAddressChange?.(label);
			}
		} else if (!isAuthorized) {
			onAddressChange?.(guestAddress);
		}
	}, [
		isAuthorized,
		selectedAddressId,
		addressOptions,
		guestAddress,
		onAddressChange,
	]);

	useEffect(() => {
		const calculateTotal = () => {
			const raw = localStorage.getItem("cart");
			if (!raw) return 0;
			try {
				const cart = JSON.parse(raw);
				const subscriptionItems = cart.filter(
					(item: any) => item.type === "subscription"
				);
				return subscriptionItems.reduce((sum: number, item: any) => {
					const price = item.subscriptionPrice ?? item.price;
					return sum + price * item.quantity;
				}, 0);
			} catch (e) {
				console.error("Failed to calculate total from cart", e);
				return 0;
			}
		};
		setTotalAmount(calculateTotal());
	}, []);

	useEffect(() => {
		switch (selectedFrequency) {
			case "monthly":
				setDeliveryDates([null, null, null, null]);
				break;
			case "triweekly":
				setDeliveryDates([null, null, null]);
				break;
			case "biweekly":
				setDeliveryDates([null, null]);
				break;
			default:
				setDeliveryDates([null]);
		}
	}, [selectedFrequency]);

	useEffect(() => {
		const validDates = deliveryDates
			.filter(Boolean)
			.map((date) => new Date(date!).toISOString().split("T")[0]);
		onDeliveryDatesChange?.(validDates);
	}, [deliveryDates, onDeliveryDatesChange]);

	// === Обработчики ===
	const closeModal = () => setModalType(null);
	const openSelectModal = () => isAuthorized && setModalType("select");
	const openAddModal = () => {
		setNewAddressValue("");
		setModalType("add");
	};
	const openGuestAddressModal = () =>
		!isAuthorized && setModalType("guest-address");

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

	const handleAddressChange = (id: string) => setSelectedAddressId(id);

	const handlePaymentMethodChange = (method: PaymentMethod) => {
		if (method === "bonuses") {
			toast.error("Оплата бонусами временно недоступна", {
				position: "top-center",
			});
			return;
		}
		const backendMethod = method === "finikPay" ? "finik" : "balance";
		onPaymentMethodChange?.(backendMethod);
		setSelectedMethod(method);
	};

	const displayAddress = isAuthorized
		? addressOptions.find((a) => a.id === selectedAddressId)?.label ||
		  "Не выбран"
		: guestAddress || "Введите адрес";

	const openFrequencyModal = () => {
		const hasAddress = isAuthorized
			? !!selectedAddressId
			: !!guestAddress.trim();
		if (!hasAddress) {
			toast.warning("Сначала укажите адрес доставки", {
				position: "top-center",
			});
			return;
		}
		setTempFrequency(selectedFrequency);
		setIsFrequencyModalOpen(true);
	};

	const handleFrequencySave = () => {
		if (tempFrequency) setSelectedFrequency(tempFrequency);
		setIsFrequencyModalOpen(false);
	};

	const getFrequencyLabel = () =>
		selectedFrequency
			? DELIVERY_FREQUENCY_OPTIONS.find((o) => o.value === selectedFrequency)
					?.label || "Не выбрана"
			: "Выберите частоту";

	const handleGuestNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setGuestName(e.target.value);
	const handleGuestSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setGuestSurname(e.target.value);
	const handleGuestPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setGuestPhone(e.target.value);
	 

	const handleDateChange = (index: number, date: Date | null) => {
		const newDates = [...deliveryDates];
		newDates[index] = date ? date.toISOString().split("T")[0] : null;
		setDeliveryDates(newDates);
	};

	const handleGuestAddressSave = (address: string) => {
		setGuestAddress(address);
		onAddressChange?.(address);
		setModalType(null);
	};

	// === Рендер ===
	return (
		<section className="flex flex-col gap-2">
			<div className="bg-[#FFF3E0] flex justify-between items-center px-4 border-b border-[#F0DBB6] h-[64px]">
				<Description className="text-[#0071E3]">Итого</Description>
				<Title className="font-[600]">{totalAmount.toLocaleString()} сом</Title>
			</div>

			<div className="bg-[#FFFDFA] w-full h-[28px]"></div>
			<div className="bg-[#FFFDFA] p-4 flex flex-col gap-3">
				<Input
					label="Имя *"
					value={isAuthorized ? profile.name || "" : guestName}
					readOnly={isAuthorized}
					onChange={!isAuthorized ? handleGuestNameChange : undefined}
				/>
				<Input
					label="Фамилия *"
					value={isAuthorized ? profile.surname || "" : guestSurname}
					readOnly={isAuthorized}
					onChange={!isAuthorized ? handleGuestSurnameChange : undefined}
				/>

				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={isAuthorized ? openSelectModal : openGuestAddressModal}
						className="w-full h-[48px] px-4 rounded-[8px] bg-white text-[16px] font-[400] border border-[#E4E4E7] outline-none transition-all duration-200 text-left">
						{displayAddress}
					</button>
				</div>

				<Input
					label="Номер телефона *"
					value={
						isAuthorized
							? profile.phone
								? `+996${profile.phone}`
								: ""
							: guestPhone
					}
					readOnly={isAuthorized}
					onChange={!isAuthorized ? handleGuestPhoneChange : undefined}
				/>

				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Частота доставки *
					</label>
					<button
						onClick={openFrequencyModal}
						className="w-full h-[48px] px-4 border-[#E4E4E7] bg-white text-[#000000] rounded-[8px] text-[16px] font-[400] border outline-none transition-all duration-200 text-left flex justify-between items-center">
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

				{selectedFrequency &&
					deliveryDates.map((_, i) => (
						<DeliveryDatePicker
							key={i}
							index={i}
							date={deliveryDates[i]}
							onChange={handleDateChange}
							minDate={minDate}
							frequency={selectedFrequency}
						/>
					))}
			</div>

			{/* Модалки авторизованных */}
			{isAuthorized && (
				<>
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
				</>
			)}

			{/* Модалка гостей */}
			{!isAuthorized && (
				<GuestAddressModal
					isOpen={modalType === "guest-address"}
					onClose={() => setModalType(null)}
					onSave={handleGuestAddressSave}
				/>
			)}

			{/* Модалка частоты */}
			<Modal
				isOpen={isFrequencyModalOpen}
				onClose={() => setIsFrequencyModalOpen(false)}
				title="Частота доставки">
				<div className="flex flex-col gap-4">
					<Description className="text-[14px]">
						Выберите частоту доставки *
					</Description>
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
							<IoIosArrowDown />
						</button>
						{isDropdownOpen && (
							<div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
								{DELIVERY_FREQUENCY_OPTIONS.map((option) => (
									<div
										key={option.value}
										onClick={() => {
											setTempFrequency(option.value as DeliveryFrequency);
											setIsDropdownOpen(false);
										}}
										className={`px-4 py-3 cursor-pointer flex justify-between items-center transition-colors ${
											tempFrequency === option.value
												? "bg-gray-100"
												: "hover:bg-gray-50"
										}`}>
										{option.label}
										{tempFrequency === option.value && (
											<span>
												<IoCheckmark />
											</span>
										)}
									</div>
								))}
							</div>
						)}
					</div>
					<div className="border-b mt-2"></div>
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

			{/* Способ оплаты */}
			<PaymentMethodSection
				selectedMethod={selectedMethod}
				onSelect={handlePaymentMethodChange}
			/>
		</section>
	);
}
