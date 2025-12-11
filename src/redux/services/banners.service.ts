import { PUBLIC_API } from "@/api/interceptors";
import { IBanners } from "../models/banners.model";

class BannersService {
	private BASE_URL = "/api/public/v1/promo/";
	                   

	async getBanners() {
		const response = await PUBLIC_API.get<IBanners>(
			this.BASE_URL + `banners`
		);
		return response.data;
	}
}


export const bannersService = new BannersService();
