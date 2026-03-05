import { PUBLIC_API } from "@/api/interceptors";
import { IFrequencies } from "../models/frequencies.model";

class FrequenciesService {
	private BASE_URL = "/api/public/v1/subscriptions/";
	                   

	async getFrequencies() {
		const response = await PUBLIC_API.get<IFrequencies>(
			this.BASE_URL + `frequencies`
		);
		return response.data;
	}
}


export const frequenciesService = new FrequenciesService();
