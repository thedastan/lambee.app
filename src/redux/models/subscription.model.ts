export interface ICreateSubscriptionPayload {
	main_product_variant_id: number;
	city_id: number;
	street: string;
	frequency_id: number;
	weekday: number;
	payment_method: "finik" | "balance" | "bonus";
	items: {
		product_variant_id: number;
		quantity: number;
		apply_to: string;
	}[];
}


 

export interface ICreateSubscriptionResponse {
  detail: Detail[]
}

export interface Detail {
  id: number
  status: string
  city: City
  street: string
  frequency: Frequency
  weekday: number
  created_at: string
  payment_method: string
  total_amount: number
  next_delivery_date: string
  items: Item[]
}

export interface City {
  id: number
  name: string
  country: Country
}

export interface Country {
  id: number
  name: string
}

export interface Frequency {
  id: number
  weeks: number
  label: string
}

export interface Item {
  product_variant_id: number
  quantity: number
  apply_to: string
  product_title: string
  variant_title: string
  variant_image: string
}


///

export interface SubID {
  detail: SubIDDetail
}

export interface SubIDDetail {
  id: number
  status: string
  city: SubIDCity
  street: string
  frequency: SubIDFrequency
  weekday: number
  created_at: string
  payment_method: string
  total_amount: string
  next_delivery_date: any
  items: SubIDItem[]
}

export interface SubIDCity {
  id: number
  name: string
  country: SubIDCountry
}

export interface SubIDCountry {
  id: number
  name: string
}

export interface SubIDFrequency {
  id: number
  weeks: number
  label: string
}

export interface SubIDItem {
  product_variant_id: number
  quantity: number
  apply_to: string
  product_title: string
  variant_title: string
  variant_image: string
}
