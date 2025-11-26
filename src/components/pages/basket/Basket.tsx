"use client";
import { useState } from "react";
import BasketComponents from "./basket-product/BasketComponents";
import PaymentComponents from "./payment/PaymentComponents";
import PageHeader from "@/components/ui/heading/PageHeader";

const Basket = () => {
	const [isCheckout, setIsCheckout] = useState(false);

	const handleProceed = () => {
		setIsCheckout(true);
	};

	return (
		<div className="w-full h-full">
			<PageHeader title="Корзина" className="hidden md:flex" />
			{!isCheckout ? (
				<BasketComponents onProceedToCheckout={handleProceed} />
			) : (
				<PaymentComponents />
			)}
		</div>
	);
};

export default Basket;
