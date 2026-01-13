"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/heading/PageHeader";
import SubscriptionsComponents from "./subscriptions-product/SubscriptionsComponents";
import PaymentComponents from "./subscriptions-payment/SubscriptionsPaymentComponents";
import SubscriptionsPaymentComponents from "./subscriptions-payment/SubscriptionsPaymentComponents";

const RegistrationSubscriptions = () => {
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
				<SubscriptionsPaymentComponents />
			)}
		</div>
	);
};

export default RegistrationSubscriptions;
