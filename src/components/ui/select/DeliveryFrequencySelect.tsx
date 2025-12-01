// src/components/ui/select/DeliveryFrequencySelect.tsx
"use client";

import React, { useState, useRef, useEffect, ReactNode } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

export interface DeliveryFrequencyOption {
  value: string;
  label: string;
}

export interface DeliveryFrequencySelectProps {
  label?: ReactNode;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  options?: DeliveryFrequencyOption[];
  className?: string;
  error?: boolean;
}

const DeliveryFrequencySelect = ({
  label,
  required = false,
  value,
  onChange,
  options = [
    { value: "weekly", label: "Каждую неделю" },
    { value: "biweekly", label: "Каждые 2 недели" },
    { value: "triweekly", label: "Каждые 3 недели" },
    { value: "monthly", label: "Каждый месяц" },
  ],
  className = "",
  error = false,
}: DeliveryFrequencySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  const handleOptionClick = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-[#FF5F57] ml-1">*</span>}
        </label>
      )}

      {/* Выбранный элемент */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] px-4 py-4 rounded-[8px] border outline-none flex items-center justify-between cursor-pointer transition-colors ${
          error ? "border-red-500" : "border-[#E4E4E7]"
        }`}
      >
        <span className="text-[16px] text-[#515151]">{selectedOption.label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M12 6L8 10L4 6"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Дропдаун */}
      {isOpen && (
        <div className="absolute z-10 w-full max-w-[415px] p-3   mt-1 bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg max-h-[220px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`px-4 py-3 rounded-[4px] cursor-pointer transition-colors ${
                value === option.value
                  ? "bg-[#F3F4F6] flex items-center justify-between"
                  : "hover:bg-[#F9FAFB]"
              }`}
            >
              <span className="text-[16px] text-[#515151]">{option.label}</span>
              {value === option.value && (
                <IoCheckmarkSharp />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryFrequencySelect;