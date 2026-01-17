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
import { useRouter } from "next/navigation";
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

	const { sendCode, isSending } = useSendCode();
	const { verifyCode, isVerifying } = useVerifyCode();
	const router = useRouter();

	const [referralCode, setReferralCode] = useState("");

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isTimerActive && resendTimer > 0) {
			timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
		} else if (resendTimer === 0) {
			setIsTimerActive(false);
		}
		return () => clearTimeout(timer);
	}, [resendTimer, isTimerActive]);

	const isValidKyrgyzPhone = (value: string): boolean => {
		return /^\+996[0-9]{9}$/.test(value);
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

		try {
			await sendCode({
				iso_code_id: 1,
				phone: cleanPhone,
				password: trimmedPassword,
				referral_code: referralCode || null, // Передаем referral_code, если оно заполнено
			});
			setStep(2);
			setResendTimer(60);
			setIsTimerActive(true);
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
		setError(null);
		const fullCode = code.join("");
		if (fullCode.length !== 4) {
			setError("Введите 4-значный код");
			return;
		}

		const cleanPhone = phone.replace(/^\+996/, "");

		try {
			const result = await verifyCode({
				iso_code_id: 1,
				phone: cleanPhone,
				password: password.trim(),
				code: fullCode,
			});

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

	const handleResendCode = () => {
		setStep(1);
		setError(null);
	};

	const handlePinChange = (
		_: string | string[],
		__: number,
		values: string[]
	) => {
		setCode(values);
		if (error) setError(null);
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
					<div className="max-w-[440px] w-full md:bg-[#FAFAFA] bg-transparent rounded-[16px] mx-auto p-[20px]">
						{error && (
							<div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm text-center">
								{error}
							</div>
						)}

						<form
							onSubmit={handleSubmit}
							className="space-y-4 md:bg-white bg-[#f0f7ff] rounded-[16px] md:p-4 p-0">
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
												className="w-full h-[48px] rounded-tl-none rounded-bl-none rounded-[8px] border border-[#E4E4E7] outline-none px-3  "
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

									<Input
										type="text"
										placeholder="Реферальный код (необязательно)"
										value={referralCode}
										onChange={(e) => setReferralCode(e.target.value)}
										className="w-full p-3 border border-gray-300 rounded mt-2"
									/>

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
								<div className="flex flex-col gap-6 text-center mt-20">
									<TitleComponent>Введите код из SMS</TitleComponent>

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
												borderRadius: "8  ",
												fontSize: "20px",
												textAlign: "center",
												background: "transparent",
												margin: "0 2px",
												boxShadow: "none",
												backgroundColor: "white",
											}}
										/>
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

									<Button
										type="submit"
										disabled={isVerifying || code.some((c) => c === "")}>
										{isVerifying ? "Проверка..." : "Подтвердить"}
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

export default Registration;
