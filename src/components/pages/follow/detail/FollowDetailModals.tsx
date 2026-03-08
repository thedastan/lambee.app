"use client";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import {
	usePauseSubscription,
	usePaySubscription,
	useUpdateSubscription,
} from "@/redux/hooks/useSubscriptions";
import { useUserProfile, useCreateShippingAddress } from "@/redux/hooks/user";
import { useGeo } from "@/redux/hooks/geo";
import { useFrequencies } from "@/redux/hooks/frequencies";
import { IGeoDetail } from "@/redux/models/geo.model";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { PiPauseCircleLight } from "react-icons/pi";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { toast } from "alert-go";
import { PAGE } from "@/config/pages/public-page.config";
import { useRouter } from "next/navigation";

const WEEKDAYS = [
	{ id: 1, label: "Пн" },
	{ id: 2, label: "Вт" },
	{ id: 3, label: "Ср" },
	{ id: 4, label: "Чт" },
	{ id: 5, label: "Пт" },
	{ id: 6, label: "Сб" },
	{ id: 7, label: "Вс" },
];

interface FollowDetailModalsProps {
	isModalOpen: boolean;
	setIsModalOpen: (value: boolean) => void;
	isModalFreezeOpen: boolean;
	setIsModalFreezeOpen: (value: boolean) => void;
	isModalDateOpen: boolean;
	setIsModalDateOpen: (value: boolean) => void;
	isSelectWeek: boolean;
	setIsSelectWeek: (value: boolean) => void;
	isPay: boolean;
	setIsPay: (value: boolean) => void;
	birthDate: Date | null;
	setBirthDate: (date: Date | null) => void;
	deliveryFrequency: any;
	setDeliveryFrequency: (frequency: any) => void;
	subId: string | number;
	sub: any;
	isDeleteModalOpen: boolean; // Добавили
	setIsDeleteModalOpen: (value: boolean) => void; // Добавили
	handleDelete: any;
}

type PaymentMethod = "finik" | "balance" | "bonus";

type AddressModalType = "select" | "add";

