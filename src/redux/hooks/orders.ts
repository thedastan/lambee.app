// src/hooks/order.hooks.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateOneTimeOrderPayload, INotificationsResponse, IOrdersResponse } from "../models/orders.model";
import { orderService } from "../services/orders.service";
 

// Получить заказы
export const useOrders = () => {
  return useQuery<IOrdersResponse>({
    queryKey: ["orders"],
    queryFn: () => orderService.getOrders().then(res => res.data),
  });
};

// Получить уведомления
export const useNotifications = () => {
  return useQuery<INotificationsResponse>({
    queryKey: ["notifications"],
    queryFn: () => orderService.getNotifications().then(res => res.data),
  });
};

// Создать разовый заказ
export const useCreateOneTimeOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ICreateOneTimeOrderPayload) =>
      orderService.createOneTimeOrder(payload).then(res => res.data),
    onSuccess: () => {
      // Инвалидация связанных запросов
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // если есть
    },
  });
};