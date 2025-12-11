import { PUBLIC_API } from "@/api/interceptors";
import { IProduct, IProductDetail } from "../models/product.model";

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
}

export const productService = new ProductService();
