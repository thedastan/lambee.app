import { useMutation } from "@tanstack/react-query";
import { finikPayService } from "../services/finik-pay.service";
import { IFinikPayResponse } from "../models/finik-pay.model";

export function useFinikPay() {
	return useMutation<
		IFinikPayResponse, // ✅ тип успешного ответа
		Error, // ✅ тип ошибки
		number // ✅ тип аргумента (amount: number)
	>({
		mutationFn: (amount: number) => finikPayService.initiatePayment(amount),
		// onSuccess и onError можно оставить пустыми или убрать
	});
}
