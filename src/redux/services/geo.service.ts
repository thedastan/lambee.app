import { PUBLIC_API } from "@/api/interceptors";
import { IGeo } from "../models/geo.model";

class GeoService {
	private BASE_URL = "/api/public/v1/geo/";

	async getGeo() {
		const response = await PUBLIC_API.get<IGeo>(this.BASE_URL + `cities`);
		return response.data;
	}
}

export const geoService = new GeoService();
