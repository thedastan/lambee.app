"use client";

import { Title } from "@/components/ui/text/Title";
import Image from "next/image";
import Link from "next/link";
import ActionMenuButton from "../button/ActionMenuButton";
import { Description } from "../text/Description";
import { ISubscription } from "@/redux/models/subscription.model";

interface FollowCardProps {
  // Используем структуру из вашего JSON
  data: any; // В идеале здесь должен быть интерфейс, соответствующий вашему JSON
  isOpenMenu: boolean;
  onToggleMenu: (id: number) => void;
  onAction: (action: string, id: number) => void;
}

const FollowCard = ({
  data,
  onToggleMenu,
  onAction,
}: FollowCardProps) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Чтобы не срабатывал переход по ссылке Link
    onToggleMenu(data.id);
  };

  const handleAction = (action: string) => {
    onAction(action, data.id);
  };

  const getStatusBadgeClass = (status: string) => {
    // Маппинг статусов под ваш бэкенд
    switch (status) {
      case "active":
        return "text-[#027A48] border-[#ABE4B8] bg-[#ECFDF3]";
      case "processing":
        return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
      default:
        return "text-gray-600 border-gray-300 bg-gray-100";
    }
  };

  // Метод оплаты для отображения
  const paymentMethods: Record<string, string> = {
    finik: "Finik Pay",
    balance: "Баланс Lambee",
    bonus: "Бонусы",
  };

  return (
    <Link
      href={`/follow/${data.id}`}
      className="border border-[#E4E4E7] rounded-[16px] p-4 bg-white w-full relative block">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b pb-3 border-[#E4E4E7]">
        <div className="flex w-full h-[45px] gap-3 items-center">
          {/* Если в API нет картинки подписки, можно брать картинку первого айтема или заглушку */}
           

          <div className="">
            <Title className="!text-[18px] font-[700]">
              Подписка №{data.id}
            </Title>
            <Description className="text-[#515151]">
              {data.frequency?.label || "Частота не указана"}
            </Description>
          </div>
        </div>

         
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 mt-3">
        {/* Статус */}
        <div className="flex items-center justify-between">
          <Title className="text-[#515151] text-[14px]">Статус:</Title>
          <Title
            className={`rounded-full py-0.5 px-3 border text-[12px] ${getStatusBadgeClass(
              data.status
            )}`}>
            {data.status}
          </Title>
        </div>

        {/* Товары из массива items */}
        {data.items?.map((item: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <Title className="text-[14px] text-[#515151]">Товар (ID: {item.product_variant_id})</Title>
            <Title className="text-[14px]">{item.quantity} шт</Title>
          </div>
        ))}

        {/* Способ оплаты */}
        <div className="flex items-center justify-between">
          <Title className="text-[#515151] text-[14px]">Оплата:</Title>
          <Title className="text-[14px]">{paymentMethods[data.payment_method] || data.payment_method}</Title>
        </div>

        {/* Адрес */}
        <div className="flex items-center justify-between">
          <Title className="text-[#515151] text-[14px]">Адрес:</Title>
          <Title className="text-[14px] truncate max-w-[180px]">
            {data.city?.name}, {data.street}
          </Title>
        </div>

        {/* Дата следующей доставки */}
        <div className="flex items-center justify-between">
          <Title className="text-[#515151] text-[14px]">След. доставка:</Title>
          <Title className="text-[14px]">
            {data.next_delivery_date || "Не назначена"}
          </Title>
        </div>

        {/* Итоговая сумма */}
        <div className="flex items-center justify-between  ">
          <Title className="font-[400] text-[#515151]">Сумма:</Title>
          <Title className="  font-[400]">
            {data.total_amount.toLocaleString()} сом
          </Title>
        </div>
      </div>
    </Link>
  );
};

export default FollowCard;