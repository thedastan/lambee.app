import React from "react";
import PaymentTotal from "./payment-totla/PaymentTotal";
import PaymentForma from "./payment-forma/PaymentForma";

 
const PaymentComponents = () => {
	return (
		<div className=" md:bg-transparent  bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
			<div className=" md:p-4 p-0 md:w-[50%] w-full">
				<PaymentForma />
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<PaymentTotal />
			</div>
		</div>
	);
};

export default PaymentComponents;
