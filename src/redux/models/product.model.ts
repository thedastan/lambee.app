export interface IProduct {
  detail: Detail[]
}

export interface Detail {
  id: number
  title: string
  description: string
  weight_range: string
  items_count: number
  sku: string
  price: number
  subscription_price: number
  discount_percent: number
  images: Image[]
  benefits: Benefit[]
}

export interface Image {
  url: string
}

export interface Benefit {
  id: number
  title: string
  icon: string
}


///
 
export interface IProductDetail {
  detail: DetailPro
}

export interface DetailPro {
  id: number
  title: string
  description: string
  weight_range: string
  items_count: number
  sku: string
  price: number
  subscription_price: number
  discount_percent: number
  images: ImagePro[]
  benefits: BenefitPro[]
}

export interface ImagePro {
  url: string
}

export interface BenefitPro {
  id: number
  title: string
  icon: string
}

///

export interface IProductReview {
  id: number;
  user: {
    name: string;
    surname: string;
    birth_date: string; // или Date, если парсите
  };
  rating: number;
  text: string;
  created_at: string;
}

export interface IProductReviewsResponse {
  detail: {
    count: number;
    next: string | null;
    previous: string | null;
    results: IProductReview[];
  };
}