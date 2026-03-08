import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateSubscriptionPayload } from "../models/subscription.model";
import { subscriptionsService } from "../services/subscription.service";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { useRouter } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";

export function useCreateSubscription() {
	const mutation = useMutation({
		mutationFn: (payload: ICreateSubscriptionPayload) =>
			subscriptionsService.createSubscription(payload),
	});

	return mutation;
}

export function useSubscriptions() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["subscriptions"],
		queryFn: () => subscriptionsService.getSubscriptions(),
	});

	return {
		subscriptions: data?.detail || [],
		isLoading,
		error,
	};
}

export function useSubscriptionById(id: string | number) {
	return useQuery({
		queryKey: ["subscription", id],
		queryFn: () => subscriptionsService.getSubscriptionById(id),
		enabled: !!id,
	});
}


export function useUpdateSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: any }) =>
      subscriptionsService.patchSubscription(id, payload),
    onSuccess: (_, variables) => {
      // Инвалидируем кэш конкретной подписки, чтобы данные на странице обновились
      queryClient.invalidateQueries({
        queryKey: ["subscription", String(variables.id)],
      });
      toast.success("Данные обновлены");
    },
    onError: (error: any) => {
      const message = error.response?.data?.detail || "Ошибка при обновлении";
      toast.error(message);
    },
  });
}

/// freeze
 
export function usePauseSubscription() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, until }: { id: string | number; until: string }) =>
			subscriptionsService.pauseSubscription(id, until),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ["subscription", String(variables.id)],
			});
		},
		onError: () => {
			toast.error(`Подписка не активна`, { position: "top-center" });
		},
	});
}
 
export function useResumeSubscription() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string | number) =>
			subscriptionsService.resumeSubscription(id),
		onSuccess: (_, id) => {
			queryClient.invalidateQueries({ queryKey: ["subscription", String(id)] });
		},
		onError: (error: any) => {
			const message =
				error.response?.data?.detail || "Произошла ошибка при разморозке";
			alert(`Ошибка: ${message}`);
		},
	});
}

///


export function useDeleteSubscription() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (id: string | number) =>
      subscriptionsService.deleteSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
      toast.success("Подписка успешно удалена");
      router.push(PAGE.FOLLOW);  
    },
    onError: (error: any) => {
      toast.error('Подписка уже удалена');
    },
  });
}

export function usePaySubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payment_method }: { id: string | number; payment_method: string }) =>
      subscriptionsService.paySubscription(id, payment_method),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["subscription", String(variables.id)],
      });
    } 
  });
}