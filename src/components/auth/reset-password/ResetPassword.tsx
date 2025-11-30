"use client";
import PhoneInput from "phone-go";
import React, { useState, useEffect } from "react";
import "phone-go/dist/phone-go.css";
import { Description } from "@/components/ui/text/Description";
import { GoChevronLeft } from "react-icons/go";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Link from "next/link";
import { PAGE } from "@/config/pages/public-page.config";
import { PinInput } from "react-input-pin-code";
import Input from "@/components/ui/input/Input";

const ResetPassword = () => {
	const [step, setStep] = useState(1);
	const [phone, setPhone] = useState("");
	const [code, setCode] = useState<string[]>(["", "", "", ""]);
	const [resendTimer, setResendTimer] = useState(60);
	const [isTimerActive, setIsTimerActive] = useState(false);

	// Запуск таймера при переходе на шаг 2
	useEffect(() => {
		if (step === 3 && !isTimerActive) {
			setIsTimerActive(true);
		}
	}, [step, isTimerActive]);

	console.log(setStep);
	

	// Таймер обратного отсчёта
	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (isTimerActive && resendTimer > 0) {
			timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
		} else if (resendTimer === 0) {
			setIsTimerActive(false);
		}
		return () => clearTimeout(timer);
	}, [resendTimer, isTimerActive]);
 

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const fullCode = code.join("");
		if (fullCode.length !== 4) return;
		console.log("Submitted data:", { phone, code: fullCode });
		alert("Регистрация успешна! Добро пожаловать.");
	};

	const handleResendCode = () => {
		console.log("Отправка нового SMS на", phone);
		setResendTimer(60);
		setIsTimerActive(true);
	};

	// Обработчик для PinInput
	const handlePinChange = (
		value: string | string[],
		index: number,
		values: string[]
	) => {
		// `values` — это обновлённый массив (уже с новым значением на нужной позиции)
		setCode(values);
	};

	return (
		<section className="bg-white  w-full h-[100vh]">
			<div className="max-w-md mx-auto px-[20px] flex flex-col justify-between h-screen ">
				<div className="flex items-center gap-3 mb-4 pt-10 border-b border-[#E4E4E7]">
					<Link
						href={PAGE.AUTH_PRE_REGISTRATION}
						className="flex items-center gap-2 text-[16px] font-[500] pb-4">
						<GoChevronLeft size={26} />
						Восстановление аккаунта
					</Link>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4 h-auto -mt-20">
					{step === 1 && (
						<div className="flex flex-col gap-2  ">
							<TitleComponent>Введите номер телефона</TitleComponent>
							<Description className="text-[#515151] mb-2">
								Вам придёт sms с кодом
							</Description>

							<PhoneInput
								className="my-phone-input"
								value={phone}
								onChange={setPhone}
								defaultCountry="KG"
							/>
						</div>
					)}

					{/* Step 2: Enter SMS Code */}
					{step === 2 && (
						<div className="flex flex-col gap-6 text-center">
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
										borderRadius: "8px",
										fontSize: "20px",
										textAlign: "center",
										background: "transparent",
										margin: "0 2px",
										boxShadow: "none",
									}}
								/>
							</div>

							<div className="text-center mt-4">
								{isTimerActive ? (
									<Description className="text-[#AAA4C2]">
										Отправить повторно {String(resendTimer).padStart(2, "0")}
									</Description>
								) : (
									<button
										type="button"
										onClick={handleResendCode}
										className="text-[#AAA4C2] underline  ">
										Отправить повторно
									</button>
								)}
							</div>
						</div>
					)}

					{step === 3 && (
						<div className="flex flex-col gap-6 text-center">
							<TitleComponent>Создайте новый пароль</TitleComponent>
							<Description className="text-[#515151] mb-2">
								Придумайте пароль для защиты <br /> вашего аккаунта
							</Description>

							<Input
								placeholder="Введите пароль"
								className="mt-2"
								type="password"
							/>
						</div>
					)}
				</form>

				<div />
			</div>
		</section>
	);
};

export default ResetPassword;