const FollowDetailModals: React.FC<FollowDetailModalsProps> = ({
	isModalOpen,
	setIsModalOpen,
	isModalFreezeOpen,
	setIsModalFreezeOpen,
	isModalDateOpen,
	setIsModalDateOpen,
	isSelectWeek,
	setIsSelectWeek,
	isPay,
	setIsPay,
	deliveryFrequency,
	setDeliveryFrequency,
	subId,
	sub,
	isDeleteModalOpen,
	setIsDeleteModalOpen,
	handleDelete,
}) => {
	const { profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();
	const { data: geoData } = useGeo();
	const { data: freqData } = useFrequencies();
	const { mutate: pause, isPending: isPausing } = usePauseSubscription();
	const { mutate: updateSubscription, isPending: isUpdating } =
		useUpdateSubscription();

	const router = useRouter();

	const [addressModalType, setAddressModalType] =
		useState<AddressModalType>("select");
	const [selectedAddressId, setSelectedAddressId] = useState<string>("");
	const [newStreetValue, setNewStreetValue] = useState("");
	const [selectedCity, setSelectedCity] = useState<IGeoDetail | null>(null);
	const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isFreqDropdownOpen, setIsFreqDropdownOpen] = useState(false);
	const { mutate: pay, isPending: isPaying } = usePaySubscription();

	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("finik");

  const translateError = (message: string): string => {
    const errors: Record<string, string> = {
      "Not enough balance": "Недостаточно средств на балансе",
      "Subscription not found": "Подписка не найдена",
      "Invalid payment method": "Неверный способ оплаты",
      "Payment already processed": "Оплата уже была произведена",
      "Not enough bonus":"Недостаточно бонуса"
      // Добавь сюда другие фразы от бэкенда по мере появления
    };
  
    return errors[message] || message; // Если перевода нет, вернет оригинал
  };

  const handlePayment = () => {
  pay(
    { id: subId, payment_method: paymentMethod },
    {
      onSuccess: (response: any) => {
        if (paymentMethod === "finik" && response?.detail) {
          window.location.href = response.detail;
        } else {
          setIsPay(false);
          toast.success("Оплата успешно проведена");
        }
      },
      onError: (error: any) => {
        // Достаем сообщение из ответа бэкенда
        const rawMessage = error.response?.data?.detail || "Unknown error";
        
        // Переводим и показываем пользователю
        const translatedMessage = translateError(rawMessage);
        toast.error(translatedMessage);
      }
    }
  );
};

	const balanceAmount = profile?.balance?.amount || 0;
	const bonusAmount = profile?.bonus_balance?.amount || 0;
	const hasBonuses = bonusAmount > 0;

	const addressOptions = useMemo(() => {
		if (!profile?.shipping_addresses) return [];
		return profile.shipping_addresses.map((addr) => ({
			id: String(addr.id),
			label: `${addr.city.name}, ${addr.street}`,
			city_id: addr.city.id,
			street: addr.street,
		}));
	}, [profile?.shipping_addresses]);

	const frequencyOptions = freqData?.detail || [];
	const currentFreqOption = frequencyOptions.find(
		(opt) => opt.id === deliveryFrequency?.id
	);

	const handleTopUp = (e: React.MouseEvent) => {
		e.stopPropagation();
		router.push(PAGE.PROFILE);
	};

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				setIsCityDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	// --- Handlers ---
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
			await refetchProfile();
			setAddressModalType("select");
		} catch (err) {}
	};

	const handleSaveAddressChange = () => {
		const selected = addressOptions.find((opt) => opt.id === selectedAddressId);
		if (!selected) return;

		updateSubscription(
			{
				id: subId,
				payload: {
					city_id: selected.city_id,
					street: selected.street,
				},
			},
			{
				onSuccess: () => setIsModalOpen(false),
			}
		);
	};

	const handleSaveFrequency = () => {
		updateSubscription(
			{
				id: subId,
				payload: {
					frequency_id: deliveryFrequency.id,
					weekday: deliveryFrequency.day,
				},
			},
			{
				onSuccess: () => setIsSelectWeek(false),
			}
		);
	};

	const handleSelectFreq = (freqId: number) => {
		setDeliveryFrequency({ ...deliveryFrequency, id: freqId });
		setIsFreqDropdownOpen(false);
	};

	const handleSelectDay = (dayId: number) => {
		setDeliveryFrequency({ ...deliveryFrequency, day: dayId });
	};

	const freezeUntil = new Date();
	freezeUntil.setMonth(freezeUntil.getMonth() + 1);
	const formattedFreezeDate = freezeUntil.toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
	});

	const handleFreeze = () => {
		const untilDate = freezeUntil.toISOString().split("T")[0];
		pause(
			{ id: subId, until: untilDate },
			{ onSuccess: () => setIsModalFreezeOpen(false) }
		);
	};

	return (
		<div>
			{/* 1. АДРЕС */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setAddressModalType("select");
				}}
				title={
					addressModalType === "select" ? "Выберите адрес" : "Добавить адрес"
				}>
				{addressModalType === "select" ? (
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
								setAddressModalType("add");
							}}>
							Добавить новый
						</Button>
						<div className="border-[#E4E4E7] border-b w-full my-2" />
						<div className="flex gap-3">
							<Button
								className="w-full !bg-white border border-[#E4E4E7] !text-black"
								onClick={() => setIsModalOpen(false)}>
								Отмена
							</Button>
							<Button
								className="w-full"
								onClick={handleSaveAddressChange}
								disabled={!selectedAddressId || isUpdating}>
								{isUpdating ? "Сохранение..." : "Сохранить"}
							</Button>
						</div>
					</div>
				) : (
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
											<div className="text-[14px] font-semibold">
												{city.name}
											</div>
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
								onClick={() => setAddressModalType("select")}>
								Назад
							</Button>
							<Button
								className="w-full"
								onClick={handleAddAddress}
								disabled={
									isCreating || !newStreetValue.trim() || !selectedCity
								}>
								{isCreating ? "Сохранение..." : "Добавить"}
							</Button>
						</div>
					</div>
				)}
			</Modal>

			{/* 2. ЧАСТОТА */}
			<Modal
				isOpen={isSelectWeek}
				onClose={() => setIsSelectWeek(false)}
				title="Частота доставки">
				<div className="flex flex-col gap-4 py-2">
					<div className="relative">
						<p className="text-[14px] text-[#515151] mb-2">
							Выберите частоту доставки *
						</p>
						<button
							onClick={() => setIsFreqDropdownOpen(!isFreqDropdownOpen)}
							className={`w-full flex justify-between items-center p-4 border rounded-[12px] bg-white transition-all ${
								isFreqDropdownOpen ? "border-[#0071E3]" : "border-[#E4E4E7]"
							}`}>
							<span className="text-[16px]">
								{currentFreqOption?.label || "Выберите вариант"}
							</span>
							<FiChevronDown
								className={`transition-transform ${
									isFreqDropdownOpen ? "rotate-180" : ""
								}`}
								size={22}
							/>
						</button>
						{isFreqDropdownOpen && (
							<div className="mt-2 border absolute z-50 w-full border-[#E4E4E7] rounded-[12px] overflow-hidden bg-white shadow-lg">
								{frequencyOptions.map((opt) => (
									<button
										key={opt.id}
										onClick={() => handleSelectFreq(opt.id)}
										className="w-full flex justify-between items-center p-4 hover:bg-gray-50 border-b last:border-none">
										<span
											className={`text-[16px] ${
												deliveryFrequency?.id === opt.id
													? "text-black font-medium"
													: "text-gray-600"
											}`}>
											{opt.label}
										</span>
										{deliveryFrequency?.id === opt.id && (
											<FiCheck className="text-[#0071E3]" size={20} />
										)}
									</button>
								))}
							</div>
						)}
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-[14px] font-medium text-[#515151]">
							День доставки
						</label>
						<div className="flex justify-between gap-1">
							{WEEKDAYS.map((day) => (
								<button
									key={day.id}
									onClick={() => handleSelectDay(day.id)}
									className={`flex-1 py-3 rounded-lg border text-[13px] font-medium transition-all ${
										deliveryFrequency?.day === day.id
											? "bg-[#0071E3] text-white border-[#0071E3]"
											: "bg-white text-gray-600 border-[#E4E4E7]"
									}`}>
									{day.label}
								</button>
							))}
						</div>
					</div>
					<Button
						className="w-full mt-2"
						onClick={handleSaveFrequency}
						disabled={isUpdating}>
						{isUpdating ? "Сохранение..." : "Готово"}
					</Button>
				</div>
			</Modal>

			{/* 3. ЗАМОРОЗКА */}
			<Modal
				isOpen={isModalFreezeOpen}
				onClose={() => setIsModalFreezeOpen(false)}
				title="Заморозить подписку?">
				<div className="flex flex-col items-center gap-3">
					<div className=" rounded-full w-[64px] h-[64px] bg-[#DEEEFF] flex justify-center items-center">
						<PiPauseCircleLight size={32} />
					</div>

					<div className="p-4 border-[#E4E4E7] border bg-[#F9FCFF] w-full rounded-[8px] flex flex-col gap-2">
						<Title className="font-semibold">
							Подписка остановится до {formattedFreezeDate}
						</Title>
						<Description>
							Возобновить его можно <br /> в любой момент
						</Description>
					</div>

					<div className="flex gap-3">
						<div className="p-4 border-[#E4E4E7] w-full border bg-[#FAFAFA] rounded-[8px] flex flex-col gap-2">
							<Title className="font-semibold">
								Деньги не будут списыватся
							</Title>
							<Description>Все оплаченные дни сохранятся</Description>
						</div>
						<div className="p-4 border-[#E4E4E7] w-full border bg-[white] rounded-[8px] flex flex-col gap-2">
							<Title className="font-semibold">Подписка включится сама</Title>
							<Description>Это произойдет через месяц</Description>
						</div>
					</div>

					<div className="border-[#E4E4E7] border-b w-full"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsModalFreezeOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={handleFreeze}>
							Заморозить
						</Button>
					</div>
				</div>
			</Modal>

			{/* 4. ОПЛАТА */}
			<Modal
				isOpen={isPay}
				onClose={() => setIsPay(false)}
				title="Оплата подписки">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						{/* 1. Finik Pay (finik) */}
						<div
							className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
								paymentMethod === "finik"
									? "border-[#0071E3] bg-[#F9FCFF]"
									: "border-[#DEDEDE] bg-white"
							} rounded-[8px] transition-all`}
							onClick={() => setPaymentMethod("finik")}>
							<div className="flex items-center gap-3">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										paymentMethod === "finik"
											? "border-[#0071E3] bg-[#0071E3]"
											: "border-[#DEDEDE]"
									}`}>
									<span
										className={`w-2 h-2 rounded-full ${
											paymentMethod === "finik" ? "bg-white" : "bg-transparent"
										}`}></span>
								</span>
								<div className="flex flex-col text-left">
									<span className="text-[14px] font-medium">
										Через любой банк КР
									</span>
									<span className="text-[10px] text-gray-500">
										Банки Кыргызстана или Visa/Mastercard
									</span>
								</div>
							</div>
						</div>

						{/* 2. Баланс Lambee (balance) */}
						<div
							className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
								paymentMethod === "balance"
									? "border-[#0071E3] bg-[#F9FCFF]"
									: "border-[#DEDEDE] bg-white"
							} rounded-[8px] transition-all`}
							onClick={() => setPaymentMethod("balance")}>
							<div className="flex items-center justify-between w-full">
								<div className="flex items-center gap-3">
									<span
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
											paymentMethod === "balance"
												? "border-[#0071E3] bg-[#0071E3]"
												: "border-[#DEDEDE]"
										}`}>
										<span
											className={`w-2 h-2 rounded-full ${
												paymentMethod === "balance"
													? "bg-white"
													: "bg-transparent"
											}`}></span>
									</span>
									<span className="text-[14px]">
										Баланс Lambee{" "}
										{balanceAmount > 0 ? `(${balanceAmount} сом)` : ""}
									</span>
								</div>
								{balanceAmount <= 0 && (
									<button
										onClick={handleTopUp}
										className="bg-[#0071E3] text-white px-3 py-1 text-[11px] font-medium rounded-[6px] hover:bg-opacity-90">
										Пополнить
									</button>
								)}
							</div>
						</div>

						{/* 3. Бонусы (bonus_balance) */}
						{hasBonuses && (
							<div
								className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
									paymentMethod === "bonus"
										? "border-[#0071E3] bg-[#F9FCFF]"
										: "border-[#DEDEDE] bg-white"
								} rounded-[8px] transition-all`}
								onClick={() => setPaymentMethod("bonus")}>
								<div className="flex items-center gap-3">
									<span
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
											paymentMethod === "bonus"
												? "border-[#0071E3] bg-[#0071E3]"
												: "border-[#DEDEDE]"
										}`}>
										<span
											className={`w-2 h-2 rounded-full ${
												paymentMethod === "bonus"
													? "bg-white"
													: "bg-transparent"
											}`}></span>
									</span>
									<span className="text-[14px]">
										Бонусы ({bonusAmount} сом)
									</span>
								</div>
							</div>
            )}
					</div>

					<div className="flex gap-3 w-full mt-2">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsPay(false)}>
							Отмена
						</Button>
						<Button
							className="w-full"
							onClick={handlePayment}
							disabled={isPaying}>
							{isPaying
								? "Загрузка..."
								: `Оплатить`}
						</Button>
					</div>
				</div>
			</Modal>

			<Modal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				title="Удалить подписку?">
				<div className="flex flex-col gap-4">
					<Description className="text-center">
						Вы действительно хотите прекратить использование подписки?
					</Description>
					<div className="flex gap-3">
						<Button
							className="w-full !bg-white border border-[#E4E4E7] !text-black"
							onClick={() => setIsDeleteModalOpen(false)}>
							Отмена
						</Button>
						<Button
							className="w-full !bg-red-500 !text-white"
							onClick={() => handleDelete(subId)}>
							Удалить
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default FollowDetailModals;
