"use client";
import PhoneInput from "phone-go";
import "phone-go/dist/phone-go.css";
import { Description } from "@/components/ui/text/Description";
import { GoChevronLeft } from "react-icons/go";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { PAGE } from "@/config/pages/public-page.config";
import { useState } from "react";
import Input from "@/components/ui/input/Input";

const Login = () => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const [phoneError, setPhoneError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleLogin();
	};

	const handleLogin = () => {
		// Проверка телефона
		if (!phone || phone.length < 9) {
			setPhoneError("Введите корректный номер телефона!");
			return;
		} else {
			setPhoneError(null);
		}

		// Проверка пароля
		if (!password) {
			setPasswordError("Пароль не может быть пустым!");
			return;
		} else {
			setPasswordError(null);
		}

		// Пример: отправка данных на сервер
		const isLoginSuccessful = mockLogin(phone, password); // Замените на реальный запрос

		if (!isLoginSuccessful) {
			setPasswordError("Неправильный номер или пароль! Попробуйте ещё раз.");
		} else {
			alert("Успешный вход!");
			// Здесь можно перенаправить пользователя на другую страницу
		}
	};

	// Пример функции для проверки логина (замените на реальный запрос к серверу)
	const mockLogin = (phone: string, password: string) => {
		// Пример: проверка с фиктивными данными
		const mockPhone = "123456789";
		const mockPassword = "123";

		return phone === mockPhone && password === mockPassword;
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		if (passwordError) {
			setPasswordError(null); // очищаем ошибку при новом вводе
		}
	};

	return (
		<section className="bg-white pt-10 w-full h-screen">
			<div className="max-w-md px-[20px] mx-auto">
				{/* Header */}
				<div className="flex items-center gap-3 mb-4 border-b border-[#E4E4E7]">
					<Link
						href={PAGE.AUTH_PRE_REGISTRATION}
						className="flex items-center gap-2 text-[16px] font-[500] pb-4">
						<GoChevronLeft size={26} />
						Авторизация
					</Link>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex flex-col gap-2 mt-10">
						<TitleComponent>Введите номер и пароль</TitleComponent>

						{/* Поле ввода телефона */}
						<PhoneInput
							className="my-phone-input mt-[10px]"
							value={phone}
							onChange={setPhone}
							defaultCountry="KG"
						/>
						{phoneError && (
							<p className="text-red-500 text-sm mt-1 text-left">
								{phoneError}
							</p>
						)}

						{/* Поле ввода пароля */}
						<div className="w-full max-w-full mt-2">
							<Input
								placeholder="Введите пароль"
								type="password"
								value={password}
								onChange={handlePasswordChange}
								error={!!passwordError}
							/>
							{passwordError && (
								<p className="text-red-500 text-sm mt-1 text-left">
									{passwordError}
								</p>
							)}
						</div>

						<Description className="mt-6 !text-[12px] pb-6">
							Вы принимаете {""}
							<Link href="#" className="text-[#AAA4C2] hover:underline">
								Условия использования
							</Link>
							.
							<br />
							<Link href="#" className="text-[#AAA4C2] hover:underline">
								Оферта
							</Link>{" "}
							·{" "}
							<Link href="#" className="text-[#AAA4C2] hover:underline">
								Политика
							</Link>{" "}
							·{" "}
							<Link href="#" className="text-[#AAA4C2] hover:underline">
								Соглашение
							</Link>
						</Description>

						{/* Кнопка входа */}
						<Button type="submit">Войти</Button>
					</div>
				</form>

				{/* Ссылка на восстановление пароля */}
				<Link
					href={PAGE.AUTH_RESET_PASSWORD}
					className="flex justify-center mt-4 text-[14px] font-[500] text-[#AAA4C2] hover:underline">
					Забыли пароль?
				</Link>
			</div>
		</section>
	);
};

export default Login;
