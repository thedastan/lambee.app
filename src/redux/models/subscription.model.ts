export interface ICreateSubscriptionPayload {
	main_product_variant_id: number;
	address: string;
	deliveries: string[];
	payment_method: 'finik' | 'balance'; // ← добавлено
	items: {
		product_variant_id: number;
		quantity: number;
		apply_to: "each_cycle";
	}[];
}

export interface ICreateSubscriptionResponse {
	detail: string; 
}


export interface ISubscriptionItem {
	product_variant_id: number;
	quantity: number;
	price: number;
	apply_to: string; 
}

export interface IDelivery {
	delivery_datetime: string;  
	status: string;
}

export interface ISubscription {
	id: number;
	status: string;
	address: string;
	total_amount: number;
	created_at: string;  
	items: ISubscriptionItem[];
	deliveries: IDelivery[];
}

export interface ISubscriptionsResponse {
	detail: ISubscription[];
}