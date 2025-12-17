"use client";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import Link from "next/link";
import { useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";

const PaymentSuccess = () => {
	const [isModal, setIsModal] = useState(true);

	return (
		<div>
			{isModal && (
				<Link
					href={"/"}
					className="fixed inset-0 bg-black bg-opacity-50 z-40"
					onClick={() => setIsModal(false)}>
					<div className="fixed inset-0 flex items-center justify-center z-50 p-2">
						<div
							className="bg-white rounded-[16px] shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
							onClick={(e) => e.stopPropagation()}>
							<div className="flex flex-col items-center justify-between p-4 gap-2">
								<IoCheckmarkCircle color="#17B26A" size={80} />
								<div className="text-center flex flex-col gap-1">
									<h1 className="text-[16px] font-[700] text-[#18181B]">
										{" "}
										Вы успешно оформили заказ!
									</h1>
									<Description className="text-[#515151] font-[500]">
										Доставка будет 22.10.2025 до 15:00
									</Description>
									<Description className="text-[#515151] font-[500]">
										Также действует кэшбек{" "}
										<span className="text-[#AAA4C2]">5%!</span>
									</Description>
								</div>

								<Button className="w-full mt-2">Продолжить</Button>
							</div>
						</div>
					</div>
				</Link>
			)}
		</div>
	);
};

export default PaymentSuccess;
