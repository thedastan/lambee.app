// src/app/(main)/basket/BasketComponents.tsx
"use client";

import BasketCards from "./basket-cards/BasketCards";
import AlsoBuy from "./also-buy/AlsoBuy";
import Total from "./total/Total";
import { useCart } from "@/redux/hooks/useCart";

interface BasketComponentsProps {
	onProceedToCheckout: () => void;
}

const BasketComponents: React.FC<BasketComponentsProps> = ({ onProceedToCheckout }) => {
	const { cart } = useCart();

	const oneTimeItems = cart.filter((item) => item.type === "one-time");

	const totalAmount = oneTimeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const savedAmount = oneTimeItems.reduce((sum, item) => {
		if (item.subscriptionPrice !== undefined) {
			return sum + (item.price - item.subscriptionPrice) * item.quantity;
		}
		return sum;
	}, 0);

	return (
		<div className="md:p-4 bg-white md:bg-transparent p-0 flex flex-col md:flex-row justify-between items-start h-full gap-8 relative">
			<div className="bg-white md:p-4 p-0 md:w-[50%] w-full">
				<BasketCards oneTimeItems={oneTimeItems} />
				<div className="md:block hidden">
					<AlsoBuy />
				</div>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<div className="block md:hidden">
					<AlsoBuy />
				</div>
				<Total
					totalAmount={totalAmount}
					savedAmount={savedAmount}
					onProceedToCheckout={onProceedToCheckout}
				/>
			</div>
		</div>
	);
};

export default BasketComponents;