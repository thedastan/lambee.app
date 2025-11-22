"use client";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React, { useState } from "react";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonuses";

const PaymentForma = () => {
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("finikPay");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [selectedAddress, setSelectedAddress] = useState<string>("");

	const addresses = [
		{
			id: "gorokogo",
			label: "Горького 1/2",
		},
		{
			id: "fuchika",
			label: "Фучика 24",
		},
	];

	const handleSelect = (method: PaymentMethod) => {
		setSelectedMethod(method);
	};

	// Функция для проверки, выбран ли метод
	const isSelected = (method: PaymentMethod) => selectedMethod === method;
	return (
		<section className="flex flex-col gap-2">
			<div className="bg-[#FFF3E0] flex justify-between items-center px-4 border-b border-[#F0DBB6] h-[64px]">
				<Description className="text-[#AAA4C2]">Итого</Description>
				<Title className="font-[600]">14 200 с</Title>
			</div>

			<div className="bg-[#FFFDFA] w-full h-[28px]"></div>
			<div className="bg-[#FFFDFA] p-4 flex flex-col gap-3">
				<Input label="Имя *" />
				<Input label="Фамилия *" />
				<div className="">
					<label className="block text-[14px] font-medium text-[#515151] mb-2">
						Адрес *
					</label>
					<button
						onClick={() => setIsModalOpen(true)}
						className="w-full h-[48px] px-4  rounded-[8px]  text-[16px] font-[600] border border-[#E4E4E7]  outline-none transition-all duration-200">
						Добавить адрес
					</button>
				</div>
				<Input label="Номер телефона *" />
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<CustomRadioGroup
						options={addresses}
						name="deliveryAddress"
						value={selectedAddress}
						onChange={setSelectedAddress}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<Button
						className="w-full border border-[#E4E4E7] bg-transparent !text-black"
						onClick={() => setIsModalOpen(false)}>
						Добавить ещё адрес
					</Button>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalOpen(false)}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal>

			{/* <Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Добавить адрес">
				<div className="flex flex-col gap-3">

					<Input label="Адрес *"/>
					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalOpen(false)}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal> */}

			<div className="flex flex-col gap-4 bg-[#FFFDFA] p-4">
				<Title>Способ оплаты</Title>

				<div className="rounded-[8px] bg-white">
					{/* Finik Pay */}
					<div
						className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
							isSelected("finikPay")
								? "border-[#AAA4C2]" // Выбранный элемент
								: "border-[#DEDEDE]"
						} rounded-tr-[8px] rounded-tl-[8px] rounded-[0]`}
						onClick={() => handleSelect("finikPay")}>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="paymentMethod"
								className="sr-only"
								checked={isSelected("finikPay")}
								onChange={() => handleSelect("finikPay")}
							/>
							<label className="flex items-center text-[14px] gap-2 cursor-pointer">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										isSelected("finikPay")
											? "border-[#AAA4C2] bg-[#AAA4C2]" // Стили для выбранного
											: "border-[#DEDEDE]"
									}`}>
									<span
										className={`w-2 h-2 rounded-full ${
											isSelected("finikPay") ? "bg-white" : "bg-transparent" // Показываем точку только если выбрано
										}`}></span>
								</span>
								Finik Pay
							</label>
						</div>

						<span className="bg-[#AAA4C2] text-white text-[12px] px-2 py-1 rounded-[6px] font-[500]">
							КЭШБЕК 5%
						</span>
					</div>

					{/* Баланс Lambee */}
					<div
						className={`flex items-center justify-between border ${
							isSelected("lambeeBalance")
								? "border-[#AAA4C2]" // Выбранный элемент
								: "border-[#DEDEDE]"
						} px-4 py-3 cursor-pointer`}
						onClick={() => handleSelect("lambeeBalance")}>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="paymentMethod"
								className="sr-only"
								checked={isSelected("lambeeBalance")}
								onChange={() => handleSelect("lambeeBalance")}
							/>
							<label className="flex items-center text-[14px] gap-2 cursor-pointer">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										isSelected("lambeeBalance")
											? "border-[#AAA4C2] bg-[#AAA4C2]" // Стили для выбранного
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

						<span className="bg-[#AAA4C2] text-white text-[12px] px-2 py-1 rounded-[6px] font-[500]">
							КЭШБЕК 5%
						</span>
					</div>

					{/* Бонусы */}
					<div
						className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
							isSelected("bonuses")
								? "border-[#AAA4C2]" // Выбранный элемент
								: "border-[#DEDEDE]"
						} rounded-br-[8px] rounded-bl-[8px] rounded-[0]`}
						onClick={() => handleSelect("bonuses")}>
						<div className="flex items-center gap-3">
							<input
								type="radio"
								name="paymentMethod"
								className="sr-only"
								checked={isSelected("bonuses")}
								onChange={() => handleSelect("bonuses")}
							/>
							<label className="flex items-center text-[14px] gap-2 cursor-pointer">
								<span
									className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
										isSelected("bonuses")
											? "border-[#AAA4C2] bg-[#AAA4C2]" // Стили для выбранного
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
