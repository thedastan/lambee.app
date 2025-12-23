import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services/orders.service";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getOrders(),
  });
}