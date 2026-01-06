"use client";

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
	const [phone, setPhone] = useState(""); // всегда в формате "+996XXXXXXXXX"
	const [password, setPassword] = useState("");
	const [phoneError, setPhoneError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	const router = useRouter();
	const { login, isLoggingIn } = useLogin();

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setPassword(value);
		if (passwordError) setPasswordError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setPhoneError(null);
		setPasswordError(null);

		// Валидация: телефон должен быть +996 + 9 цифр
		const cleanPhone = phone.replace(/^\+996/, "");
		if (cleanPhone.length !== 9 || !/^\d{9}$/.test(cleanPhone)) {
			setPhoneError("Введите корректный номер телефона!");
			return;
		}

		if (!password.trim()) {
			setPasswordError("Пароль не может быть пустым!");
			return;
		}

		try {
			const result = await login({
				iso_code_id: 1,
				phone: cleanPhone,
				password: password.trim(),
			});

			if (result?.access && result?.refresh) {
				localStorage.setItem("accessToken", result.access);
				localStorage.setItem("refreshToken", result.refresh);
				toast.success("Успешный вход!", { position: "top-center" });
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
			<div className="md:w-[50%] w-full md:h-[100vh] h-full flex flex-col justify-center items-center">
				<Link
					href={PAGE.AUTH_PRE_REGISTRATION}
					className="flex items-center gap-2 text-[16px] font-[500] p-4 w-full">
					<GoChevronLeft size={26} />
					Авторизация
				</Link>

				<div className="w-full h-full flex justify-center md:items-center items-start md:mt-0 mt-10">
					<div className="max-w-[440px] w-full md:bg-[#FAFAFA] bg-transparent rounded-[16px] mx-auto p-[20px]">
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:bg-white bg-[#f0f7ff] rounded-[16px] md:p-4 p-0">
							<div className="flex flex-col gap-2">
								<TitleComponent className="text-center">
									Введите номер и пароль
								</TitleComponent>

								{/* === КАСТОМНЫЙ ТЕЛЕФОН БЕЗ PHONE-GO === */}
								<div className="w-full">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Номер телефона <span className="text-[#FFA655]">*</span>
									</label>
									<div className="relative flex items-center">
										<span className="text-gray-700 h-[48px] bg-white rounded-tr-none rounded-br-none border-t border-b border-l border-[#E4E4E7] rounded-[8px] flex justify-center items-center px-3 text-[16px] font-medium min-w-[70px]">
											+996
										</span>
										<input
											type="tel"
											inputMode="numeric"
											maxLength={9}
											value={phone.replace(/^\+996/, "")}
											onChange={(e) => {
												const digitsOnly = e.target.value.replace(/\D/g, "");
												if (digitsOnly.length <= 9) {
													setPhone(`+996${digitsOnly}`);
												}
											}}
											className="w-full h-[48px] rounded-tl-none rounded-bl-none rounded-[8px] border border-[#E4E4E7] outline-none px-3  "
										/>
									</div>
									{phoneError && (
										<p className="text-red-500 text-sm mt-1 text-left">{phoneError}</p>
									)}
								</div>

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