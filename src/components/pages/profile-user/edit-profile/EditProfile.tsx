"use client";
import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/heading/PageHeader";
import Input from "@/components/ui/input/Input";
import PhotoUpload from "@/components/ui/input/PhotoUpload";
import { PAGE } from "@/config/pages/public-page.config";
import PhoneInput from "phone-go";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "phone-go/dist/phone-go.css";

const EditProfile = () => {
	const [photo, setPhoto] = useState<File | null>(null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");

	return (
		<section>
			<PageHeader
				href={PAGE.PROFILE}
				title="Личные данные"
			/>
			<div className="m-4 md:p-4 p-0 md:bg-white bg-transparent rounded-[8px] flex flex-col gap-3">
				<PhotoUpload
					label={
						<>
							Фото <span className="text-[#FFA655]">*</span>
						</>
					}
					value={photo}
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
				{/* Кастомное поле даты с react-datepicker */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Дата рождения *
					</label>
					<div className="relative w-full ">
						<DatePicker
							selected={birthDate}
							onChange={(date: Date | null) => setBirthDate(date)}
							dateFormat="dd.MM.yyyy"
							placeholderText="Введите дату рождения"
							className="w-full max-w-full h-[48px] px-4 py-4 rounded-[8px] border outline-none border-[#E4E4E7]    "
							calendarClassName="react-datepicker-custom"
							wrapperClassName="w-full"
						/>
					</div>
				</div>
				<div className="w-full md:max-w-[343px] max-w-full">
					<Input
						label={
							<>
								Пароль <span className="text-[#FFA655]">*</span>
							</>
						}
						type="password"
						placeholder="Введите пароль"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div className="w-full">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Номер телефона <span className="text-[#FFA655]">*</span>
					</label>
					<PhoneInput
						className="my-phone-input" // если хотите изменить стиль
						value={phone}
						onChange={setPhone}
						defaultCountry="KG"
					/>
				</div>
				<Button className="h-[48px] mt-3">Сохранить</Button>
			</div>
		</section>
	);
};

export default EditProfile;
