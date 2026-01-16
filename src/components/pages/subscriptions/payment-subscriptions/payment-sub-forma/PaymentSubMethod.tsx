// src/components/payment/PaymentMethodSelector.tsx
"use client";

import { Title } from "@/components/ui/text/Title";
import { useUserProfile } from "@/redux/hooks/user";
import React from "react";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";

interface PaymentMethodSelectorProps {
	selectedMethod: PaymentMethod;
	onSelect: (method: PaymentMethod) => void;
}

const PaymentSubMethodSelector = ({
	selectedMethod,
	onSelect,
}: PaymentMethodSelectorProps) => {
	const isSelected = (method: PaymentMethod) => selectedMethod === method;

	const { profile } = useUserProfile();

	return (
		<div className="flex flex-col gap-4 bg-[#FFFDFA] p-4">
			<Title>Способ оплаты</Title>
			<div className="rounded-[8px] bg-white">
				{/* Finik Pay */}
				<div
					className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
						isSelected("finikPay") ? "border-[#0071E3]" : "border-[#DEDEDE]"
					} rounded-tr-[8px] rounded-tl-[8px]`}
					onClick={() => onSelect("finikPay")}>
					<div className="flex items-center gap-3">
						<span
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								isSelected("finikPay")
									? "border-[#0071E3] bg-[#0071E3]"
									: "border-[#DEDEDE]"
							}`}>
							<span
								className={`w-2 h-2 rounded-full ${
									isSelected("finikPay") ? "bg-white" : "bg-transparent"
								}`}></span>
						</span>
						<span className="text-[14px]">Finik Pay</span>
					</div>
				</div>

				{/* Баланс Lambee */}
				<div
					className={`flex items-center justify-between border ${
						isSelected("lambeeBalance")
							? "border-[#0071E3]"
							: "border-[#DEDEDE]"
					} px-4 py-3 cursor-pointer`}
					onClick={() => onSelect("lambeeBalance")}>
					<div className="flex items-center gap-3">
						<span
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								isSelected("lambeeBalance")
									? "border-[#0071E3] bg-[#0071E3]"
									: "border-[#DEDEDE]"
							}`}>
							<span
								className={`w-2 h-2 rounded-full ${
									isSelected("lambeeBalance") ? "bg-white" : "bg-transparent"
								}`}></span>
						</span>
						<span className="text-[14px]">
							Баланс Lambee - {profile?.balance?.amount}
						</span>
					</div>
				</div>

				{/* Бонусы — теперь доступны */}
				<div
					className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
						isSelected("bonus") ? "border-[#0071E3]" : "border-[#DEDEDE]"
					} rounded-br-[8px] rounded-bl-[8px]`}
					onClick={() => onSelect("bonus")}>
					<div className="flex items-center gap-3">
						<span
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								isSelected("bonus")
									? "border-[#0071E3] bg-[#0071E3]"
									: "border-[#DEDEDE]"
							}`}>
							<span
								className={`w-2 h-2 rounded-full ${
									isSelected("bonus") ? "bg-white" : "bg-transparent"
								}`}></span>
						</span>
						<span className="text-[14px]">Бонусы - {profile?.bonus_balance?.amount}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentSubMethodSelector;
