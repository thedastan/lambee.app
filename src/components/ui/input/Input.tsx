'use client'
import EyeIcon from "@/assets/svg/EyeIcon";
import EyeOffIcon from "@/assets/svg/EyeOffIcon";
import React, { forwardRef, useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean; // Новый проп для отображения ошибки
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      disabled = false,
      className = "",
      error = false, // По умолчанию ошибки нет
      ...rest  
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Определяем реальный тип инпута
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[14px] font-medium text-[#515151] mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full h-[48px] px-4 py-4 rounded-[8px] border outline-none transition-all duration-200 ${
              disabled ? "opacity-50 cursor-not-allowed" : "cursor-text"
            } ${error ? "border-red-500" : "border-[#E4E4E7]"} ${className}`}
            {...rest}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] focus:outline-none"
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;