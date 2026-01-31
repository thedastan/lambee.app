"use client";

import LinkButton from "@/components/ui/button/LinkButton";
import { Description } from "@/components/ui/text/Description";
import { IoCheckmarkCircle } from "react-icons/io5";

const PaymentOrderSuccess = () => {
	return (
		<div className="w-full h-[100vh] bg-[white] flex items-center justify-center p-4">
			<div className="bg-white rounded-[16px]   w-full max-w-md  overflow-y-auto">
				<div className="flex flex-col items-center justify-between p-4 gap-2">
					<IoCheckmarkCircle color="#17B26A" size={80} />
					<div className="text-center flex flex-col gap-1">
						<h1 className="text-[16px] font-[700] text-[#18181B]">
							{" "}
							Вы успешно оформили заказ!
						</h1>
						<p className="text-[#515151] text-[14px] font-[500]  ">Также действует кэшбек <span className="text-[#0071E3]">5%!</span></p>
					 
					</div>

					<LinkButton href="/" className="w-full mt-2">
					Продолжить
					</LinkButton>
				</div>
			</div>
		</div>
	);
};

export default PaymentOrderSuccess;
