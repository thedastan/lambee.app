// src/components/payment/PaymentMethodSelector.tsx
"use client";

import { Title } from "@/components/ui/text/Title";
import { useUserProfile } from "@/redux/hooks/user";
import React from "react";
import { useRouter } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";

type PaymentMethod = "finikPay" | "lambeeBalance" | "bonus";

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  // Исправлено: делаем функцию необязательной, чтобы избежать конфликтов типов
  onSelect?: (method: PaymentMethod) => void;
}

const PaymentSubMethodSelector = ({
  selectedMethod,
  onSelect,
}: PaymentMethodSelectorProps) => {
  const isSelected = (method: PaymentMethod) => selectedMethod === method;
  const { profile } = useUserProfile();
  const router = useRouter();

  const balanceAmount = profile?.balance?.amount || 0;
  const bonusAmount = profile?.bonus_balance?.amount || 0;
  const hasBonuses = bonusAmount > 0;

  const handleTopUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(PAGE.PROFILE);
  };

  return (
    <div className="flex flex-col gap-4 bg-[#FFFDFA] p-4">
      <Title>Способ оплаты</Title>
      <div className="rounded-[8px] bg-white">
        
        {/* Finik Pay */}
        <div
          className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
            isSelected("finikPay") ? "border-[#0071E3]" : "border-[#DEDEDE]"
          } rounded-tr-[8px] rounded-tl-[8px]`}
          onClick={() => onSelect?.("finikPay")}>
          <div className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                isSelected("finikPay")
                  ? "border-[#0071E3] bg-[#0071E3]"
                  : "border-[#DEDEDE]"
              }`}>
              <span
                className={`w-2 h-2 rounded-full ${
                  isSelected("finikPay") ? "bg-white" : "bg-transparent"
                }`}></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[14px] font-medium">Через любой банк КР</span>
              <span className="text-[10px] text-gray-500">Банки Кыргызстана или картой Visa</span>
            </div>
          </div>
        </div>

        {/* Баланс Lambee */}
        <div
          className={`flex items-center justify-between border-x border-b ${
            isSelected("lambeeBalance")
              ? "border-[#0071E3] border-t-[#0071E3]"
              : "border-[#DEDEDE]"
          } ${!hasBonuses ? "rounded-br-[8px] rounded-bl-[8px]" : ""} px-4 py-3 cursor-pointer`}
          onClick={() => onSelect?.("lambeeBalance")}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected("lambeeBalance")
                    ? "border-[#0071E3] bg-[#0071E3]"
                    : "border-[#DEDEDE]"
                }`}>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected("lambeeBalance") ? "bg-white" : "bg-transparent"
                  }`}></span>
              </span>
              <span className="text-[14px]">
                Баланс Lambee {balanceAmount > 0 ? `- ${balanceAmount} сом` : ""}
              </span>
            </div>
            
            {balanceAmount <= 0 && (
              <button
                onClick={handleTopUp}
                className="bg-[#0071E3] text-white px-4 py-1.5 text-[12px] font-medium rounded-[6px] hover:bg-opacity-90 transition-colors"
              >
                Пополнить
              </button>
            )}
          </div>
        </div>

        {/* Бонусы */}
        {hasBonuses && (
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer border ${
              isSelected("bonus") ? "border-[#0071E3]" : "border-[#DEDEDE]"
            } border-t-0 rounded-br-[8px] rounded-bl-[8px]`}
            onClick={() => onSelect?.("bonus")}>
            <div className="flex items-center gap-3">
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected("bonus")
                    ? "border-[#0071E3] bg-[#0071E3]"
                    : "border-[#DEDEDE]"
                }`}>
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSelected("bonus") ? "bg-white" : "bg-transparent"
                  }`}></span>
              </span>
              <span className="text-[14px]">
                Бонусы - {bonusAmount} сом
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSubMethodSelector;