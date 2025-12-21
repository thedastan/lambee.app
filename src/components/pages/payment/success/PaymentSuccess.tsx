"use client";
import Button from "@/components/ui/button/Button";
import LinkButton from "@/components/ui/button/LinkButton";
import { Description } from "@/components/ui/text/Description";
import Link from "next/link";
import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const PaymentSuccess = () => {
	return (
		<div className="w-full h-[100vh] bg-[white] flex items-center justify-center p-4">
			<div className="bg-white rounded-[16px]   w-full max-w-md  overflow-y-auto">
				<div className="flex flex-col items-center justify-between p-4 gap-2">
					<IoCheckmarkCircle color="#17B26A" size={80} />
					<div className="text-center flex flex-col gap-1">
						<h1 className="text-[16px] font-[700] text-[#18181B]">
							{" "}
							Вы успешно пополнили баланс!
						</h1>
						<Description className="text-[#515151] font-[500]">
							Вам придёт смс с кодом
						</Description>
					</div>

					<LinkButton href="/" className="w-full mt-2">Вернуться на главную</LinkButton>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
