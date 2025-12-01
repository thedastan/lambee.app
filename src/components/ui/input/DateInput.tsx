// src/components/ui/input/DateInput.tsx
"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Определяем только нужные пропсы явно — это безопаснее и чище
export interface DateInputProps {
  label?: string;
  required?: boolean;
  error?: boolean;
  className?: string;
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholderText?: string;
  dateFormat?: string;
  maxDate?: Date;
  disabled?: boolean;
}

const DateInput = React.forwardRef<HTMLDivElement, DateInputProps>(
  (
    {
      label,
      required = false,
      selected,
      onChange,
      placeholderText = "ДД.ММ.ГГГГ",
      dateFormat = "dd.MM.yyyy",
      className = "",
      error = false,
      disabled = false,
    },
    ref
  ) => {
    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {required && <span className="text-[#FF5F57] ml-1">*</span>}
          </label>
        )}
        <DatePicker
          selected={selected}
          onChange={onChange}
          placeholderText={placeholderText}
          dateFormat={dateFormat}
          disabled={disabled}
          className={`w-full h-[48px] px-4 py-4 rounded-[8px] border outline-none transition-colors ${
            error ? "border-red-500" : "border-[#E4E4E7]"
          } ${className}`}
          calendarClassName="react-datepicker-custom"
          wrapperClassName="w-full"
        />
      </div>
    );
  }
);

DateInput.displayName = "DateInput";

export default DateInput;