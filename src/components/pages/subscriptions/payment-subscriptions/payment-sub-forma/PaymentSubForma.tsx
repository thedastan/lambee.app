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
import PaymentMethodSelector from "./PaymentSubMethod";
import FrequencySelector from "./FrequencySelector";
import { FiChevronDown } from "react-icons/fi";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";
type ModalType = "select" | "add" | null;

interface PaymentFormaProps {
	onAddressChange?: (city_id: number, street: string) => void;
	onPaymentMethodChange?: (method: PaymentMethod) => void;
	onFrequencyChange?: (frequency_id: number, weekday: number) => void; // Новое!
	savedAmount: number;
	selectedMethod: PaymentMethod;
}

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";

const PaymentSubForma = ({
	onAddressChange,
	onPaymentMethodChange,
	onFrequencyChange,
	selectedMethod,
	savedAmount,
}: PaymentFormaProps) => {
	const { profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();
	const { data: geoData } = useGeo();

	const [modalType, setModalType] = useState<ModalType>(null);
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");

	const [newStreetValue, setNewStreetValue] = useState("");
	const [selectedCity, setSelectedCity] = useState<IGeoDetail | null>(null);
	const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Важно: FrequencySelector должен возвращать ID частоты и день недели (1-7)
	const [selectedFrequency, setSelectedFrequency] = useState<any>(null);

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

	useEffect(() => {
		if (isAuthorized && selectedAddressId && profile?.shipping_addresses) {
			const fullAddr = profile.shipping_addresses.find(
				(a) => String(a.id) === selectedAddressId
			);
			if (fullAddr) {
				onAddressChange?.(fullAddr.city.id, fullAddr.street);
			}
		}
	}, [selectedAddressId, profile]);

	// Обработка изменения частоты (пример: frequency_id: 1 - еженедельно, weekday: 1 - понедельник)
	const handleFrequencyUpdate = (freqData: { id: number; day: number }) => {
		setSelectedFrequency(freqData);
		// Теперь данные точно попадут в SubPaymentComponents
		onFrequencyChange?.(freqData.id, freqData.day);
	};

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
			const updated = await refetchProfile();
			const newAddr = updated.data?.shipping_addresses?.find(
				(addr) =>
					addr.street === newStreetValue.trim() &&
					addr.city.id === selectedCity.id
			);
			if (newAddr) setSelectedAddressId(String(newAddr.id));
			setModalType("select");
			toast.success("Адрес добавлен");
		} catch (err) {
			toast.error("Ошибка добавления");
		}
	};

	return (
		<section className="flex flex-col relative gap-2">
			<div className="bg-[#FFF3E0] flex justify-between items-center px-4 border-b border-[#F0DBB6] h-[64px]">
				<Description className="text-[#0071E3]">Ваша экономия</Description>
				<Title className="font-[600]">{savedAmount.toLocaleString()} сом</Title>
			</div>

			<div className="bg-[#FFFDFA] p-4 flex flex-col gap-3">
				<Input label="Имя *" value={profile?.name || ""} readOnly />
				<Input label="Фамилия *" value={profile?.surname || ""} readOnly />

				<div>
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={() => setModalType("select")}
						className="w-full h-[48px] px-4 rounded-[8px] border border-[#E4E4E7] text-left font-[400]">
						{addressOptions.find((a) => a.id === selectedAddressId)?.label ||
							"Выберите адрес"}
					</button>
				</div>

				<FrequencySelector
					selectedFrequency={selectedFrequency}
					onChange={handleFrequencyUpdate}
				/>

				<Input
					label="Телефон *"
					value={profile?.phone ? `+996${profile.phone}` : ""}
					readOnly
				/>
			</div>

			{/* Модалки выбора и добавления (такие же как раньше) */}
			<Modal
				isOpen={modalType === "select"}
				onClose={() => setModalType(null)}
				title="Адрес">
				<CustomRadioGroup
					options={addressOptions}
					name="subAddr"
					value={selectedAddressId}
					onChange={setSelectedAddressId}
				/>
				<Button
					className="w-full mt-4 !bg-transparent !text-black border"
					onClick={() => setModalType("add")}>
					Добавить новый
				</Button>
				<Button className="w-full mt-2" onClick={() => setModalType(null)}>
						Готово
					</Button>
			</Modal>
 

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

			<PaymentMethodSelector
				selectedMethod={selectedMethod}
				onSelect={onPaymentMethodChange}
			/>
		</section>
	);
};

export default PaymentSubForma;
