// BasketComponents.tsx
"use client";

import React, { useState, useEffect } from "react";
import BasketCards from "./basket-cards/BasketCards";
import AlsoBuy from "./also-buy/AlsoBuy";
import AccordionDetail from "../../detail/accordion/Accordion";
import Total from "./total/Total";

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
	const [cart, setCart] = useState<CartItem[]>([]);

	useEffect(() => {
		const saved = localStorage.getItem("cart");
		if (saved) {
			try {
				setCart(JSON.parse(saved));
			} catch (e) {
				console.error("Failed to parse cart", e);
			}
		}
	}, []);

	 

	const updateQuantity = (id: number, quantity: number) => {
		if (quantity < 1) return;
		const updated = cart.map((item) =>
			item.id === id ? { ...item, quantity } : item
		);
		setCart(updated);
		localStorage.setItem("cart", JSON.stringify(updated)); // ✅ сохраняем явно
	};

	const removeItem = (id: number) => {
		const updated = cart.filter((item) => item.id !== id);
		setCart(updated);
		localStorage.setItem("cart", JSON.stringify(updated)); // ✅ сохраняем явно
	};
	
	const getTotalAmount = () => {
		return cart.reduce((sum, item) => {
			const price = item.type === "subscription" && item.subscriptionPrice !== undefined
				? item.subscriptionPrice
				: item.price;
			return sum + price * item.quantity;
		}, 0);
	};

	const getSavedAmount = () => {
		return cart.reduce((sum, item) => {
			if (item.type === "subscription" && item.subscriptionPrice !== undefined) {
				return sum + (item.price - item.subscriptionPrice) * item.quantity;
			}
			return sum;
		}, 0);
	};

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