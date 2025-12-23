import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services/orders.service";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => orderService.getNotifications(),
  });
}