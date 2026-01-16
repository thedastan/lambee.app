// Total.tsx
import React from "react";
import { Description } from "@/components/ui/text/Description";
import { IoCheckmark } from "react-icons/io5";
import Button from "@/components/ui/button/Button";

interface TotalProps {
	totalAmount: number;
	savedAmount: number;
	onProceedToCheckout: () => void;
}

const TotalSubscriptions: React.FC<TotalProps> = ({ totalAmount, savedAmount, onProceedToCheckout }) => {
	return (
		<section className="md:rounded-bl-[16px] md:rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px] bg-white md:border border-t border-[#0071E3]">
			<div className="px-4 pt-4">
				<div className="flex border-b-2 border-[#0071E3] items-center justify-between pb-1">
					<Description className="text-[#0071E3]">
						У вас будет бесплатная доставка!
					</Description>
					<Description>
						<IoCheckmark className="text-[#0071E3]" size={23} />
					</Description>
				</div>
			</div>

			<div className="p-4 flex flex-col gap-3 border-b border-[#0071E3]">
				 
				<div className="flex items-center justify-between">
					<Description>Итого:</Description>
					<Description>{savedAmount.toLocaleString()} сом</Description>
				</div>
			</div>

			<div className="p-4">
				<Button onClick={onProceedToCheckout} className="w-full" disabled={totalAmount === 0}>
					Перейти к оплате
				</Button>
			</div>
		</section>
	);
};

export default TotalSubscriptions;