import { PUBLIC_API } from "@/api/interceptors";
import { ICategories } from "../models/categories.model";

class CategoriesService {
	private BASE_URL = "/api/public/v1/products/";

	async getCategories() {
		const response = await PUBLIC_API.get<ICategories>(
			this.BASE_URL + `categories`
		);
		return response.data;
	}
}


export const categoriesService = new CategoriesService();
