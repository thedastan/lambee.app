// src/services/order.service.ts
import { PRIVATE_API } from "@/api/interceptors";
import { ICreateOneTimeOrderPayload, INotificationsResponse, IOrderId, IOrdersResponse } from "../models/orders.model";
 

class OrderService {
  private BASE_URL = "/api/private/v1/";

  getOrders() {
    return PRIVATE_API.get<IOrdersResponse>(`${this.BASE_URL}user/orders/`);
  }

  getOrderById(id: string | number) {
    return PRIVATE_API.get<IOrderId>(`${this.BASE_URL}user/orders/${id}/`);
  }

  async updateOrder(id: string | number, payload: { city_id?: number; street?: string }) {
    const response = await PRIVATE_API.patch(`${this.BASE_URL}user/orders/${id}/`, payload);
    return response.data;
  }

  ///

  getNotifications() {
    return PRIVATE_API.get<INotificationsResponse>(
      `${this.BASE_URL}user/notifications/`
    );
  }

  createOneTimeOrder(payload: ICreateOneTimeOrderPayload) {
    return PRIVATE_API.post(`${this.BASE_URL}products/one-time/`, payload);
  }
}

export const orderService = new OrderService();