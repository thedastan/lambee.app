// src/hooks/useCart.ts
import { useState, useEffect } from "react";

export interface CartItem {
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
	imageUrl: string; 
}

let cartState: CartItem[] = [];
const listeners: Array<(cart: CartItem[]) => void> = [];

// Загружаем из localStorage при первом импорте
if (typeof window !== "undefined") {
	const raw = localStorage.getItem("cart");
	if (raw) {
		try {
			cartState = JSON.parse(raw);
		} catch (e) {
			console.error("Failed to parse cart from localStorage on init", e);
			cartState = [];
		}
	}
}

const setCart = (newCart: CartItem[]) => {
	cartState = newCart;
	localStorage.setItem("cart", JSON.stringify(newCart));
	// Уведомляем всех подписчиков
	listeners.forEach((listener) => listener([...newCart]));
};

const getCart = () => [...cartState];

const subscribe = (listener: (cart: CartItem[]) => void) => {
	listeners.push(listener);
	return () => {
		const index = listeners.indexOf(listener);
		if (index > -1) listeners.splice(index, 1);
	};
};

// Основной хук
export const useCart = () => {
	const [cart, setLocalCart] = useState<CartItem[]>(getCart());

	useEffect(() => {
		const unsubscribe = subscribe(setLocalCart);
		return unsubscribe;
	}, []);

	const addItem = (item: Omit<CartItem, "id">) => {
		const existing = cart.find(
			(i) =>
				i.productId === item.productId &&
				i.variantId === item.variantId &&
				i.type === item.type
		);

		if (existing) {
			throw new Error("Товар уже добавлен в корзину");
		}

		const newItem: CartItem = {
			...item,
			id: Date.now(), // или crypto.randomUUID() если поддерживается
		};

		setCart([...cart, newItem]);
	};

	const updateQuantity = (id: number, quantity: number) => {
		if (quantity < 1) return;
		const updated = cart.map((item) =>
			item.id === id ? { ...item, quantity } : item
		);
		setCart(updated);
	};

	const removeItem = (id: number) => {
		const updated = cart.filter((item) => item.id !== id);
		setCart(updated);
	};

	const getTotalAmount = () => {
		return cart.reduce((sum, item) => {
			const price =
				item.type === "subscription" && item.subscriptionPrice !== undefined
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

	const getTotalItemsCount = () => {
		return cart.reduce((sum, item) => sum + item.quantity, 0);
	};

  const clear = () => {
    setCart([]);
  };

	return {
		cart,
		addItem,
		updateQuantity,
		removeItem,
		getTotalAmount,
		getSavedAmount,
		getTotalItemsCount,
    clear
	};
};