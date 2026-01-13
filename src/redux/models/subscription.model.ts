// src/redux/models/subscription.model.ts

export interface ICreateSubscriptionPayload {
	main_product_variant_id: number;
	address: string;
	deliveries: string[]; // ISO-даты: "2026-01-12T08:36:21.885Z"
	items: {
		product_variant_id: number;
		quantity: number;
		apply_to: "each_cycle";
	}[];
}

export interface ICreateSubscriptionResponse {
	detail: string; // или более сложный объект, если API возвращает данные
}


export interface ISubscriptionItem {
	product_variant_id: number;
	quantity: number;
	price: number;
	apply_to: string; // или "each_cycle" | "first_cycle", если известны значения
}

export interface IDelivery {
	delivery_datetime: string; // ISO дата
	status: string;
}

export interface ISubscription {
	id: number;
	status: string;
	address: string;
	total_amount: number;
	created_at: string; // ISO дата
	items: ISubscriptionItem[];
	deliveries: IDelivery[];
}

export interface ISubscriptionsResponse {
	detail: ISubscription[];
}