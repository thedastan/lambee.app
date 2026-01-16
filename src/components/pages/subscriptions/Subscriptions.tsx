"use client";
import { useState } from "react";
import PaymentComponents from "./payment-subscriptions/SubPaymentComponents";
import PageHeader from "@/components/ui/heading/PageHeader";
import SubscriptionsComponents from "./subscriptions-product/SubscriptionsComponents";
import SubPaymentComponents from "./payment-subscriptions/SubPaymentComponents";

const Subscriptions = () => {
	const [isCheckout, setIsCheckout] = useState(false);

	const handleProceed = () => {
		setIsCheckout(true);
	};

	return (
		<div className="w-full h-full">
			<PageHeader title="Оформление подписки" className="hidden md:flex" />
			{!isCheckout ? (
				<SubscriptionsComponents onProceedToCheckout={handleProceed} />
			) : (
				<SubPaymentComponents />
			)}
		</div>
	);
};

export default Subscriptions;
