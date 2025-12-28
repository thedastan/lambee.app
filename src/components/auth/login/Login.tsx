// src/app/login/page.tsx
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
import { useLogin } from "@/redux/hooks/useAuth";
import { useRouter } from "next/navigation";
 
import ImageSwipwr from "../ImageSwipwr";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";


const Login = () => {
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const router = useRouter();
	const { login, isLoggingIn } = useLogin();


	// Сброс ошибки при изменении телефона
	const handlePhoneChange = (value: string) => {
		setPhone(value);
		if (phoneError) setPhoneError(null);
	};

	// Сброс ошибки при изменении пароля
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		if (passwordError) setPasswordError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Очищаем предыдущие ошибки
		setPhoneError(null);
		setPasswordError(null);

		// Валидация телефона
		if (!phone || phone.length < 13) {
			setPhoneError("Введите корректный номер телефона!");
			return;
		}

		// Валидация пароля
		if (!password.trim()) {
			setPasswordError("Пароль не может быть пустым!");
			return;
		}

		// Убираем +996
		const cleanPhone = phone.replace(/^\+996/, "");

		try {
			const result = await login({
				iso_code_id: 1,
				phone: cleanPhone,
				password: password.trim(),
			});

			if (result?.access && result?.refresh) {
				localStorage.setItem("accessToken", result.access);
				localStorage.setItem("refreshToken", result.refresh);
				toast.success("Успешный вход!", { position: "top-center"});
				router.push("/");
			} else {
				setPasswordError("Неожиданный ответ от сервера");
			}
		} catch (err: unknown) {
			console.error("Ошибка входа:", err);
		
			 
			let msg = "Неверный номер или пароль";
		
			if (
				err &&
				typeof err === "object" &&
				"response" in err &&
				err.response &&
				typeof err.response === "object" &&
				"data" in err.response &&
				err.response.data &&
				typeof err.response.data === "object" &&
				"detail" in err.response.data
			) {
				msg = String(err.response.data.detail);
			}
		
			const displayMessage =
				msg === "Invalid credentials" ? "Неверный номер или пароль" : msg;
		
			setPasswordError(displayMessage);
		}
	};

	return (
		<section className="flex justify-between md:flex-row flex-col-reverse md:bg-[#FFFFFF] bg-[#f0f7ff] w-full h-[100vh]">
			<div className="md:w-[50%]  w-full md:h-[100vh] h-full flex flex-col justify-center items-center">
				<Link
					href={PAGE.AUTH_PRE_REGISTRATION}
					className="flex items-center gap-2 text-[16px] font-[500] p-4  w-full">
					<GoChevronLeft size={26} />
					Авторизация
				</Link>

				<div className="w-full h-full flex justify-center md:items-center items-start md:mt-0 mt-10">
					<div className="max-w-[440px] w-full md:bg-[#FAFAFA] bg-transparent rounded-[16px] mx-auto p-[20px]">
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:bg-white bg-[#f0f7ff] rounded-[16px] md:p-4 p-0">
							<div className="flex flex-col gap-2">
								<TitleComponent className="text-center">Введите номер и пароль</TitleComponent>

								<PhoneInput
									className="my-phone-input mt-[10px]"
									value={phone}
									onChange={handlePhoneChange}
									defaultCountry="KG"
								/>
								{phoneError && (
									<p className="text-red-500 text-sm mt-1 text-left">
										{phoneError}
									</p>
								)}

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
									Вы принимаете{" "}
									<Link href="#" className="text-[#0071E3] hover:underline">
										Условия использования
									</Link>
									.
									<br />
									<Link href="#" className="text-[#0071E3] hover:underline">
										Оферта
									</Link>{" "}
									·{" "}
									<Link href="#" className="text-[#0071E3] hover:underline">
										Политика
									</Link>{" "}
									·{" "}
									<Link href="#" className="text-[#0071E3] hover:underline">
										Соглашение
									</Link>
								</Description>

								<Button type="submit" disabled={isLoggingIn}>
									{isLoggingIn ? "Вход..." : "Войти"}
								</Button>
							</div>
						</form>
						<Link
							href={PAGE.AUTH_RESET_PASSWORD}
							className="flex justify-center mt-4 text-[14px] font-[500] text-[#0071E3] hover:underline">
							Забыли пароль?
						</Link>
					</div>
				</div>
			</div>

			<ImageSwipwr />
		</section>
	);
};

export default Login;
