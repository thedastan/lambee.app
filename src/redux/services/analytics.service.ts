// src/services/analytics.service.ts
import { PRIVATE_API } from "@/api/interceptors"; // Используем PRIVATE_API вместо PUBLIC_API
import { IAnalytics, IAnalyticsSummary } from "../models/analytics.model";

class AnalyticsService {
  private BASE_URL = "/api/private/v1/user/analytics/";

  async getAnalytics(date_from?: string, date_to?: string) {
		const response = await PRIVATE_API.get<IAnalytics>(this.BASE_URL, {
			params: { date_from, date_to } // Передача query параметров
		});
		return response.data;
	}

  async getAnalyticsSummary() {
    // Теперь заголовок Authorization будет добавлен автоматически интерцептором
    const response = await PRIVATE_API.get<IAnalyticsSummary>(
      this.BASE_URL + `summary`
    );
    return response.data;
  }
}

export const analyticsService = new AnalyticsService();