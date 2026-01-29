"use client";

import React, { useState, useEffect } from "react";
import "alert-go/dist/notifier.css";

import { Description } from "@/components/ui/text/Description";
import { GoChevronLeft } from "react-icons/go";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import { PAGE } from "@/config/pages/public-page.config";
import { PinInput } from "react-input-pin-code";
import { useSendCode, useVerifyCode } from "@/redux/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/input/Input";
import { toast } from "alert-go";

import ImageSwipwr from "../ImageSwipwr";

const Registration = () => {
	const [step, setStep] = useState<1 | 2>(1);
	const [phone, setPhone] = useState(""); // "+996XXXXXXXXX"
	const [password, setPassword] = useState("");
	const [code, setCode] = useState<string[]>(["", "", "", ""]);
	const [resendTimer, setResendTimer] = useState(60);
	const [isTimerActive, setIsTimerActive] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// ✅ Состояние для реферального кода — теперь только внутреннее
	const [referralCode, setReferralCode] = useState<string>("");

	const { sendCode, isSending } = useSendCode();
	const { verifyCode, isVerifying } = useVerifyCode();
	const router = useRouter();
	const searchParams = useSearchParams(); // ← читаем URL-параметры

	// ✅ При монтировании — читаем ?ref=...
	useEffect(() => {
		const refParam = searchParams.get("ref");
		if (refParam) {
			setReferralCode(refParam.trim());
		}
	}, [searchParams]);

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
			handleVerify();
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

	const handleVerify = async () => {
		const fullCode = code.join("");
		if (fullCode.length !== 4) {
			setError("Введите 4-значный код");
			return;
		}

		setError(null);
		const cleanPhone = phone.replace(/^\+996/, "");

		// ✅ Формируем объект без лишних полей
		const payload: any = {
			iso_code_id: 1,
			phone: cleanPhone,
			password: password.trim(),
			code: fullCode,
		};

		// ✅ Добавляем реферальный код только если он есть
		if (referralCode) {
			payload.referral_code = referralCode;
		}

		try {
			const result = await verifyCode(payload);

			localStorage.setItem("accessToken", result.detail.access);
			localStorage.setItem("refreshToken", result.detail.refresh);

			toast.success("Регистрация завершена!", { position: "top-center" });

			router.push(PAGE.HOME);
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
				if (msg.includes("already exists")) {
					msg = "Этот номер уже используется. Войдите в аккаунт.";
				}
			}
			setError(msg);
		}
	};

	const handleNext = async () => {
		setError(null);

		if (!isValidKyrgyzPhone(phone)) {
			setError("Введите корректный номер (+996XXXXXXXXX)");
			return;
		}

		const trimmedPassword = password.trim();
		if (!trimmedPassword) {
			setError("Введите пароль");
			return;
		}

		const cleanPhone = phone.replace(/^\+996/, "");

		// ✅ Формируем объект без лишних полей
		const payload: any = {
			iso_code_id: 1,
			phone: cleanPhone,
			password: trimmedPassword,
		};

		// ✅ Добавляем реферальный код только если он есть
		if (referralCode) {
			payload.referral_code = referralCode;
		}

		try {
			await sendCode(payload);
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await handleVerify();
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
					Регистрация
				</Link>
				<div className="w-full h-full flex justify-center md:items-center items-start md:mt-0 mt-10">
					<div className="max-w-[440px] w-full h-full md:h-[390px] md:bg-[#FAFAFA] bg-transparent rounded-[16px] mx-auto p-[20px]">
						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:bg-white bg-[#f0f7ff] h-full rounded-[16px] md:p-4 p-0">
							{step === 1 && (
								<div className="flex flex-col gap-2 text-center">
									<TitleComponent>Введите номер и пароль</TitleComponent>
									<Description className="text-[#515151] mb-2">
										Вам придёт SMS с кодом
									</Description>

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
												className="w-full h-[48px] rounded-tl-none rounded-bl-none rounded-[8px] border border-[#E4E4E7] outline-none px-3"
											/>
										</div>
									</div>

									{/* Поле пароля */}
									<Input
										type="password"
										placeholder="Пароль"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full p-3 border border-gray-300 rounded mt-2"
									/>

									{/* ❌ УДАЛЕНО: поле ввода реферального кода */}

									<Description className="mt-6 !text-[12px] pb-6 text-start">
										Регистрируясь вы принимаете{" "}
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

									<Button
										type="button"
										onClick={handleNext}
										disabled={
											!phone ||
											!isValidKyrgyzPhone(phone) ||
											!password.trim() ||
											isSending
										}>
										{isSending ? "Отправка..." : "Зарегистрироваться"}
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
						</form>
					</div>
				</div>
			</div>

			<div className="">
				 
			</div>

			<ImageSwipwr />
		</section>
	);
};

export default Registration;