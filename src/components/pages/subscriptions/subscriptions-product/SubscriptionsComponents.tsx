"use client";

import AlsoBuy from "./also-buy-subscriptions/AlsoBuySubscriptions";
import { useCart } from "@/redux/hooks/useCart";
import TotalSubscriptions from "./total-subscriptions/TotalSubscriptions";
import SubscriptionsCards from "./subscriptions-cards/SubscriptionsCards";
import AlsoBuySubscriptions from "./also-buy-subscriptions/AlsoBuySubscriptions";

interface SubscriptionsComponentsProps {
	onProceedToCheckout: () => void;
}

const SubscriptionsComponents: React.FC<SubscriptionsComponentsProps> = ({ onProceedToCheckout }) => {
	const { cart } = useCart();

	const oneTimeItems = cart.filter((item) => item.type === "subscription");

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
				<SubscriptionsCards oneTimeItems={oneTimeItems} />
				<div className="md:block hidden">
					<AlsoBuySubscriptions />
				</div>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<div className="block md:hidden">
					<AlsoBuySubscriptions />
				</div>
				<TotalSubscriptions
					totalAmount={totalAmount}
					savedAmount={savedAmount}
					onProceedToCheckout={onProceedToCheckout}
				/>
			</div>
		</div>
	);
};

export default SubscriptionsComponents;