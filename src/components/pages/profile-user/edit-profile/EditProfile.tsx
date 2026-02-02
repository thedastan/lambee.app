"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { toast } from "alert-go";

// UI Components
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/heading/PageHeader";
import Input from "@/components/ui/input/Input";
import PhotoUpload from "@/components/ui/input/PhotoUpload";
import Skeleton from "@/components/ui/skeleton/Skeleton";

// Config & Hooks
import { PAGE } from "@/config/pages/public-page.config";
import {
	useUpdateProfile,
	useUpdateProfilePicture,
	useUserProfile,
} from "@/redux/hooks/user";

import "alert-go/dist/notifier.css";
import { LuCalendar } from "react-icons/lu";

// --- Барабан (WheelPicker) ---
const WheelPicker = ({
	items,
	initialValue,
	onChange,
}: {
	items: string[];
	initialValue: string;
	onChange: (v: string) => void;
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		axis: "y",
		loop: true,
		dragFree: false,
		containScroll: false,
	});

	const [selectedIndex, setSelectedIndex] = useState(0);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		const index = emblaApi.selectedScrollSnap();
		setSelectedIndex(index);
		onChange(items[index]);
	}, [emblaApi, items, onChange]);

	useEffect(() => {
		if (!emblaApi) return;
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);

		const startIndex = items.indexOf(initialValue);
		if (startIndex !== -1) emblaApi.scrollTo(startIndex, false);
	}, [emblaApi, items, initialValue, onSelect]);

	return (
		<div
			className="relative h-48 w-full overflow-hidden select-none touch-none"
			ref={emblaRef}>
			<div className="flex flex-col h-full transform-gpu">
				{items.map((item, index) => (
					<div
						key={`${item}-${index}`}
						className={`flex items-center justify-center min-h-[44px] text-[18px] transition-all duration-200 ease-out ${
							index === selectedIndex
								? "text-black font-[500] scale-110"
								: "text-gray-300 scale-95"
						}`}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

// --- Модальное окно (DatePickerModal) ---
const DatePickerModal = ({
	isOpen,
	onClose,
	date,
	onSave,
}: {
	isOpen: boolean;
	onClose: () => void;
	date: Date | null;
	onSave: (d: Date) => void;
}) => {
	const [tempDate, setTempDate] = useState(new Date(date || new Date()));

	useEffect(() => {
		if (isOpen && date) setTempDate(new Date(date));
	}, [isOpen, date]);

	const days = useMemo(() => {
		const count = new Date(
			tempDate.getFullYear(),
			tempDate.getMonth() + 1,
			0
		).getDate();
		return Array.from({ length: count }, (_, i) =>
			(i + 1).toString().padStart(2, "0")
		);
	}, [tempDate.getFullYear(), tempDate.getMonth()]);

	const months = [
		"Янв",
		"Фев",
		"Мар",
		"Апр",
		"Май",
		"Июн",
		"Июл",
		"Авг",
		"Сен",
		"Окт",
		"Ноя",
		"Дек",
	];
	const years = useMemo(
		() =>
			Array.from({ length: 80 }, (_, i) =>
				(new Date().getFullYear() - i).toString()
			),
		[]
	);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
			<div
				className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out"
				onClick={(e) => e.stopPropagation()}>
				<h3 className="text-center font-bold text-lg mb-4 text-black">
					Выберите дату
				</h3>

				<div className="relative flex px-2 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
					<div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-white shadow-sm border-y border-gray-200 pointer-events-none z-0" />
					<div className="relative z-10 flex w-full">
						<WheelPicker
							items={days}
							initialValue={tempDate.getDate().toString().padStart(2, "0")}
							onChange={(v) => {
								const d = new Date(tempDate);
								d.setDate(parseInt(v));
								setTempDate(d);
							}}
						/>
						<WheelPicker
							items={months}
							initialValue={months[tempDate.getMonth()]}
							onChange={(v) => {
								const d = new Date(tempDate);
								d.setMonth(months.indexOf(v));
								setTempDate(d);
							}}
						/>
						<WheelPicker
							items={years}
							initialValue={tempDate.getFullYear().toString()}
							onChange={(v) => {
								const d = new Date(tempDate);
								d.setFullYear(parseInt(v));
								setTempDate(d);
							}}
						/>
					</div>
				</div>

				<div className="flex gap-3 mt-6">
					<Button
						onClick={onClose}
						className="flex-1 py-3 px-4 border font-medium !text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
						Отмена
					</Button>
					<Button
						onClick={() => {
							onSave(tempDate);
							onClose();
						}}
						className="flex-1">
						Готово
					</Button>
				</div>
			</div>
		</div>
	);
};

const EditProfile = () => {
	const [photo, setPhoto] = useState<File | null>(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [phone, setPhone] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { profile, isLoading, refetch } = useUserProfile();
	const { updateProfile, isUpdating: isUpdatingProfile } = useUpdateProfile();
	const { updateProfilePicture, isUpdating: isUpdatingPhoto } =
		useUpdateProfilePicture();

	useEffect(() => {
		if (profile) {
			setFirstName(profile.name || "");
			setLastName(profile.surname || "");
			if (profile.birth_date) setBirthDate(new Date(profile.birth_date));
			setPhone(profile.phone ? `+996${profile.phone}` : "");
		}
	}, [profile]);

	if (isLoading) {
		return (
			<section>
				<PageHeader href={PAGE.PROFILE} title="Личные данные" />
				<div className="m-4 md:p-4 p-0 bg-white rounded-[8px] flex flex-col gap-4">
					<Skeleton className="rounded-full" width="w-10" height="h-10" />
					{[...Array(5)].map((_, i) => (
						<div key={i} className="flex flex-col gap-2">
							<Skeleton height="h-4" width="w-1/4" />
							<Skeleton height="h-12" />
						</div>
					))}
					<Skeleton height="h-12" width="w-full" className="rounded-md" />
				</div>
			</section>
		);
	}

	const handleSave = async () => {
		if (!firstName || !lastName || !birthDate || !phone) {
			toast.warning("Заполните обязательные поля", { position: "top-center" });
			return;
		}

		const cleanPhone = phone.replace(/^\+996/, "");
		const formattedBirthDate = birthDate.toISOString().split("T")[0];

		try {
			if (photo) await updateProfilePicture(photo);
			await updateProfile({
				name: firstName,
				surname: lastName,
				birth_date: formattedBirthDate,
				phone: cleanPhone,
			});
			await refetch();
			toast.success("Профиль обновлён", { position: "top-center" });
		} catch (e) {
			toast.error("Ошибка обновления", { position: "top-center" });
		}
	};

	return (
		<section>
			<PageHeader href={PAGE.PROFILE} title="Личные данные" />
			<div className="m-4 md:p-4 p-0 md:bg-white bg-transparent rounded-[8px] flex flex-col gap-3">
				<PhotoUpload
					label={
						<>
							Фото <span className="text-[#FFA655]">*</span>
						</>
					}
					value={photo}
					previewUrl={profile?.profile_picture || null}
					onChange={setPhoto}
					maxFileSizeMB={5}
				/>

				<Input
					placeholder="Введите имя"
					label="Имя *"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
				/>
				<Input
					placeholder="Введите фамилию"
					label="Фамилия *"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
				/>

				{/* Кастомный селектор даты рождения */}
				<div className="w-full">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Дата рождения *
					</label>
					<div
						onClick={() => setIsModalOpen(true)}
						className="flex justify-between items-center bg-white h-[48px] rounded-[8px] px-4 border border-[#E4E4E7] cursor-pointer   transition-colors">
						<span className={birthDate ? "text-gray-800" : "text-gray-400"}>
							{birthDate
								? birthDate.toLocaleDateString("ru-RU", {
										day: "2-digit",
										month: "long",
										year: "numeric",
								  })
								: "ДД.ММ.ГГГГ"}
						</span>
						<LuCalendar size={20} className="text-gray-400" />
					</div>
				</div>

				<DatePickerModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					date={birthDate}
					onSave={setBirthDate}
				/>

				<div className="w-full">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Номер телефона <span className="text-[#FFA655]">*</span>
					</label>
					<div className="relative flex items-center">
						<span className="text-gray-700 h-[48px] bg-white rounded-l-[8px] border border-[#E4E4E7] border-r-0 flex justify-center items-center px-3">
							+996
						</span>
						<input
							type="tel"
							inputMode="numeric"
							maxLength={9}
							value={phone.replace(/^\+996/, "")}
							onChange={(e) => {
								const digitsOnly = e.target.value.replace(/\D/g, "");
								if (digitsOnly.length <= 9) setPhone(`+996${digitsOnly}`);
							}}
							className="w-full px-2 h-[48px] rounded-r-[8px] border border-[#E4E4E7] outline-none"
						/>
					</div>
				</div>

				<Button
					className="h-[48px] mt-3"
					onClick={handleSave}
					disabled={isUpdatingProfile || isUpdatingPhoto}>
					{isUpdatingProfile || isUpdatingPhoto ? "Сохранение..." : "Сохранить"}
				</Button>
			</div>
		</section>
	);
};

export default EditProfile;
