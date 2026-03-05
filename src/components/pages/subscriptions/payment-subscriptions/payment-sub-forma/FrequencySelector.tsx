"use client";

import React, { useState } from "react";
import { useFrequencies } from "@/redux/hooks/frequencies";
import Modal from "@/components/ui/modal/Modal"; 
import { FiChevronDown, FiCheck } from "react-icons/fi"; // иконки

const WEEKDAYS = [
  { id: 0, label: "Пн" },
  { id: 1, label: "Вт" },
  { id: 2, label: "Ср" },
  { id: 3, label: "Чт" },
  { id: 4, label: "Пт" },
  { id: 5, label: "Сб" },
  { id: 6, label: "Вс" },
];

interface FrequencySelectorProps {
  selectedFrequency: { id: number; day: number } | null;
  onChange: (data: { id: number; day: number }) => void;
}

export default function FrequencySelector({
  selectedFrequency,
  onChange,
}: FrequencySelectorProps) {
  const { data: freqData, isLoading } = useFrequencies();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const frequencyOptions = freqData?.detail || [];
  
  // Текущая выбранная частота (объект из API)
  const currentOption = frequencyOptions.find((opt) => opt.id === selectedFrequency?.id);

  const handleSelectFreq = (freqId: number) => {
    onChange({ id: freqId, day: selectedFrequency?.day ?? 0 });
    setIsDropdownOpen(false); // Закрываем только внутренний список
  };

  const handleSelectDay = (dayId: number) => {
    const defaultFreqId = frequencyOptions.length > 0 ? frequencyOptions[0].id : 1;
    onChange({ id: selectedFrequency?.id ?? defaultFreqId, day: dayId });
  };

  return (
    <div className="mb-3 flex flex-col gap-3">
      {/* 1. Поле вызова модалки */}
      <div>
        <label className="block text-[14px] font-medium text-[#515151] mb-2">
          Частота доставки *
        </label>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full h-[48px] px-4 border-[#E4E4E7] bg-white rounded-[8px] border text-left flex justify-between items-center"
        >
          <span className={selectedFrequency?.id ? "text-black" : "text-gray-400"}>
            {currentOption?.label || "Выберите частоту"}
          </span>
          <FiChevronDown className="text-gray-500" size={20} />
        </button>
      </div>

      {/* 2. Выбор дня (плитка под селектором) */}
      <div className="flex justify-between gap-1">
        {WEEKDAYS.map((day) => (
          <button
            key={day.id}
            type="button"
            onClick={() => handleSelectDay(day.id)}
            className={`flex-1 py-2.5 rounded-md border text-[12px] font-medium transition-all ${
              selectedFrequency?.day === day.id
                ? "bg-[#0071E3] text-white border-[#0071E3]"
                : "bg-white text-gray-600 border-[#E4E4E7]"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>

      {/* 3. Модальное окно (как на фото) */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Частота доставки"
      >
        <div className="flex flex-col gap-4 py-2">
          <p className="text-[14px] text-[#515151]">Выберите частоту доставки *</p>
          
          <div className="relative">
            {/* Основной контрол внутри модалки */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex justify-between items-center p-4 border rounded-[12px] transition-all ${
                isDropdownOpen ? "border-[#0071E3]" : "border-[#E4E4E7]"
              }`}
            >
              <span className="text-[16px]">
                {currentOption?.label || "Выберите вариант"}
              </span>
              <FiChevronDown 
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
                size={22} 
              />
            </button>

            {/* Выпадающий список внутри модалки (как на фото) */}
            {isDropdownOpen && (
              <div className="mt-2 border absolute w-full border-[#E4E4E7] rounded-[12px] overflow-hidden bg-white shadow-sm">
                {frequencyOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectFreq(opt.id)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className={`text-[16px] ${selectedFrequency?.id === opt.id ? "text-black" : "text-gray-600"}`}>
                      {opt.label}
                    </span>
                    {selectedFrequency?.id === opt.id && (
                      <FiCheck className="text-black" size={20} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full mt-4 py-4 bg-[#0071E3] text-white rounded-[12px] font-semibold text-[16px]"
          >
            Готово
          </button>
        </div>
      </Modal>
    </div>
  );
}