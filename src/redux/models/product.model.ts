export interface IProduct {
	detail: Detail[];
}

export interface Detail {
	id: number;
	title: string;
	description: string;
	variants: IProductVariant[];
	benefits: Benefit[];
}

export interface IProductVariant {
	id: number;
	title: string;
	sku: string;
	weight_range: string;
	items_count: number;
	price: number;
	subscription_price: number;
	discount_percent: number;
	images: Image[];
}

export interface Image {
	url: string;
}

export interface Benefit {
	id: number;
	title: string;
	icon: string;
}

///

export interface IProductDetail {
	detail: DetailPro;
}

export interface DetailPro {
	id: number;
	title: string;
	description: string;
	variants: Variant[];
	benefits: DetaiBenefit[];
}

export interface Variant {
	id: number;
	title: string;
	sku: string;
	weight_range: string;
	items_count: number;
	price: number;
	subscription_price: number;
	discount_percent: number;
	images: DetaiImage[];
}

export interface DetaiImage {
	url: string;
}

export interface DetaiBenefit {
	id: number;
	title: string;
	icon: string;
}

///
export interface IReview {
	id: number;
	user: {
		name: string;
		surname: string;
		birth_date: string; // ISO 8601, например: "2005-04-24T00:00:00"
	};
	rating: string; // ← именно строка: "4.0", "5.0" и т.д.
	text: string;
	created_at: string; // ISO 8601: "2026-01-07T14:14:26.787Z"
}

export interface IProductReviewsResponse {
	detail: {
		count: number;
		next: string | null;
		previous: string | null;
		results: IReview[];
	};
}
