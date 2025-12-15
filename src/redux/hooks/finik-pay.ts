import { useMutation } from "@tanstack/react-query";
import { finikPayService } from "../services/finik-pay.service";

export function useFinikPay() {
	return useMutation({
		mutationFn: (amount: number) => finikPayService.initiatePayment(amount),
		onSuccess: (data) => {
			if (data.detail) {
				if (data.detail) {
          window.open(data.detail, "_blank", "noopener,noreferrer");
				}
			}
		},
		onError: (error) => {
			console.error("Ошибка при инициации оплаты:", error);
		},
	});
}
