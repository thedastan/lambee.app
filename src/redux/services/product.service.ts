// services/product.service.ts

import { PUBLIC_API, PRIVATE_API } from "@/api/interceptors";
import { IProduct, IProductDetail, IReview } from "../models/product.model";

class ProductService {
	private BASE_URL = "/api/private/v1/"; // ← обратите внимание: теперь private!

	async getProduct() {
		const response = await PUBLIC_API.get<IProduct>(this.BASE_URL.replace("private", "public") + `products`);
		return response.data;
	}

	async getProductDetail(id: number) {
		const response = await PUBLIC_API.get<IProductDetail>(
			this.BASE_URL.replace("private", "public") + `products/${id}`
		);
		return response.data;
	}

	async getProductReviewsAll(productId: number) {
		const response = await PUBLIC_API.get<{
			detail: {
				count: number;
				results: IReview[];
			};
		}>(`${this.BASE_URL.replace("private", "public")}products/${productId}/reviews/`);
		return response.data;
	}

	async createProductReview(productId: number, payload: { rating: number; text: string }) {
		const response = await PRIVATE_API.post<{ detail: IReview }>(
			`${this.BASE_URL}products/products/${productId}/reviews/`,
			payload
		);
		return response.data;
	}

	async deleteMyProductReview(productId: number) {
		const response = await PRIVATE_API.delete(
			`${this.BASE_URL}products/products/${productId}/reviews/`
		);
		return response.data; // обычно DELETE возвращает 204 No Content → data = undefined
	}
}

export const productService = new ProductService();
 