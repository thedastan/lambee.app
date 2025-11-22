// components/AccordionDetail.tsx

"use client";

import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";

const AccordionDetail = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const data = [
		{
			title: "Детали",
			desc: "Подробная информация о продукте, его составе, размерах, упаковке и особенностях использования.",
		},
		{
			title: "Чистые ингредиенты",
			desc: "Мы используем только безопасные, гипоаллергенные компоненты без парабенов, фталатов и искусственных красителей.",
		},
		{
			title: "Преимущества подписки",
			desc: "Экономия до 20%, регулярные доставки, возможность пропустить или отменить в любое время, пробники следующего размера.",
		},
		{
			title: "Почему мы это любим",
			desc: "Потому что это удобно, безопасно для малышей, экономит время и деньги. Мы сами пользуемся этими продуктами!",
		},
	];

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="px-4 py-6">
			<div>
				{data.map((item, index) => (
					<div key={index} className="border-t border-[#E4E4E7]">
						<button
							onClick={() => toggleAccordion(index)}
							className="flex justify-between items-center w-full text-left h-[61px] rounded-md   transition">
							<span className="text-[14px] font-[400]">{item.title}</span>
							<span className="text-xl font-bold text-gray-500">
								{openIndex === index ? <FiMinus /> : <VscAdd />}
							</span>
						</button>

						{/* Плавный контент */}
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${
								openIndex === index
									? "max-h-96 opacity-100"
									: "max-h-0 opacity-0"
							}`}>
							<div className="pb-3 text-sm text-gray-600 leading-relaxed">
								{item.desc}
							</div>
						</div>
					</div>
				))}
			</div>

			 <div className="py-20 ">
       <TitleComponent className="text-[38px] font-[400] text-center leading-[115%]">
				Наши стандарты <br /> безопасности
			</TitleComponent>
			<Description className="text-center mt-4">
				Подгузник изготовлен без <br />
				ароматизаторов, парабенов, латекса, <br /> лосьона,
				<br />
				хлорного отбеливателя, резины,
				<br />
				спирта, фталатов, ЛОС и <br />
				оптических отбеливателей. Он <br />
				гипоаллергенен, <br />
				протестирован дерматологами, не <br /> тестируется на животных и <br />
				протестирован независимыми <br /> лабораториями; мы <br />
				публикуем результаты для <br />
				прозрачности.
			</Description>
       </div>
		</section>
	);
};

export default AccordionDetail;
