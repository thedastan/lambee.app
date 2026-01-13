// src/redux/hooks/useCreateSubscription.ts

import { useMutation, useQuery } from "@tanstack/react-query";
import { ICreateSubscriptionPayload } from "../models/subscription.model";
import { subscriptionsService } from "../services/subscription.service";

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
		error 
	};
}