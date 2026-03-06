"use client";
import React, { useState, useEffect, useMemo } from "react";
import Button from "@/components/ui/button/Button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

// Внутренний компонент барабана
const WheelPicker = ({
  items,
  initialValue,
  onChange,
}: {
  items: string[];
  initialValue: string;
  onChange: (v: string) => void;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    loop: true,
    dragFree: false,
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onChange(items[index]);
  }, [emblaApi, items, onChange]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const startIndex = items.indexOf(initialValue);
    if (startIndex !== -1) emblaApi.scrollTo(startIndex, false);
  }, [emblaApi, items, initialValue, onSelect]);

  return (
    <div className="relative h-48 w-full overflow-hidden select-none touch-none" ref={emblaRef}>
      <div className="flex flex-col h-full transform-gpu">
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={`flex items-center justify-center min-h-[44px] text-[18px] transition-all duration-200 ease-out ${
              index === selectedIndex ? "text-black font-[500] scale-110" : "text-gray-300 scale-95"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// Экспортируем основную модалку
const DatePickerModal = ({
  isOpen,
  onClose,
  date,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onSave: (d: Date) => void;
}) => {
  const [tempDate, setTempDate] = useState(new Date(date));

  useEffect(() => {
    if (isOpen) setTempDate(new Date(date));
  }, [isOpen, date]);

  const days = useMemo(() => {
    const count = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0).getDate();
    return Array.from({ length: count }, (_, i) => (i + 1).toString().padStart(2, "0"));
  }, [tempDate.getFullYear(), tempDate.getMonth()]);

  const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const years = useMemo(() => Array.from({ length: 80 }, (_, i) => (2026 - i).toString()), []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-sm rounded-[24px] p-6 shadow-2xl">
        <h3 className="text-center font-bold text-lg mb-4 text-black">Выберите дату</h3>
        <div className="relative flex px-2 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
          <div className="absolute top-1/2 left-0 right-0 h-10 -translate-y-1/2 bg-white shadow-sm border-y border-gray-200 pointer-events-none z-0" />
          <div className="relative z-10 flex w-full">
            <WheelPicker
              items={days}
              initialValue={tempDate.getDate().toString().padStart(2, "0")}
              onChange={(v) => {
                const d = new Date(tempDate);
                d.setDate(parseInt(v));
                setTempDate(d);
              }}
            />
            <WheelPicker
              items={months}
              initialValue={months[tempDate.getMonth()]}
              onChange={(v) => {
                const d = new Date(tempDate);
                d.setMonth(months.indexOf(v));
                setTempDate(d);
              }}
            />
            <WheelPicker
              items={years}
              initialValue={tempDate.getFullYear().toString()}
              onChange={(v) => {
                const d = new Date(tempDate);
                d.setFullYear(parseInt(v));
                setTempDate(d);
              }}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button onClick={onClose} className="flex-1 py-3 px-4 border font-medium !text-gray-500 bg-gray-100">
            Отмена
          </Button>
          <Button onClick={() => { onSave(tempDate); onClose(); }} className="flex-1">
            Готово
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;