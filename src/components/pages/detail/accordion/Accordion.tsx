// components/AccordionDetail.tsx

"use client";

import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useState } from "react";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";

const AccordionDetail = () => {
	return (
		<section className="px-4 py-6">
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
					протестирован дерматологами, не <br /> тестируется на животных и{" "}
					<br />
					протестирован независимыми <br /> лабораториями; мы <br />
					публикуем результаты для <br />
					прозрачности.
				</Description>
			</div>
		</section>
	);
};

export default AccordionDetail;
