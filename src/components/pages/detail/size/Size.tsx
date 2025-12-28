// src/components/pages/detail/size/Size.tsx
"use client";

import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import Button from "@/components/ui/button/Button";
import { Detail } from "@/redux/models/product.model";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { MdCheck } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useProduct, useProductReviews } from "@/redux/hooks/product";
import { useCreateOneTimeOrder } from "@/redux/hooks/orders";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";

interface HeroDetailProps {
  product: Detail;
  productId: number;
}

const SizeDetail = ({ product, productId }: HeroDetailProps) => {
  const { data: card } = useProduct();
  const { data } = useProductReviews(productId);

  const allReviews = data?.detail.results || [];
  const reviewCount = allReviews.length;

  const [selectedOption, setSelectedOption] = useState<"subscription" | "one-time">("subscription");
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Получаем адрес из localStorage (как в ProfileAddress)
  useEffect(() => {
    const savedId = localStorage.getItem(PROFILE_ADDRESS_KEY);
    const savedLabel = localStorage.getItem("selectedShippingAddressLabel");
    if (savedId && savedLabel) {
      setSelectedAddress(savedLabel);
    }
  }, []);

  // Хук для создания разового заказа
  const { mutate: createOrder, isPending } = useCreateOneTimeOrder();

  // Управление количеством
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // Обработчик нажатия на кнопку
  const handleActionClick = () => {
    if (selectedOption === "one-time") {
      if (!selectedAddress) {
        alert("Пожалуйста, выберите адрес доставки в профиле.");
        return;
      }

      createOrder(
        {
          product_id: product.id,
          quantity,
          address: selectedAddress,
        },
        {
          onSuccess: (response) => {
            const paymentUrl = response.detail;
            if (paymentUrl && typeof paymentUrl === "string") {
              window.location.href = paymentUrl;
            } else {
              alert("Не удалось получить ссылку на оплату.");
            }
          },
          onError: (error) => {
            console.error("Ошибка создания заказа:", error);
            alert("Не удалось создать заказ. Попробуйте позже.");
          },
        }
      );
    } else {
      alert("Подписка временно недоступна.");
    }
  };

  // Текст кнопки
  const buttonLabel =
    selectedOption === "one-time" ? "Купить один раз" : "Добавить в корзину";

  // Итоговая цена
  const totalPrice = product.price * quantity;

	const formatPrice = (price: number): string => {
		return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // опционально: пробелы для тысяч
	};

  return (
    <section className="p-4 w-full bg-white rounded-[8px] border">
      <TitleComponent>Выберите свой размер:</TitleComponent>

      <div className="w-full grid grid-cols-2 gap-2 mt-4">
        {card?.detail.map((el, index) => (
          <div key={index} className="border flex flex-col gap-1 rounded-[8px] p-3">
            <Title>{el.title}</Title>
            <Description className="text-[#515151]">{el.weight_range} кг</Description>
            <Description className="text-[#515151]">{el.items_count} шт</Description>
          </div>
        ))}
      </div>

      <div className="w-full p-4 border rounded-[8px] flex flex-col gap-2 mt-4">
        <Title className="font-[600]">{product.title}</Title>
        <Description className="flex items-center gap-1">
          <IoStarSharp />
          <IoStarSharp />
          <IoStarSharp />
          <IoStarSharp />
          <IoStarSharp />
          <span className="text-[#515151] ml-2">{reviewCount.toLocaleString()} отзывов</span>
        </Description>
        <Description className="w-full max-w-[280px]">{product.description}</Description>

        <div className="border-b w-full mt-2" />

        <Description className="text-[#141414] mt-2">Выберите тип заказа: </Description>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setSelectedOption("subscription")}
            className={`p-3 rounded-[8px] relative flex flex-col gap-2 cursor-pointer transition-all duration-200 ${
              selectedOption === "subscription"
                ? "border border-[#7668AD] bg-[#0071E3] text-white"
                : "border border-gray-300 bg-white text-gray-800"
            }`}
          >
            <Title className="font-[600] w-full max-w-[185px]">
              По подписке - {product.items_count} шт
            </Title>
            <div className="flex items-center gap-1">
              <Title className="font-medium">{product.subscription_price} сом в месяц</Title>
              <span
                className={`line-through ml-1 ${
                  selectedOption === "subscription" ? "text-[#ffffff93]" : "text-gray-500"
                }`}
              >
                {product.price} сом
              </span>
            </div>
            <Title
              className={`px-2 py-[1px] uppercase text-[15px] font-[600] rounded-[7px] rounded-tl-none absolute top-0 right-0 ${
                selectedOption === "subscription"
                  ? "bg-white text-[#000000] "
                  : "bg-[#0071E3] text-white"
              }`}
            >
              Скидка 10%
            </Title>
          </div>

          <div
            onClick={() => setSelectedOption("one-time")}
            className={`p-3 rounded-[8px] relative cursor-pointer transition-all duration-200 ${
              selectedOption === "one-time"
                ? "border border-[#7668AD] bg-[#0071E3] text-white"
                : "border border-gray-300 bg-white text-gray-800"
            }`}
          >
            <div className="flex justify-between">
              <Description className="font-[600]">
                {selectedOption === "one-time" ? (
                  <span>Разовый заказ</span>
                ) : (
                  "Разовый заказ"
                )}
              </Description>
              <Description>{formatPrice(totalPrice)} сом</Description>
            </div>

            <div className="border border-[#E4E4E7] w-full mt-2 max-w-[90px] rounded-[4px] flex justify-between items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decrement();
                }}
                className={`border-r w-[28px] h-[28px] flex justify-center items-center ${
                  selectedOption === "one-time" ? "text-white" : "text-gray-600"
                }`}
              >
                <FiMinus />
              </button>
              <Description>{quantity}</Description>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  increment();
                }}
                className={`border-l w-[28px] h-[28px] flex justify-center items-center ${
                  selectedOption === "one-time" ? "text-white" : "text-gray-600"
                }`}
              >
                <VscAdd />
              </button>
            </div>
          </div>
        </div>

        {/* Предупреждение, если разовый заказ без адреса */}
        {selectedOption === "one-time" && !selectedAddress && (
          <Description className="text-orange-600 text-sm mt-2">
            ⚠️ Выберите адрес доставки в профиле, чтобы купить.
          </Description>
        )}

        <Title className="font-[600] text-center mt-2">Доставка в течение месяца</Title>
        <Button
          className="w-full max-w-full"
          onClick={handleActionClick}
          disabled={selectedOption === "one-time" && (!selectedAddress || isPending)}
        >
          {isPending ? "Создание заказа..." : buttonLabel}
        </Button>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 w-full">
          {product.benefits.map((el, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-full max-w-full"
            >
              <div className="bg-[#DCDCDC] relative overflow-hidden w-[40px] h-[40px] rounded-[8px]">
                <Image fill objectFit="cover" src={el.icon.trim()} alt="icon" />
              </div>
              <Description className="text-[#515151] mt-2">{el.title}</Description>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SizeDetail;