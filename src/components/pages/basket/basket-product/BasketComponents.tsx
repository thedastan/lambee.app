// BasketComponents.tsx
"use client";

import React, { useState, useEffect } from "react";
import BasketCards from "./basket-cards/BasketCards";
import AlsoBuy from "./also-buy/AlsoBuy";
import AccordionDetail from "../../detail/accordion/Accordion";
import Total from "./total/Total";
import { useCart } from "@/redux/hooks/useCart";

// Тот же интерфейс
interface CartItem {
	id: number;
	variantId: number;
	variantTitle: string;
	type: "one-time" | "subscription";
	price: number;
	quantity: number;
	itemsCount: number;
	subscriptionPrice?: number;
	discountPercent?: number;
	productId: number;
	productTitle: string;
}

interface BasketComponentsProps {
	onProceedToCheckout: () => void;
}

const BasketComponents: React.FC<BasketComponentsProps> = ({ onProceedToCheckout }) => {
	const { cart, updateQuantity, removeItem, getTotalAmount, getSavedAmount } = useCart();

	return (
		<div className="md:p-4 bg-white md:bg-transparent p-0 flex flex-col md:flex-row justify-between items-start h-full gap-8 relative">
			<div className="bg-white md:p-4 p-0 md:w-[50%] w-full">
				<BasketCards
					cart={cart}
					updateQuantity={updateQuantity}
					removeItem={removeItem}
				/>
				<div className="md:block hidden">
					<AlsoBuy />
					<AccordionDetail />
				</div>
			</div>

			<div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
				<div className="block md:hidden">
					<AlsoBuy />
				</div>
				<Total
					totalAmount={getTotalAmount()}
					savedAmount={getSavedAmount()}
					onProceedToCheckout={onProceedToCheckout}
				/>
			</div>
		</div>
	);
};

export default BasketComponents;