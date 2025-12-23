// src/models/order.model.ts
export interface IOrderItem {
  product_id: number;
  quantity: number;
  price: number;
}

export interface IOrder {
  id: number;
  type: string;
  status: string;
  address: string;
  created_at: string;
  items: IOrderItem[];
}

export interface IOrdersResponse {
  detail: IOrder[];
}

export interface INotification {
  title: string;
  description: string;
  created_at: string;
}

export interface INotificationsResponse {
  detail: INotification[];
}

export interface ICreateOneTimeOrderPayload {
  product_id: number;
  quantity: number;
  address: string;
}