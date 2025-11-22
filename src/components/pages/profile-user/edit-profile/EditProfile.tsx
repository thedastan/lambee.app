"use client";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import PhotoUpload from "@/components/ui/input/PhotoUpload";
import React, { useState } from "react";

const EditProfile = () => {
	const [photo, setPhoto] = useState<File | null>(null);

	return (
		<section className="m-4 md:p-4 p-0 md:bg-white bg-transparent rounded-[8px] flex flex-col gap-3">
			<PhotoUpload
				label="Фото"
				value={photo}
				onChange={setPhoto}
				maxFileSizeMB={5}
			/>

			<Input placeholder="Введите имя" label="Имя *" />
			<Input placeholder="Введите фамилию" label="Фамилия *" />
			<Input
				type="date"
				placeholder="Введите дату рождения"
				label="Дата рождения *"
			/>

			<div 					className="w-full max-w-[343px]"
			>
				<Input
					label="Пароль *"
					type="password"
				 
				/>
			</div>

			<Button className="h-[48px] mt-3">Сохранить</Button>
		</section>
	);
};

export default EditProfile;
