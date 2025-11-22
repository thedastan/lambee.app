"use client";
import { useState } from "react";
import BasketComponents from "./basket-product/BasketComponents";
import PaymentComponents from "./payment/PaymentComponents";

const Basket = () => {
	const [isCheckout, setIsCheckout] = useState(false);

  const handleProceed = () => {
    setIsCheckout(true);
  };

	return (
		<div className="w-full h-full">
			{!isCheckout ? (
				<BasketComponents onProceedToCheckout={handleProceed} />
			) : (
				<PaymentComponents />
			)}
		</div>
	);
};

export default Basket;
