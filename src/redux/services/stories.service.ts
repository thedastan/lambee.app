import { PUBLIC_API } from "@/api/interceptors";
import { IStories } from "../models/stories.model";

class StoriesService {
	private BASE_URL = "/api/public/v1/promo/";
	                   

	async getStories() {
		const response = await PUBLIC_API.get<IStories>(
			this.BASE_URL + `stories`
		);
		return response.data;
	}
}


export const storiesService = new StoriesService();
