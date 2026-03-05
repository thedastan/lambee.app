"use client";

import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useUserProfile, useCreateShippingAddress } from "@/redux/hooks/user";
import { useGeo } from "@/redux/hooks/geo";
import { IGeoDetail } from "@/redux/models/geo.model";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import PaymentMethodSelector from "./PaymentMethod";
import { FiChevronDown } from "react-icons/fi";

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

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";
type ModalType = "select" | "add" | "guest-address" | null;

interface PaymentFormaProps {
	onAddressChange?: (city_id: number, street: string) => void;
	onPaymentMethodChange?: (method: PaymentMethod) => void;
	selectedMethod: PaymentMethod;
}

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

const PaymentForma = ({
	onAddressChange,
	onPaymentMethodChange,
	selectedMethod,
}: PaymentFormaProps) => {
	const { profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();
	const { data: geoData } = useGeo();

	const [modalType, setModalType] = useState<ModalType>(null);
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");
	const [totalAmount, setTotalAmount] = useState<number>(0);

	const [newStreetValue, setNewStreetValue] = useState("");
	const [selectedCity, setSelectedCity] = useState<IGeoDetail | null>(null);
	const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const [guestName, setGuestName] = useState("");
	const [guestSurname, setGuestSurname] = useState("");
	const [guestPhone, setGuestPhone] = useState("");
	const [guestAddress, setGuestAddress] = useState("");

	const isAuthorized = !!profile;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsCityDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Загрузка сохранённого адреса
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
			label: `${addr.city.name}, ${addr.street}`,
		}));
	}, [isAuthorized, profile?.shipping_addresses]);

	// Уведомление родителя об изменении адреса
	useEffect(() => {
		if (isAuthorized && selectedAddressId && profile?.shipping_addresses) {
			// Ищем полный объект адреса в профиле по ID
			const fullAddr = profile.shipping_addresses.find(
				(a) => String(a.id) === selectedAddressId
			);

			if (fullAddr) {
				const label = `${fullAddr.city.name}, ${fullAddr.street}`;
				localStorage.setItem(PROFILE_ADDRESS_KEY, selectedAddressId);
				localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);

				// ИСПРАВЛЕНО: Отправляем id города и улицу отдельно
				onAddressChange?.(fullAddr.city.id, fullAddr.street);
			}
		} else if (!isAuthorized) {
			// Для гостя (если бэкенд требует city_id, здесь нужно либо
			// добавить выбор города гостю, либо передавать дефолтный ID)
			// onAddressChange?.(DEFAULT_CITY_ID, guestAddress);
		}
	}, [isAuthorized, selectedAddressId, profile, guestAddress, onAddressChange]);
	// Расчёт суммы
	useEffect(() => {
		const calculateTotal = () => {
			const raw = localStorage.getItem("cart");
			if (!raw) return 0;
			try {
				const cart: CartItem[] = JSON.parse(raw);
				return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
			} catch (e) {
				return 0;
			}
		};
		setTotalAmount(calculateTotal());
	}, []);

	const handleAddAddress = async () => {
		if (!newStreetValue.trim() || !selectedCity) {
			toast.error("Выберите город и введите улицу");
			return;
		}

		try {
			await createShippingAddress({
				city_id: selectedCity.id,
				street: newStreetValue.trim(),
			});

			const updatedResult = await refetchProfile();
			const updatedProfile = updatedResult.data;

			const newAddr = updatedProfile?.shipping_addresses?.find(
				(addr) =>
					addr.street === newStreetValue.trim() &&
					addr.city.id === selectedCity.id
			);

			if (newAddr) {
				setSelectedAddressId(String(newAddr.id));
			}

			toast.success("Адрес добавлен", { position: "top-center" });
			setModalType("select");
		} catch (err) {
			toast.error("Не удалось добавить адрес.");
		}
	};

	const displayAddress = useMemo(() => {
		if (isAuthorized) {
			return (
				addressOptions.find((a) => a.id === selectedAddressId)?.label ||
				"Не выбран"
			);
		}
		return guestAddress || "Введите адрес";
	}, [isAuthorized, addressOptions, selectedAddressId, guestAddress]);

	return (
		<section className="flex flex-col gap-2">
			<div className="bg-[#FFF3E0] flex justify-between items-center px-4 border-b border-[#F0DBB6] h-[64px]">
				<Description className="text-[#0071E3]">Итого</Description>
				<Title className="font-[600]">{totalAmount.toLocaleString()} сом</Title>
			</div>

			<div className="bg-[#FFFDFA] p-4 flex flex-col gap-3">
				<Input
					label="Имя *"
					value={isAuthorized ? profile?.name || "" : guestName}
					readOnly={isAuthorized}
					onChange={(e) => setGuestName(e.target.value)}
				/>
				<Input
					label="Фамилия *"
					value={isAuthorized ? profile?.surname || "" : guestSurname}
					readOnly={isAuthorized}
					onChange={(e) => setGuestSurname(e.target.value)}
				/>

				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={() =>
							setModalType(isAuthorized ? "select" : "guest-address")
						}
						className="w-full h-[48px] px-4 rounded-[8px] text-[16px] font-[400] border border-[#E4E4E7] text-left">
						{displayAddress}
					</button>
				</div>

				<Input
					label="Номер телефона *"
					value={
						isAuthorized
							? profile?.phone
								? `+996${profile.phone}`
								: ""
							: guestPhone
					}
					readOnly={isAuthorized}
					onChange={(e) => setGuestPhone(e.target.value)}
				/>
			</div>

			{/* Модалка выбора (Авторизован) */}
			<Modal
				isOpen={modalType === "select"}
				onClose={() => setModalType(null)}
				title="Выберите адрес">
				<div className="flex flex-col gap-3">
					<CustomRadioGroup
						options={addressOptions}
						name="deliveryAddress"
						value={selectedAddressId}
						onChange={(id) => setSelectedAddressId(id)}
					/>
					<Button
						className="w-full border border-[#E4E4E7] !bg-transparent !text-black mt-2"
						onClick={() => {
							setNewStreetValue("");
							setSelectedCity(null);
							setModalType("add");
						}}>
						Добавить новый
					</Button>
					<Button className="w-full" onClick={() => setModalType(null)}>
						Готово
					</Button>
					
				</div>
			</Modal>

			{/* Модалка добавления (Авторизован) */}
			<Modal
				isOpen={modalType === "add"}
				onClose={() => setModalType(null)}
				title="Добавить адрес">
				<div className="flex flex-col gap-4">
					<div className="relative" ref={dropdownRef}>
						<label className="text-[14px] font-medium mb-1 block">
							Город <span className="text-[#FF5F57]">*</span>
						</label>
						<div
							onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
							className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer bg-white">
							<span className={selectedCity ? "text-black" : "text-gray-400"}>
								{selectedCity
									? `${selectedCity.name}, ${selectedCity.country.name}`
									: "Выберите город"}
							</span>
							<FiChevronDown
								className={`transition-transform ${
									isCityDropdownOpen ? "rotate-180" : ""
								}`}
							/>
						</div>
						{isCityDropdownOpen && (
							<div className="absolute z-[100] w-full mt-1 bg-white border border-[#E4E4E7] rounded-lg shadow-xl max-h-[160px] overflow-y-auto">
								{geoData?.detail?.map((city) => (
									<div
										key={city.id}
										onClick={() => {
											setSelectedCity(city);
											setIsCityDropdownOpen(false);
										}}
										className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-none">
										<div className="text-[14px] font-semibold">{city.name}</div>
										<div className="text-[12px] text-gray-500">
											{city.country.name}
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					<Input
						label={
							<>
								Улица и дом <span className="text-[#FF5F57]">*</span>
							</>
						}
						value={newStreetValue}
						onChange={(e) => setNewStreetValue(e.target.value)}
						placeholder="Введите адрес"
					/>

					<div className="flex gap-3">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setModalType("select")}>
							Назад
						</Button>
						<Button
							className="w-full"
							onClick={handleAddAddress}
							disabled={isCreating || !newStreetValue.trim() || !selectedCity}>
							{isCreating ? "Сохранение..." : "Сохранить"}
						</Button>
					</div>
				</div>
			</Modal>

			{/* Модалка гостя */}
			<Modal
				isOpen={modalType === "guest-address"}
				onClose={() => setModalType(null)}
				title="Адрес доставки">
				<div className="flex flex-col gap-3">
					<Input
						label="Адрес *"
						value={guestAddress}
						onChange={(e) => {
							const value = e.target.value;
							setGuestAddress(value);
							onAddressChange?.(0, value);
						}}
						placeholder="Бишкек, ул. Чуй 123"
					/>
					
					<Button
						className="w-full"
						onClick={() => setModalType(null)}
						disabled={!guestAddress.trim()}>
						Готово
					</Button>
				</div>
			</Modal>

			<PaymentMethodSelector
				selectedMethod={selectedMethod}
				onSelect={(m) => onPaymentMethodChange?.(m)}
			/>
		</section>
	);
};

export default PaymentForma;
