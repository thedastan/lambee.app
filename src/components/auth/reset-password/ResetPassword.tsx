"use client";

import React, { useState, useEffect } from "react";
import { Description } from "@/components/ui/text/Description";
import { GoChevronLeft } from "react-icons/go";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { PAGE } from "@/config/pages/public-page.config";
import { PinInput } from "react-input-pin-code";
import Input from "@/components/ui/input/Input";
import { useRouter } from "next/navigation";
import {
	useResetPassword,
	useSendForgotCode,
	useVerifyForgotCode,
} from "@/redux/hooks/useAuth";
import ImageSwipwr from "../ImageSwipwr";
import "alert-go/dist/notifier.css";
import { toast } from "alert-go";

const ResetPassword = () => {
	const [step, setStep] = useState<1 | 2 | 3>(1);
	const [phone, setPhone] = useState(""); // "+996XXXXXXXXX"
	const [code, setCode] = useState<string[]>(["", "", "", ""]);
	const [password, setPassword] = useState("");
	const [resendTimer, setResendTimer] = useState(60);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();

	const { sendForgotCode, isSending } = useSendForgotCode();
	const { verifyForgotCode, isVerifying } = useVerifyForgotCode();
	const { resetPassword, isResetting } = useResetPassword();

	// Таймер
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isTimerActive && resendTimer > 0) {
			timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
		} else if (resendTimer === 0) {
			setIsTimerActive(false);
		}
		return () => clearTimeout(timer);
	}, [resendTimer, isTimerActive]);

	// ✅ Автоматическая отправка кода после заполнения всех 4 полей
	useEffect(() => {
		if (step === 2 && code.join("").length === 4 && !isVerifying && !error) {
			handleVerifyCode();
		}
	}, [code, step, isVerifying, error]);

	useEffect(() => {
		if (error) {
			toast.error(error, { position: "top-center" });
		}
	}, [error]);

	const isValidKyrgyzPhone = (value: string): boolean => {
		return /^\+996[0-9]{9}$/.test(value);
	};

	// ✅ Вынесена логика верификации кода
	const handleVerifyCode = async () => {
		const fullCode = code.join("");
		if (fullCode.length !== 4) {
			setError("Введите 4-значный код");
			return;
		}

		setError(null);
		const cleanPhone = phone.replace(/^\+996/, "");

		try {
			await verifyForgotCode({
				iso_code_id: 1,
				phone: cleanPhone,
				code: fullCode,
			});
			setStep(3);
		} catch (err: unknown) {
			let msg = "Неверный код";
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
			setError(msg);
		}
	};

	// Шаг 1: отправка кода
	const handleNext = async () => {
		setError(null);
		if (!isValidKyrgyzPhone(phone)) {
			setError("Введите корректный номер (+996XXXXXXXXX)");
			return;
		}

		const cleanPhone = phone.replace(/^\+996/, "");

		try {
			await sendForgotCode({
				iso_code_id: 1,
				phone: cleanPhone,
			});
			setStep(2);
			setResendTimer(60);
			setIsTimerActive(true);
			setCode(["", "", "", ""]); // ✅ Сброс кода после перехода на шаг 2
		} catch (err: unknown) {
			let msg = "Не удалось отправить SMS";
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
			setError(msg);
		}
	};

	// Шаг 2: проверка кода (использует новую функцию)
	const handleSubmitCode = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleVerifyCode();
	};

	// Шаг 3: сброс пароля
	const handleSubmitPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		if (!password.trim()) {
			setError("Введите новый пароль");
			return;
		}

		const cleanPhone = phone.replace(/^\+996/, "");

		try {
			const result = await resetPassword({
				iso_code_id: 1,
				phone: cleanPhone,
				password: password.trim(),
				code: code.join(""),
			});

			localStorage.setItem("accessToken", result.detail.access);
			localStorage.setItem("refreshToken", result.detail.refresh);

			toast.success("Пароль успешно изменён!", { position: "top-center" });

			router.push("/");
		} catch (err: unknown) {
			let msg = "Ошибка при смене пароля";
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
			setError(msg);
		}
	};

	const handleResendCode = () => {
		setStep(1);
		setError(null);
		setCode(["", "", "", ""]); // ✅ Сброс кода при повторной отправке
	};

	const handlePinChange = (
		_: string | string[],
		__: number,
		values: string[]
	) => {
		setCode(values);
		if (error) setError(null); // ✅ Сброс ошибки при изменении кода
	};

	return (
		<section className="flex justify-between md:flex-row flex-col-reverse md:bg-[#FFFFFF] bg-[#f0f7ff] w-full h-[100vh]">
			<div className="md:w-[50%] w-full md:h-[100vh] h-full flex flex-col justify-center items-center">
				<Link
					href={PAGE.AUTH_PRE_REGISTRATION}
					className="flex items-center gap-2 text-[16px] font-[500] p-4 w-full">
					<GoChevronLeft size={26} />
					Восстановление аккаунта
				</Link>

				<div className="w-full h-full   flex justify-center md:items-center items-start md:mt-0 mt-10">
					<div className="max-w-[440px] h-[100%] md:h-[390px] w-full md:bg-[#FAFAFA] bg-transparent rounded-[16px] mx-auto p-[20px]">
					 
						<form
							onSubmit={
								step === 2
									? handleSubmitCode
									: step === 3
									? handleSubmitPassword
									: undefined
							}
							className="space-y-4 md:bg-white bg-[#f0f7ff] h-full rounded-[16px] md:p-4 p-0">
							{step === 1 && (
								<div className="flex flex-col gap-2 md:justify-center justify-start h-full">
									<TitleComponent className="text-center">
										Введите номер телефона
									</TitleComponent>
									<Description className="text-[#515151] mb-2 text-center">
										Вам придёт SMS с кодом
									</Description>

									{/* === КАСТОМНЫЙ ТЕЛЕФОН БЕЗ PHONE-GO === */}
									<div className="w-full">
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
									</div>

									<Button
										type="button"
										onClick={handleNext}
										disabled={
											!phone || !isValidKyrgyzPhone(phone) || isSending
										}>
										{isSending ? "Отправка..." : "Получить код"}
									</Button>
								</div>
							)}

							{step === 2 && (
								<div className="flex flex-col gap-6 md:gap-1 text-center md:justify-center justify-between   h-full">
									<div className="flex flex-col gap-3 text-center md:mt-0 mt-10">
										<TitleComponent>Введите код из SMS</TitleComponent>
										<Description>отправленный на номер {phone}</Description>

										<div className="flex justify-center">
											<PinInput
												values={code}
												onChange={handlePinChange}
												type="number"
												inputClassName="pin-input-field"
												mask={false}
												placeholder=""
												inputStyle={{
													width: "64px",
													height: "64px",
													border: "1px solid #CDD5DF",
													borderRadius: "8px",
													fontSize: "20px",
													textAlign: "center",
													background: "transparent",
													margin: "0 2px",
													boxShadow: "none",
													backgroundColor: "white",
												}}
											/>
										</div>
									</div>

									<div className="text-center mt-4">
										{isTimerActive ? (
											<Description className="text-[#0071E3]">
												Отправить повторно{" "}
												{String(resendTimer).padStart(2, "0")}
											</Description>
										) : (
											<button
												type="button"
												onClick={handleResendCode}
												className="text-[#0071E3] underline">
												Отправить повторно
											</button>
										)}
									</div>
								</div>
							)}

							{step === 3 && (
								<div className="flex flex-col gap-2 md:justify-center justify-start h-full text-center">
									<TitleComponent>Создайте новый пароль</TitleComponent>
									<Description className="text-[#515151] mb-2">
										Придумайте пароль для защиты вашего аккаунта
									</Description>

									<Input
										placeholder="Введите пароль"
										className="mt-2"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										error={!!error}
									/>

									<Button
										type="submit"
										disabled={isResetting || !password.trim()}>
										{isResetting ? "Сохранение..." : "Сохранить пароль"}
									</Button>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>

			<ImageSwipwr />
		</section>
	);
};

export default ResetPassword;
