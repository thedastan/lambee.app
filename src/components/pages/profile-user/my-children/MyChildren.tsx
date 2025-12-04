"use client";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/heading/PageHeader";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { PAGE } from "@/config/pages/public-page.config";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import img from "@/assets/images/Diapers.png";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import Input from "@/components/ui/input/Input";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "@/components/ui/input/DateInput";
import Image from "next/image";


const initialChildrenData = [
	{
		title: "Подгузники",
		follow: [{ img: img, name: "Али" }],
	},
	{
		title: "Трусики",
		follow: [{ img: img, name: "Алия" }],
	},
];

const initialRegisteredChildren = [
	{ id: "1", name: "Алия" },
	{ id: "2", name: "Али" },
];

type Child = {
	id: string;
	name: string;
};

const MyChildren = () => {
	const [childrenData] = useState(initialChildrenData);
	const [registeredChildren, setRegisteredChildren] = useState<Child[]>(
		initialRegisteredChildren
	);

	const [selectedChildId, setSelectedChildId] = useState<string>("");
	const [newChildName, setNewChildName] = useState("");
	const [birthDate, setBirthDate] = useState<Date | null>(null);

	// 'date' → 'choose' → 'add'
	const [modalStep, setModalStep] = useState<null | "date" | "choose" | "add">(
		null
	);

	const openDateModal = () => {
		setBirthDate(null);
		setModalStep("date");
	};

	const openChooseModal = () => {
		setSelectedChildId("");
		setModalStep("choose");
	};

	const openAddModal = () => {
		setNewChildName("");
		setModalStep("add");
	};

	const closeModal = () => {
		setModalStep(null);
	};

	const handleDateNext = () => {
		if (birthDate) {
			openChooseModal();
		}
	};

	const handleAddChild = () => {
		if (newChildName.trim()) {
			const newChild: Child = {
				id: Date.now().toString(),
				name: newChildName.trim(),
			};
			setRegisteredChildren((prev) => [...prev, newChild]);
			setSelectedChildId(newChild.id);
		}
		openChooseModal();
	};

	return (
		<section>
			<PageHeader href={PAGE.PROFILE} title="Мои дети" />

		 

			<div className="p-4">
				<TitleComponent className="text-[24px]">
					Дети и их подписки
				</TitleComponent>
				<Description className="text-[#515151] pb-[4px] mt-1">
					Здесь вы можете посмотреть детей <br /> и привязанные подписки к ним
				</Description>

				<div className="flex flex-col gap-4 mt-6">
					{childrenData.map((child, index) => (
						<div
							key={index}
							className="border border-[#E4E4E7] rounded-[8px] p-4 bg-white">
							<div className="w-full flex items-center justify-between">
								<TitleComponent>{child.title}</TitleComponent>
								<Button className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
									<FiEdit2 />
								</Button>
							</div>

							<div className="w-full flex flex-col items-start gap-3 mt-3">
								{child.follow.map((item, idx) => (
									<div
										key={idx}
										className="flex items-center gap-2 border border-[#E4E4E7] rounded-[8px] p-2 bg-[#FAFAFA]">
										<div className="rounded-[8px] overflow-hidden relative w-[40px] h-[40px]">
											<Image
											fill
												src={item.img.src}
												alt={item.name}
												className="w-full h-full object-cover"
											/>
										</div>
										<Description>{item.name}</Description>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<Button
					onClick={openDateModal}
					className="bg-white w-full mt-4 border border-[#E4E4E7] !text-black">
					Добавить ребенка
				</Button>

				{/* Модалка 1: Ввод даты рождения */}
				<Modal
					isOpen={modalStep === "date"}
					onClose={closeModal}
					title="Дата рождения ребёнка">
					<div className="flex flex-col gap-4">
						<DateInput
							label="Дата рождения"
							required
							selected={birthDate}
							onChange={(date) => setBirthDate(date)}
							placeholderText="ДД.ММ.ГГГГ"
						/>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] bg-transparent !text-black"
								onClick={closeModal}>
								Отмена
							</Button>
							<Button
								className="w-full"
								onClick={handleDateNext}
								disabled={!birthDate}>
								Далее
							</Button>
						</div>
					</div>
				</Modal>

				{/* Модалка 2: Выбор из существующих детей */}
				<Modal
					isOpen={modalStep === "choose"}
					onClose={closeModal}
					title="Выберите ребёнка">
					<div className="flex flex-col gap-3">
						<CustomRadioGroup
							options={registeredChildren.map((child) => ({
								id: child.id,
								label: child.name,
							}))}
							name="childSelection"
							value={selectedChildId}
							onChange={setSelectedChildId}
						/>

						<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

						<Button
							className="w-full border border-[#E4E4E7] bg-transparent !text-black"
							onClick={openAddModal}>
							Добавить нового ребёнка
						</Button>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] bg-transparent !text-black"
								onClick={openDateModal}>
								Назад
							</Button>
							<Button className="w-full" onClick={closeModal}>
								Готово
							</Button>
						</div>
					</div>
				</Modal>

				{/* Модалка 3: Добавление нового ребёнка */}
				<Modal
					isOpen={modalStep === "add"}
					onClose={closeModal}
					title="Добавить ребёнка">
					<div className="flex flex-col gap-4">
						<Input
							label={
								<>
									Имя ребёнка <span className="text-[#FF5F57]">*</span>
								</>
							}
							value={newChildName}
							onChange={(e) => setNewChildName(e.target.value)}
							placeholder="Например: Амина"
						/>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] bg-transparent !text-black"
								onClick={openChooseModal}>
								Назад
							</Button>
							<Button
								className="w-full"
								onClick={handleAddChild}
								disabled={!newChildName.trim()}>
								Сохранить
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default MyChildren;
