// src/app/(main)/payment/payment-forma/PaymentForma.tsx
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
import 'alert-go/dist/notifier.css';
import PaymentMethodSelector from "./PaymentMethod";

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
type ModalType = "select" | "add" | "guest-address" | null;

interface PaymentFormaProps {
	onAddressChange?: (label: string) => void;
	onPaymentMethodChange?: (method: PaymentMethod) => void;
	selectedMethod: PaymentMethod;
}

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

const PaymentForma = ({ onAddressChange, onPaymentMethodChange, selectedMethod }: PaymentFormaProps) => {
	// ✅ Правильная деструктуризация: data → profile
	const {  profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();

	const [modalType, setModalType] = useState<ModalType>(null);
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");
	const [newAddressValue, setNewAddressValue] = useState("");
	const [totalAmount, setTotalAmount] = useState<number>(0);

	// Гостевые поля — НЕ сохраняются в localStorage
	const [guestName, setGuestName] = useState("");
	const [guestSurname, setGuestSurname] = useState("");
	const [guestPhone, setGuestPhone] = useState("");
	const [guestAddress, setGuestAddress] = useState("");

	const isAuthorized = !!profile;

	// Загрузка сохранённого адреса (только для авторизованных)
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
			const label = addressOptions.find((a) => a.id === selectedAddressId)?.label;
			if (label) {
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);
				onAddressChange?.(label);
			}
		} else if (!isAuthorized) {
			onAddressChange?.(guestAddress);
		}
	}, [isAuthorized, selectedAddressId, addressOptions, guestAddress, onAddressChange]);

	// Расчёт суммы
	useEffect(() => {
		const calculateTotal = () => {
			const raw = localStorage.getItem("cart");
			if (!raw) return 0;
			try {
				const cart: CartItem[] = JSON.parse(raw);
				const oneTimeItems = cart.filter((item) => item.type === "one-time");
				return oneTimeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
			} catch (e) {
				console.error("Failed to calculate total from cart", e);
				return 0;
			}
		};
		setTotalAmount(calculateTotal());
	}, []);

	// Обработчики гостей
	const handleGuestNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setGuestName(e.target.value);
	const handleGuestSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => setGuestSurname(e.target.value);
	const handleGuestPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => setGuestPhone(e.target.value);
	const handleGuestAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setGuestAddress(value);
		onAddressChange?.(value);
	};

	const closeModal = () => setModalType(null);
	const openSelectModal = () => isAuthorized && setModalType("select");
	const openAddModal = () => {
		setNewAddressValue("");
		setModalType("add");
	};
	const openGuestAddressModal = () => !isAuthorized && setModalType("guest-address");

	const handleAddAddress = async () => {
		if (!newAddressValue.trim()) return;
		try {
			await createShippingAddress(newAddressValue.trim());
			const updatedResult = await refetchProfile();
			const updatedProfile = updatedResult.data;
	
			const newAddr = updatedProfile?.shipping_addresses?.find(
				(addr) => addr.address === newAddressValue.trim()
			);
	
			if (newAddr) {
				const newId = String(newAddr.id);
				const newLabel = newAddr.address;
	
				// ✅ Устанавливаем ID
				setSelectedAddressId(newId);
	
				// ✅ Сразу сохраняем в localStorage
				localStorage.setItem(PROFILE_ADDRESS_KEY, newId);
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, newLabel);
	
				// ✅ Сразу уведомляем родителя
				onAddressChange?.(newLabel);
			}
	
			toast.success("Адрес успешно добавлен", { position: "top-center" });
			setModalType(null);
		} catch (err) {
			console.error("Ошибка добавления адреса:", err);
			toast.error("Не удалось добавить адрес.", { position: "top-center" });
		}
	};
	const handleAddressChange = (id: string) => {
		setSelectedAddressId(id);
	};

	const handleSelect = (method: PaymentMethod) => {
		onPaymentMethodChange?.(method);
	};

	 

	const displayAddress = useMemo(() => {
		if (isAuthorized) {
			return addressOptions.find((a) => a.id === selectedAddressId)?.label || "Не выбран";
		}
		return guestAddress || "Введите адрес";
	}, [isAuthorized, addressOptions, selectedAddressId, guestAddress]);

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

				{/* Адрес доставки */}
				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={isAuthorized ? openSelectModal : openGuestAddressModal}
						className="w-full h-[48px] px-4 rounded-[8px] text-[16px] font-[600] border border-[#E4E4E7] outline-none transition-all duration-200 text-left"
					>
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
			</div>

			{/* Модалки адреса */}
			{isAuthorized && (
				<Modal isOpen={modalType === "select"} onClose={closeModal} title="Выберите адрес доставки">
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
							onClick={openAddModal}
						>
							Добавить ещё адрес
						</Button>
						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
								onClick={closeModal}
							>
								Отмена
							</Button>
							<Button className="w-full" onClick={closeModal}>
								Готово
							</Button>
						</div>
					</div>
				</Modal>
			)}

			{isAuthorized && (
				<Modal isOpen={modalType === "add"} onClose={closeModal} title="Добавить адрес">
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
								onClick={closeModal}
							>
								Отмена
							</Button>
							<Button
								className="w-full"
								onClick={handleAddAddress}
								disabled={isCreating || !newAddressValue.trim()}
							>
								{isCreating ? "Добавление..." : "Сохранить"}
							</Button>
						</div>
					</div>
				</Modal>
			)}

			{!isAuthorized && (
				<Modal
					isOpen={modalType === "guest-address"}
					onClose={closeModal}
					title="Укажите адрес доставки"
				>
					<div className="flex flex-col gap-3">
						<Input
							label={
								<>
									Адрес <span className="text-[#FF5F57]">*</span>
								</>
							}
							value={guestAddress}
							onChange={handleGuestAddressChange}
							placeholder="Например: Бишкек, ул. Чуй 123"
						/>
						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
								onClick={closeModal}
							>
								Отмена
							</Button>
							<Button
								className="w-full"
								onClick={closeModal}
								disabled={!guestAddress.trim()}
							>
								Готово
							</Button>
						</div>
					</div>
				</Modal>
			)}

			{/* Способ оплаты */}
			<PaymentMethodSelector
				selectedMethod={selectedMethod}
				onSelect={handleSelect}
			/>
		</section>
	);
};

export default PaymentForma;