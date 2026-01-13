"use client";

import { useCart } from "@/redux/hooks/useCart";
import SubscriptionsAlsoBuy from "./also-buy/SubscriptionsAlsoBuy";
import SubscriptionsTotal from "./total/SubscriptionsTotal";
import SubscriptionsCards from "./subscriptions-cards/SubscriptionsCards";


interface SubscriptionsComponentsProps {
	onProceedToCheckout: () => void;
}

const SubscriptionsComponents: React.FC<SubscriptionsComponentsProps> = ({ onProceedToCheckout }) => {
	const { cart, updateQuantity, removeItem } = useCart();

	const oneTimeItems = cart.filter((item) => item.type === "subscription");


	// Считаем итог только по разовым заказам
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
				<SubscriptionsCards
					oneTimeItems={oneTimeItems}
					updateQuantity={updateQuantity}
					removeItem={removeItem}
				/>
				<div className="md:block hidden">
					<SubscriptionsAlsoBuy />
				</div>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<div className="block md:hidden">
					<SubscriptionsAlsoBuy />
				</div>
				<SubscriptionsTotal
					totalAmount={totalAmount}
					savedAmount={savedAmount}
					onProceedToCheckout={onProceedToCheckout}
				/>
			</div>
		</div>
	);
};

export default SubscriptionsComponents;