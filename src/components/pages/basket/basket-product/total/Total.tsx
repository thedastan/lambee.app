import React from "react";
import { Description } from "@/components/ui/text/Description";
import { IoCheckmark } from "react-icons/io5";
import Button from "@/components/ui/button/Button";

interface TotalProps {
  onProceedToCheckout: () => void; // Добавляем пропс
}

const Total: React.FC<TotalProps> = ({ onProceedToCheckout }) => {

	const handleClick = () => {
    onProceedToCheckout(); // Вызываем переданную функцию
  };

	return (
		<section className="md:rounded-bl-[16px] md:rounded-br-[16px]  rounded-bl-[0px] rounded-br-[0px] rounded-tl-[16px] rounded-tr-[16px] bg-white border border-[#AAA4C2]">
			<div className="px-4 pt-4">
				<div className="flex border-b-2 border-[#AAA4C2] items-center justify-between pb-1">
					<Description className="text-[#AAA4C2]">
						У вас будет бесплатная доставка!
					</Description>
					<Description>
						<IoCheckmark className="text-[#AAA4C2]" size={23} />
					</Description>
				</div>
			</div>

			<div className="p-4 flex flex-col gap-3 border-b border-[#AAA4C2]">
				<div className="flex items-center justify-between">
					<Description className="text-[12px]">Сэкономлено:</Description>
					<Description className="text-[12px]">
						Это 100 000 с/в год{" "}
						<span className="text-[#AAA4C2] pl-2">5000 с</span>
					</Description>
				</div>
				<div className="flex items-center justify-between">
					<Description>Итого:</Description>
					<Description>14 000 с</Description>
				</div>
			</div>

			<div className="  p-4">
				<Button  onClick={handleClick} className="w-full">
					Перейти к оплате{" "}
				</Button>
			</div>
		</section>
	);
};

export default Total;
