"use client";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck, FaHeart } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { PiCurrencyDollar } from "react-icons/pi";

const MiniSurvey = () => {
	const [step, setStep] = useState(1);
	const [answers, setAnswers] = useState({
		q1: "",
		q2: "",
		q3: "",
		q4: "",
	});

	const handleNext = () => {
		if (step < 4) {
			setStep(step + 1);
		} else {
			setStep(5); // Переход на шаг "успешно"
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAnswers({ ...answers, [name]: value });
	};

	return (
		<section
			className={`pt-10 w-full h-screen ${
				step === 5 ? "bg-[#FAFAFA]" : "bg-white"
			}`}>
			<div className="max-w-md mx-auto px-[20px]">
				<div className="flex items-center gap-3 mb-4 pb-6">
					<Link
						href={PAGE.AUTH_PRE_REGISTRATION}
						className="flex items-center gap-2 text-[16px] font-[500]">
						<GoChevronLeft size={26} />
						Небольшой опрос
					</Link>
				</div>

				{step <= 4 && (
					<>
						<Description className="text-center">Шаг {step} из 4</Description>
						<div className="w-full bg-[#DFEFFF] h-[4px] rounded-[8px] mb-6 mt-2">
							<div
								className="bg-[#AAA4C2] h-[4px] rounded-[8px] transition-all duration-300"
								style={{ width: `${step * 25}%` }}></div>
						</div>
					</>
				)}

				{step === 1 && (
					<div>
						<TitleComponent>
							Сколько месяцев <br /> вашему малышу?
						</TitleComponent>
						<Description className="text-[#3F3F46] mb-2 mt-2">
							Это поможет нам рекомендовать <br /> правильный выбор
						</Description>

						<Input
							name="q1"
							label="Возраст малыша"
							value={answers.q1}
							onChange={handleChange}
							placeholder="Введите возраст"
							className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
						/>

						<Button
							onClick={handleNext}
							disabled={!answers.q1.trim()}
							className=" w-full disabled:bg-gray-300">
							Далее
						</Button>
					</div>
				)}

				{step === 2 && (
					<div>
						<TitleComponent>
							Какой вес у вашего <br /> малыша?
						</TitleComponent>

						<Description className="text-[#3F3F46] mb-2 mt-2">
							Вес - лучший показатель <br /> для размера подгузников
						</Description>

						<Input
							name="q2"
							label="Вес малыша (кг)"
							value={answers.q2}
							onChange={handleChange}
							placeholder="Введите вес малыша"
							className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
						/>

						<Button
							onClick={handleNext}
							disabled={!answers.q2.trim()}
							className=" w-full disabled:bg-gray-300">
							Далее
						</Button>
					</div>
				)}

				{step === 3 && (
					<div>
						<TitleComponent>
							Ежедневное использование подгузников
						</TitleComponent>

						<Description className="text-[#3F3F46] mb-2 mt-2">
							Сколько подгузников использует ваш малыш в день?
						</Description>
						<Input
							name="q3"
							label="Подгузников в день"
							value={answers.q3}
							onChange={handleChange}
							placeholder="Введите количество"
							className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
						/>

						<Button
							onClick={handleNext}
							disabled={!answers.q3.trim()}
							className=" w-full disabled:bg-gray-300">
							Далее
						</Button>
					</div>
				)}

				{step === 4 && (
					<div>
						<TitleComponent>Что для вас важнее всего?</TitleComponent>

						<Description className="text-[#3F3F46] mb-2 mt-2">
							Выберите ваш приоритет
						</Description>

						{/* Вариант 1: Максимальный комфорт */}
						<label
							className={`flex mt-5 items-center gap-3 p-3 border rounded-lg mb-3 cursor-pointer transition-colors ${
								answers.q4 === "comfort"
									? "bg-[#F0EFFF] border-[#AAA4C2]"
									: "bg-white border-gray-300 hover:bg-gray-50"
							}`}>
							<input
								type="radio"
								name="priority"
								value="comfort"
								checked={answers.q4 === "comfort"}
								onChange={() => setAnswers({ ...answers, q4: "comfort" })}
								className="sr-only" // скрываем визуально, но оставляем для a11y
							/>
							<div className="w-6 h-6 flex items-center justify-center">
								<FaHeart
									size={20}
									className={
										answers.q4 === "comfort"
											? "text-[#AAA4C2]"
											: "text-gray-400"
									}
								/>
							</div>
							<div className="flex-1">
								<p
									className={` text-[14px] font-[500] ${
										answers.q4 === "comfort"
											? "text-[#AAA4C2]"
											: "text-[#3F3F46]"
									}`}>
									Максимальный комфорт
								</p>
								<p
									className={`text-[12px] font-[400] ${
										answers.q4 === "comfort"
											? "text-[#AAA4C2]"
											: "text-[#7D7D8A]"
									}`}>
									Премиальные материалы и функции
								</p>
							</div>
							{answers.q4 === "comfort" && (
								<div className="w-5 h-5 flex items-center justify-center">
									<span className="p-2 bg-[#AAA4C2] text-white rounded-[8px] flex items-center justify-center text-xs font-bold">
										<FaCheck size={10} />
									</span>
								</div>
							)}
						</label>

						{/* Вариант 2: Маленькая сумка */}
						<label
							className={`flex items-center gap-3 p-3 border rounded-lg mb-3 cursor-pointer transition-colors ${
								answers.q4 === "budget"
									? "bg-[#F0EFFF] border-[#AAA4C2]"
									: "bg-white border-gray-300 hover:bg-gray-50"
							}`}>
							<input
								type="radio"
								name="priority"
								value="budget"
								checked={answers.q4 === "budget"}
								onChange={() => setAnswers({ ...answers, q4: "budget" })}
								className="sr-only"
							/>
							<div className="w-6 h-6 flex items-center justify-center">
								<PiCurrencyDollar
									size={24}
									className={
										answers.q4 === "budget" ? "text-[#AAA4C2]" : "text-gray-400"
									}
								/>
							</div>
							<div className="flex-1">
								<p
									className={`text-[14px] font-[500] ${
										answers.q4 === "budget"
											? "text-[#AAA4C2]"
											: "text-[#3F3F46]"
									}`}>
									Маленькая сумка
								</p>
								<p
									className={`text-[12px] font-[400] ${
										answers.q4 === "budget"
											? "text-[#AAA4C2]"
											: "text-[#7D7D8A]"
									}`}>
									Отличное качество по доступным ценам
								</p>
							</div>
							{answers.q4 === "budget" && (
								<div className="w-5 h-5 flex items-center justify-center">
									<span className="p-2 bg-[#AAA4C2] text-white rounded-[8px] flex items-center justify-center text-xs font-bold">
										<FaCheck size={10} />
									</span>
								</div>
							)}
						</label>

						<Button
							onClick={handleNext}
							disabled={!answers.q4}
							className="w-full disabled:bg-gray-300">
							Получить рекомендацию
						</Button>
					</div>
				)}

				{step === 5 && (
					<div className="flex flex-col  text-center items-center">
						<div className="bg-white w-[91px] h-[91px] rounded-[16px] flex justify-center items-center">
							<svg
								width="44"
								height="44"
								viewBox="0 0 44 44"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M2.00043 21.882L21.2849 31.5242C21.5472 31.6554 21.6784 31.721 21.816 31.7468C21.9379 31.7696 22.063 31.7696 22.1848 31.7468C22.3224 31.721 22.4536 31.6554 22.716 31.5242L42.0004 21.882M2.00043 31.882L21.2849 41.5242C21.5472 41.6554 21.6784 41.721 21.816 41.7468C21.9379 41.7696 22.063 41.7696 22.1848 41.7468C22.3224 41.721 22.4536 41.6554 22.716 41.5242L42.0004 31.882M2.00043 11.882L21.2849 2.23974C21.5472 2.10855 21.6784 2.04296 21.816 2.01715C21.9379 1.99428 22.063 1.99428 22.1848 2.01715C22.3224 2.04296 22.4536 2.10855 22.716 2.23974L42.0004 11.882L22.716 21.5242C22.4536 21.6554 22.3224 21.721 22.1848 21.7468C22.063 21.7696 21.9379 21.7696 21.816 21.7468C21.6784 21.721 21.5472 21.6554 21.2849 21.5242L2.00043 11.882Z"
									stroke="#AAA4C2"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<TitleComponent className="mt-4">Идеальное совпадение найдено!</TitleComponent>

						<Description className="text-[#3F3F46] mt-2">
							На основе ваших ответов мы рекомендуем:
						</Description>

						<div className="bg-white border border-[#E4E4E7] w-full rounded-[8px] px-[16px] py-[8px] mt-4">
							<div className="flex items-center justify-between gap-3 border-b py-3 border-[#E4E4E7]">
								<Description className="text-[#515151]">
									Рекомендуемый размер:
								</Description>
								<Description>L</Description>
							</div>

							<div className="flex items-center justify-between gap-3 border-b py-3 border-[#E4E4E7]">
								<Description className="text-[#515151]">
									Упаковок за доставку:
								</Description>
								<Description>5</Description>
							</div>

							<div className="flex items-center justify-between gap-3  py-3">
								<Description className="text-[#515151]">
									Частота доставки:
								</Description>
								<Description>60 дней</Description>
							</div>
						</div>

						<Button className=" mt-4 w-full">Продолжить</Button>
					</div>
				)}
			</div>
		</section>
	);
};

export default MiniSurvey;
