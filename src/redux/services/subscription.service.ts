import { PRIVATE_API } from "@/api/interceptors";
import {
	ICreateSubscriptionPayload,
	ICreateSubscriptionResponse,
	SubID,
} from "../models/subscription.model";

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
		const response = await PRIVATE_API.get<ICreateSubscriptionResponse>(
			this.BASE_URL
		);
		return response.data;
	}

	async getSubscriptionById(id: string | number) {
		const response = await PRIVATE_API.get<SubID>(`${this.BASE_URL}${id}/`);
		return response.data;
	}

	async patchSubscription(id: string | number, payload: { city_id?: number; street?: string; frequency_id?: number; weekday?: number }) {
		const response = await PRIVATE_API.patch(
			`${this.BASE_URL}${id}/`,
			payload
		);
		return response.data;
	}

	async deleteSubscription(id: string | number) {
		const response = await PRIVATE_API.delete(`${this.BASE_URL}${id}/`);
		return response.data;
	}


	// freeze

	async pauseSubscription(id: string | number, until: string) {
		const response = await PRIVATE_API.post(
			`${this.BASE_URL}${id}/pause/`,
			{ until }
		);
		return response.data;
	}
	
	async resumeSubscription(id: string | number) {
		const response = await PRIVATE_API.post(
			`${this.BASE_URL}${id}/resume/`
		);
		return response.data;
	}

	///

	async paySubscription(id: string | number, payment_method: string) {
		const response = await PRIVATE_API.post(
			`${this.BASE_URL}${id}/pay/`,
			{ payment_method }
		);
		return response.data;
	}
}

export const subscriptionsService = new SubscriptionsService();
