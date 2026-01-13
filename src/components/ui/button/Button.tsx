// components/ui/button/Button.tsx
import React from "react";

type ButtonVariant = "primary" | "outline" | "secondary" | "danger";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
  ...rest
}) => {
  // Базовые классы для всех кнопок
  const baseClasses = "flex items-center px-8 h-[40px] text-[14px] text-md justify-center font-[600] rounded-[8px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  // Классы для разных вариантов кнопок
  const variantClasses = {
    primary: "bg-[#0071E3] text-white hover:bg-[#005bb5]",
    outline: "bg-white border text-[#0071E3] ",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;