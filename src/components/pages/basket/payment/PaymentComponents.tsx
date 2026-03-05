"use client";

import { useState } from "react";
import PaymentTotal from "./payment-totla/PaymentTotal";
import PaymentForma from "./payment-forma/PaymentForma";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { orderService } from "@/redux/services/orders.service";
import { useCart } from "@/redux/hooks/useCart";
import { ICreateOneTimeOrderPayload } from "@/redux/models/orders.model";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";
type BackendPaymentMethod = "finik" | "balance" | "bonus";

// Создадим интерфейс для хранения выбранного адреса в стейте
interface SelectedAddress {
  city_id: number;
  street: string;
}

const PaymentComponents = () => {
  // Теперь храним объект вместо строки
  const [selectedAddress, setSelectedAddress] = useState<SelectedAddress | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("finikPay");
  const [isLoading, setIsLoading] = useState(false);

  const { cart, clear } = useCart();

  const getErrorMessage = (detail?: string) => {
    if (detail === "Unauthorized") {
      return "Сначала войдите в аккаунт или зарегистрируйтесь";
    }
    return detail || "Не удалось оформить заказ";
  };

  // Изменяем хэндлер для получения объекта
  const handleAddressChange = (city_id: number, street: string) => {
    setSelectedAddress({ city_id, street });
  };

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleCheckout = async () => {
    // 🛑 Проверка адреса (теперь проверяем объект)
    if (!selectedAddress) {
      toast.error("Пожалуйста, выберите адрес доставки", {
        position: "top-center",
      });
      return;
    }

    const oneTimeItems = cart.filter((item) => item.type === "one-time");
    if (oneTimeItems.length === 0) {
      toast.error("Нет товаров для оформления заказа", {
        position: "top-center",
      });
      return;
    }

    let backendPaymentMethod: BackendPaymentMethod;
    if (selectedPaymentMethod === "finikPay") {
      backendPaymentMethod = "finik";
    } else if (selectedPaymentMethod === "lambeeBalance") {
      backendPaymentMethod = "balance";
    } else {
      backendPaymentMethod = "bonus";
    }

    const items = oneTimeItems.map((item) => ({
      product_variant_id: item.variantId,
      quantity: item.quantity,
    }));

    // ✅ Теперь payload полностью соответствует ICreateOneTimeOrderPayload
    const payload: ICreateOneTimeOrderPayload = {
      city_id: selectedAddress.city_id,
      street: selectedAddress.street,
      payment_method: backendPaymentMethod,
      items,
    };

    setIsLoading(true);

    try {
      const response = await orderService.createOneTimeOrder(payload);
      const detail = response.data?.detail;

      if (typeof detail === "string" && detail.startsWith("http")) {
        clear();
        toast.success("Заказ создан! Перенаправляем на оплату...", {
          position: "top-center",
        });
        window.location.href = detail;
        return;
      }

      toast.error(getErrorMessage(detail as string), {
        position: "top-center",
      });
    } catch (error: any) {
      const backendDetail = error?.response?.data?.detail;
      toast.error(getErrorMessage(backendDetail), { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:bg-transparent bg-[#FFFDFA] flex flex-col md:flex-row justify-between items-start h-full relative">
      <div className="md:p-4 p-0 md:w-[50%] w-full">
        <PaymentForma
          onAddressChange={handleAddressChange} // Передаем обновленный хэндлер
          onPaymentMethodChange={handlePaymentMethodChange}
          selectedMethod={selectedPaymentMethod}
        />
      </div>

      <div className="md:w-[50%] w-full bg-[#F9F4EC] md:bg-transparent">
        <PaymentTotal onCheckout={handleCheckout} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default PaymentComponents;