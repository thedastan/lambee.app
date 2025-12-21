import { PUBLIC_API } from "@/api/interceptors";
import { IProduct, IProductDetail, IProductReviewsResponse } from "../models/product.model";

class ProductService {
	private BASE_URL = "/api/public/v1/";

	async getProduct() {
		const response = await PUBLIC_API.get<IProduct>(
			this.BASE_URL + `products`
		);
		return response.data;
	}

	async getProductDetail(id:number) {
		const response = await PUBLIC_API.get<IProductDetail>(
			this.BASE_URL + `products/${id}`
		);
		return response.data;
	}

	async getProductReviews(id: number, page: number, pageSize: number) {
		const response = await PUBLIC_API.get<IProductReviewsResponse>(
			`${this.BASE_URL}products/${id}/reviews/`,
			{
				params: {
					page,         // ← любое число: 0, 1, 5 — как решит вызывающий код
					page_size: pageSize,
				},
			}
		);
		return response.data;
	}
}


export const productService = new ProductService();
