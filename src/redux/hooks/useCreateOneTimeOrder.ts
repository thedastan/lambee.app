import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateOneTimeOrderPayload } from "../models/orders.model";
import { orderService } from "../services/orders.service";

export function useCreateOneTimeOrder() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: ICreateOneTimeOrderPayload) =>
			orderService.createOneTimeOrder(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["orders"] });
			// Можно также инвалидировать корзину, профиль и т.д.
		},
	});
}
