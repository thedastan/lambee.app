"use client";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck, FaHeart } from "react-icons/fa";
import { GoChevronLeft } from "react-icons/go";
import { PiCurrencyDollar } from "react-icons/pi";
import ImageSwipwr from "../ImageSwipwr";
import LinkButton from "@/components/ui/button/LinkButton";

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

	const handleAgeSelect = (age: string) => {
		setAnswers({ ...answers, q1: age });
	};

	const handleWeightSelect = (weight: string) => {
		setAnswers({ ...answers, q2: weight });
	};

	const handleUsageSelect = (usage: string) => {
		setAnswers({ ...answers, q3: usage });
	};

	return (
		<section className="flex h-[100vh]">
			<div className={`md:w-[50%] w-full h-screen bg-[#f0f7ff]`}>
				<Link
					href={PAGE.AUTH_PRE_REGISTRATION}
					className="flex items-center gap-2 text-[16px] md:absolute relative font-[500] p-4">
					<GoChevronLeft size={26} />
					Небольшой опрос
				</Link>
				<div className="max-w-md flex flex-col justify-start md:justify-center items-center md:h-full h-auto mx-auto px-[20px] md:mt-0 mt-4">
					{step <= 4 && (
						<>
							<div className="w-full bg-[#DFEFFF] h-[4px] rounded-[8px] mb-6 mt-2">
								<div
									className="bg-[#AAA4C2] h-[4px] rounded-[8px] transition-all duration-300"
									style={{ width: `${step * 25}%` }}></div>
							</div>
						</>
					)}

					{step === 1 && (
						<div className="text-center ">
							<TitleComponent>Сколько месяцев вашему малышу?</TitleComponent>
							<Description className="text-[#3F3F46] mb-2 mt-2">
								Это поможет нам рекомендовать <br /> правильный выбор
							</Description>

							{/* Сетка выбора возраста */}
							<div className="flex flex-wrap justify-center gap-2 mb-4">
								{[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((age) => (
									<button
										key={age}
										onClick={() => handleAgeSelect(String(age))}
										className={`h-[48px] w-[48px] flex items-center justify-center text-lg font-medium rounded-lg transition-colors ${
											answers.q1 === String(age)
												? "bg-[#AAA4C2] text-white"
												: "bg-white border border-gray-300 hover:bg-gray-50"
										}`}>
										{age}
									</button>
								))}
							</div>

							<Button
								onClick={handleNext}
								disabled={!answers.q1}
								className="w-full disabled:bg-gray-300">
								Далее
							</Button>
						</div>
					)}

					{step === 2 && (
						<div className="text-center">
							<TitleComponent>Какой вес у вашего малыша?</TitleComponent>

							<Description className="text-[#3F3F46] mb-3 mt-2">
								Вес - лучший показатель для размера <br /> подгузников
							</Description>

							<div className="flex flex-wrap justify-center gap-2 mb-4">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
									(weight) => (
										<button
											key={weight}
											onClick={() => handleWeightSelect(String(weight))}
											className={`h-[48px] w-[48px] flex items-center justify-center text-lg font-medium rounded-lg transition-colors ${
												answers.q2 === String(weight)
													? "bg-[#AAA4C2] text-white"
													: "bg-white border border-gray-300 hover:bg-gray-50"
											}`}>
											{weight}
										</button>
									)
								)}
							</div>

							<Button
								onClick={handleNext}
								disabled={!answers.q2.trim()}
								className="w-full disabled:bg-gray-300">
								Далее
							</Button>
						</div>
					)}

					{step === 3 && (
						<div className="text-center">
							<TitleComponent>
								Ежедневное использование подгузников
							</TitleComponent>

							<Description className="text-[#3F3F46] mb-3 mt-2">
								Сколько подгузников использует ваш малыш в день?
							</Description>

							<div className="flex flex-wrap justify-center gap-2 mb-4">
								{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
									(usage) => (
										<button
											key={usage}
											onClick={() => handleUsageSelect(String(usage))}
											className={`h-[48px] w-[48px] flex items-center justify-center text-lg font-medium rounded-lg transition-colors ${
												answers.q3 === String(usage)
													? "bg-[#AAA4C2] text-white"
													: "bg-white border border-gray-300 hover:bg-gray-50"
											}`}>
											{usage}
										</button>
									)
								)}
							</div>

							<Button
								onClick={handleNext}
								disabled={!answers.q3.trim()}
								className="w-full disabled:bg-gray-300">
								Далее
							</Button>
						</div>
					)}

					{step === 4 && (
						<div className="text-center w-full">
							<TitleComponent>Что для вас важнее всего?</TitleComponent>

							<Description className="text-[#3F3F46] mb-2 mt-2">
								Выберите ваш приоритет
							</Description>

							{/* Вариант 1: Максимальный комфорт */}
							<label
								className={`flex mt-5 text-start items-center gap-3 p-3 border rounded-lg mb-3 cursor-pointer transition-colors ${
									answers.q4 === "comfort"
										? "bg-[#FAF9FF] border-[#AAA4C2]"
										: "bg-white border-gray-300 hover:bg-gray-50"
								}`}>
								<input
									type="radio"
									name="priority"
									value="comfort"
									checked={answers.q4 === "comfort"}
									onChange={() => setAnswers({ ...answers, q4: "comfort" })}
									className="sr-only"
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
								className={`flex items-center text-start gap-3 p-3 border rounded-lg mb-3 cursor-pointer transition-colors ${
									answers.q4 === "budget"
										? "bg-[#FAF9FF] border-[#AAA4C2]"
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
											answers.q4 === "budget"
												? "text-[#AAA4C2]"
												: "text-gray-400"
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
						<div className="flex flex-col w-full  text-center items-center">
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
							<TitleComponent className="mt-4">
								Идеальное совпадение найдено!
							</TitleComponent>

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

							<LinkButton href="/" className=" mt-4 w-full">Продолжить</LinkButton>
						</div>
					)}
				</div>
			</div>

			<ImageSwipwr />
		</section>
	);
};

export default MiniSurvey;
