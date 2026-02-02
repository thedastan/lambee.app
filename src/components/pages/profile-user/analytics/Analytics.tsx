"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

// UI Components
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Title } from "@/components/ui/text/Title";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import statistics from "@/assets/svg/Statistics.svg";
import Button from "@/components/ui/button/Button";
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
	date: Date;
	onSave: (d: Date) => void;
}) => {
	const [tempDate, setTempDate] = useState(new Date(date));

	// Обновляем временную дату при открытии модалки
	useEffect(() => {
		if (isOpen) setTempDate(new Date(date));
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
		() => Array.from({ length: 80 }, (_, i) => (2026 - i).toString()),
		[]
	);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-[100] flex  items-center justify-center bg-black/50 backdrop-blur-[2px] p-4 animate-in fade-in duration-200"
			 >
			<div
				className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 ease-out"
				onClick={(e) => e.stopPropagation()}>
				<h3 className="text-center font-bold text-lg mb-4 text-black">
					Выберите дату
				</h3>

				<div className="relative flex px-2 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
					{/* Хайлайтер центральной строки */}
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
						className="flex-1 py-3 px-4   border font-medium !text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
						Отмена
					</Button>
					<Button
						onClick={() => {
							onSave(tempDate);
							onClose();
						}}
						className="flex-1 ">
						Готово
					</Button>
				</div>
			</div>
		</div>
	);
};

// --- Основной экран ---
const Analytics = () => {
	const [birthDate, setBirthDate] = useState(new Date());
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section className="min-h-screen bg-[#F8F9FB]">
			<PageHeader href={PAGE.PROFILE} title="Аналитика" />
			<div className="md:p-4 p-0">
				<div className="p-4 md:bg-white bg-transparent rounded-2xl">
					<TitleComponent className="text-[24px]">Статистика</TitleComponent>
					<Description className="pb-4">
					Здесь вы можете посмотреть вашу статистику
					</Description>

					{/* Триггер модалки */}
					<Description className="pb-2">Дата</Description>
					<div
						onClick={() => setIsModalOpen(true)}
						className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
						<div className="flex flex-col">
						 
							<span className="text-[#515151] font-[400] text-[16px]">
								{birthDate.toLocaleDateString("ru-RU", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</span>
						</div>
						<div className=" ">
							<LuCalendar size={20} />
						</div>
					</div>

					<DatePickerModal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						date={birthDate}
						onSave={setBirthDate}
					/>

					<div className="flex flex-col gap-4 mt-4">
						<div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Использовано подгузников:
								</Description>
								<Title>22</Title>
							</div>
							<Image src={statistics} alt="statistics" />
						</div>

						<div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Потрачено денег:
								</Description>
								<Title>14 000 с</Title>
							</div>
							<Image src={statistics} alt="statistics" />
						</div>

						<div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Какие размеры вы брали:
								</Description>
								<Title>S, M</Title>
							</div>
							<Image src={statistics} alt="statistics" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Analytics;
