import React from "react";
import BasketCards from "./basket-cards/BasketCards";
import AlsoBuy from "./also-buy/AlsoBuy";
import AccordionDetail from "../../detail/accordion/Accordion";
import Total from "./total/Total";

interface BasketComponentsProps {
  onProceedToCheckout: () => void;
}

const BasketComponents: React.FC<BasketComponentsProps> = ({ onProceedToCheckout }) => {
	return (
		<div className="md:p-4 bg-white md:bg-transparent p-0 flex flex-col md:flex-row justify-between items-start h-full gap-8 relative">
			<div className="bg-white md:p-4 p-0 md:w-[50%] w-full">
				<BasketCards />
				<div className="md:block hidden">
					<AlsoBuy />
					<AccordionDetail />
				</div>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<div className="block md:hidden">
					<AlsoBuy />
				</div>
				<Total onProceedToCheckout={onProceedToCheckout}/>
			</div>
			 
		</div>
	);
};

export default BasketComponents;
