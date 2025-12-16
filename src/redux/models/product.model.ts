export interface IProduct {
  detail: Detail[]
}

export interface Detail {
  id: number
  title: string
  description: string
  images: Image[]
  benefits: Benefit[]
  variants: Variant[]
}

export interface Image {
  url: string
}

export interface Benefit {
  id: number
  title: string
  icon: string
}

export interface Variant {
  id: number
  title: string
  weight_range: string
  items_count: number
  price: number
  subscription_price: number
  discount_percent: number
}

///

export interface IProductDetail {
  detail: Detail
}

export interface Detail {
  id: number
  title: string
  description: string
  images: Image[]
  benefits: Benefit[]
  variants: Variant[]
}

export interface Image {
  url: string
}

export interface Benefit {
  id: number
  title: string
  icon: string
}

export interface Variant {
  id: number
  title: string
  weight_range: string
  items_count: number
  price: number
  subscription_price: number
  discount_percent: number
}
