import { PRIVATE_API } from "@/api/interceptors";  
import { ICreateSubscriptionPayload, ICreateSubscriptionResponse, ISubscriptionsResponse } from "../models/subscription.model";

class SubscriptionsService {
	private BASE_URL = "/api/private/v1/subscriptions/";
	

	async createSubscription(payload: ICreateSubscriptionPayload) {
		const response = await PRIVATE_API.post<ICreateSubscriptionResponse>(
			this.BASE_URL,
			payload
		);
		return response.data;
	}

	async getSubscriptions() {
		const response = await PRIVATE_API.get<ISubscriptionsResponse>(this.BASE_URL);
		return response.data;
	}
}

export const subscriptionsService = new SubscriptionsService();