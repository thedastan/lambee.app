// src/app/(main)/payment/payment-forma/PaymentMethodSection.tsx
import { Title } from "@/components/ui/text/Title";
import { toast } from "alert-go";

interface PaymentMethodSectionProps {
	selectedMethod: "finikPay" | "lambeeBalance" | "bonuses";
	onSelect: (method: "finikPay" | "lambeeBalance" | "bonuses") => void;
}

export default function PaymentMethodSection({
	selectedMethod,
	onSelect,
}: PaymentMethodSectionProps) {
	const isSelected = (method: string) => selectedMethod === method;

	const handleSelect = (method: "finikPay" | "lambeeBalance" | "bonuses") => {
		if (method === "bonuses") {
			toast.error("Оплата бонусами временно недоступна", { position: "top-center" });
			return;
		}
		onSelect(method);
	};

	return (
		<div className="flex flex-col gap-4 bg-[#FFFDFA] p-4">
			<Title>Способ оплаты</Title>
			<div className="rounded-[8px] bg-white">
				{/* Finik Pay */}
				<div
					className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
						isSelected("finikPay") ? "border-[#0071E3]" : "border-[#DEDEDE]"
					} rounded-tr-[8px] rounded-tl-[8px]`}
					onClick={() => handleSelect("finikPay")}
				>
					<div className="flex items-center gap-3">
						<span
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								isSelected("finikPay")
									? "border-[#0071E3] bg-[#0071E3]"
									: "border-[#DEDEDE]"
							}`}
						>
							<span className={`w-2 h-2 rounded-full ${isSelected("finikPay") ? "bg-white" : "bg-transparent"}`}></span>
						</span>
						<span className="text-[14px]">Finik Pay</span>
					</div>
					 
				</div>

				{/* Lambee Balance */}
				<div
					className={`flex items-center justify-between border ${
						isSelected("lambeeBalance") ? "border-[#0071E3]" : "border-[#DEDEDE]"
					} px-4 py-3 cursor-pointer`}
					onClick={() => handleSelect("lambeeBalance")}
				>
					<div className="flex items-center gap-3">
						<span
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								isSelected("lambeeBalance")
									? "border-[#0071E3] bg-[#0071E3]"
									: "border-[#DEDEDE]"
							}`}
						>
							<span className={`w-2 h-2 rounded-full ${isSelected("lambeeBalance") ? "bg-white" : "bg-transparent"}`}></span>
						</span>
						<span className="text-[14px]">Баланс Lambee</span>
					</div>
					 
				</div>

				{/* Bonuses — disabled */}
				<div
					className={`flex items-center justify-between px-4 py-3 opacity-50 cursor-not-allowed border ${
						isSelected("bonuses") ? "border-[#0071E3]" : "border-[#DEDEDE]"
					} rounded-br-[8px] rounded-bl-[8px]`}
				>
					<div className="flex items-center gap-3">
						<span className="w-5 h-5 rounded-full border-2 border-[#DEDEDE] flex items-center justify-center">
							<span className="w-2 h-2 rounded-full bg-transparent"></span>
						</span>
						<span className="text-[14px]">Бонусы — недоступны</span>
					</div>
				</div>
			</div>
		</div>
	);
}