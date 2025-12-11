export interface IProduct {
  detail: Detail[]
}

export interface Detail {
  id: number
  title: string
  description: string
  sizes: Size[]
  price: number
  discount: number
  discount_price: number
  images: Image[]
}

export interface Size {
  id: number
  title: string
  description: string
}

export interface Image {
  url: string
}


///

export interface IProductDetail {
  detail: ProDetail[]
}

export interface ProDetail {
  id: number
  title: string
  description: string
  sizes: Size[]
  price: number
  discount: number
  discount_price: number
  images: Image[]
}

export interface ProSize {
  id: number
  title: string
  description: string
}

export interface ProImage {
  url: string
}

