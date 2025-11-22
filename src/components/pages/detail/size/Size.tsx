// src/components/pages/detail/size/Size.tsx
"use client";

import { useState } from "react";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { IoCheckmark } from "react-icons/io5";
import Button from "@/components/ui/button/Button";

interface SizeItem {
  item: string;
}

interface SizeData {
  size: string;
  kg: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  order: number;
  count: number;
  items: SizeItem[];
}

const SizeDetail = () => {
  const [selectedSize, setSelectedSize] = useState<SizeData | null>(null);

  const data: SizeData[] = [
    {
      size: "NB",
      kg: "до 4,5 кг",
      title: "По подписке - 26 штук",
      oldPrice: 9000,
      newPrice: 8000,
      order: 9000,
      count: 64,
      items: [
        { item: "Отправки каждые 4 недели" },
        { item: "Пропустите или отмените в любое время" },
        { item: "Около 600 сомов в день" },
        { item: "Управляйте своими доставками" },
        { item: "В первой коробке находится пробник следующего размера" },
      ],
    },
    {
      size: "S",
      kg: "3,6–5,4 кг",
      title: "По подписке - 26 штук",
      oldPrice: 9000,
      newPrice: 8000,
      order: 9000,
      count: 64,
      items: [
        { item: "Отправки каждые 4 недели" },
        { item: "Пропустите или отмените в любое время" },
        { item: "Около 600 сомов в день" },
        { item: "Управляйте своими доставками" },
        { item: "В первой коробке находится пробник следующего размера" },
      ],
    },
    {
      size: "M",
      kg: "6,3–10,8 кг",
      title: "По подписке - 26 штук",
      oldPrice: 9000,
      newPrice: 8000,
      order: 9000,
      count: 64,
      items: [
        { item: "Отправки каждые 4 недели" },
        { item: "Пропустите или отмените в любое время" },
        { item: "Около 600 сомов в день" },
        { item: "Управляйте своими доставками" },
        { item: "В первой коробке находится пробник следующего размера" },
      ],
    },
    {
      size: "L",
      kg: "9–14,5 кг",
      title: "По подписке - 26 штук",
      oldPrice: 9000,
      newPrice: 8000,
      order: 9000,
      count: 64,
      items: [
        { item: "Отправки каждые 4 недели" },
        { item: "Пропустите или отмените в любое время" },
        { item: "Около 600 сомов в день" },
        { item: "Управляйте своими доставками" },
        { item: "В первой коробке находится пробник следующего размера" },
      ],
    },
  ];

  const data2 = [
    { title: "Преимущество 1" },
    { title: "Преимущество 2" },
    { title: "Преимущество 3" },
    { title: "Преимущество 4" },
  ];

  const openModal = (size: SizeData) => {
    setSelectedSize(size);
  };

  return (
    <section className="p-4">
      <Description>Выберите свой размер</Description>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {data.map((el) => (
          <div
            key={el.size} // лучше использовать уникальный ключ
            onClick={() => openModal(el)}
            className={`p-3 bg-white border rounded-[8px] flex flex-col gap-1 cursor-pointer ${
              selectedSize?.size === el.size
                ? "border-[#AAA4C2]"
                : "border-[#E4E4E7]"
            }`}
          >
            <Title className="text-[14px] font-[600]">{el.size}</Title>
            <Description className="text-[#515151]">{el.kg}</Description>
          </div>
        ))}
      </div>

      {selectedSize && (
        <div className="flex flex-col justify-center items-center">
          <Description className="mt-4 pb-3 text-start w-full">
            Выберите тип заказа:
          </Description>
          <span className="text-[12px] text-white bg-[#AAA4C2] p-1 px-2 rounded-tr-[2px] rounded-tl-[2px] rounded-br-0 rounded-bl-0">
            Скидка 10%
          </span>
          <div
            className="bg-white border-[#AAA4C2] border rounded-[8px] w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Title className="text-[16px] font-[600]">
              По подписке - {selectedSize.count} штук
            </Title>

            <div className="mt-2">
              <div className="flex items-center gap-2">
                <Description className="text-[#AAA4C2] font-[500]">
                  {selectedSize.newPrice} с
                </Description>
                <Description className="line-through text-[#515151]">
                  {selectedSize.oldPrice} с
                </Description>
              </div>
              <div className="list-disc space-y-2 mt-4">
                {selectedSize.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-start gap-2">
                    <div className="w-8">
                      <IoCheckmark className="text-[#AAA4C2] w-8" size={20} />
                    </div>
                    <Description className="text-[#515151]">{item.item}</Description>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="bg-white mt-3 border-[#E4E4E7] flex justify-between items-start border rounded-[8px] w-full p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              <Title className="text-[16px] font-[600]">
                По подписке - {selectedSize.count} штук
              </Title>
              <Description className="flex items-center gap-2">
                <IoCheckmark className="w-8" size={20} />
                {selectedSize.count} шт.
              </Description>
            </div>
            <Description>{selectedSize.order} c</Description>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <Title className="font-[600]">Доставка в течение месяца</Title>
        <Button className="w-full max-w-full md:max-w-[250px]">
          Добавить в корзину
        </Button>
        <div className="grid grid-cols-2 md:gap-x-32 gap-x-8 gap-y-8 mt-4">
          {data2.map((el, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center w-full max-w-[170px]"
            >
              <div className="bg-[#DCDCDC] w-[40px] h-[40px] rounded-[8px]" />
              <Description>{el.title}</Description>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SizeDetail;