// src/services/order.service.ts
import { PRIVATE_API } from "@/api/interceptors";
import { ICreateOneTimeOrderPayload, INotificationsResponse, IOrdersResponse } from "../models/orders.model";
 

class OrderService {
  private BASE_URL = "/api/private/v1/";

  getOrders() {
    return PRIVATE_API.get<IOrdersResponse>(`${this.BASE_URL}user/orders/`);
  }

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