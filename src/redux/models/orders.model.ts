export interface IOrdersResponse {
	detail: Detail[];
}

export interface Detail {
	id: number;
	type: string;
	status: string;
	address: string;
	payment_method: string;
	created_at: string;
	items: Item[];
}

export interface Item {
	id: number;
	quantity: number;
	price: number;
	product_title: string;
	variant_title: string;
	variant_image: string;
}

export interface INotificationsResponse {
	detail: INotificationsDetail[];
}

export interface INotificationsDetail {
	title: string;
	description: string;
	created_at: string;
}

///

export interface ICreateOneTimeOrderPayload {
	items: {
		product_variant_id: number;
		quantity: number;
	}[];
	city_id: number;
	street: string;
	payment_method: "finik" | "balance" | "bonus";
}

///

 
export interface IOrderId {
  detail: IOrderIdDetail
}

export interface IOrderIdDetail {
  id: number
  type: string
  status: string
  address: string
  payment_method: string
  created_at: string
  items: IOrderIdItem[]
}

export interface IOrderIdItem {
  id: number
  quantity: number
  price: number
  product_title: string
  variant_title: string
  variant_image: string
}
