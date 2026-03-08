import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "../services/orders.service";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getOrders(),
  });
}

export function useOrderById(id: string | number) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrderById(id),
    enabled: !!id,  
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: { city_id?: number; street?: string } }) =>
      orderService.updateOrder(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["order", String(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

