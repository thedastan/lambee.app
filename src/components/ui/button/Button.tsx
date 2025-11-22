// components/ui/Button.tsx
import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	children,
	onClick,
	disabled = false,
	className = "",
}) => {
	// Определяем классы по варианту
	const baseClasses =
		"flex items-center bg-[#AAA4C2] px-8 h-[40px] text-[14px] text-md justify-center font-[600] text-white rounded-[8px]";
 
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${className}`}>
			{children}
		</button>
	);
};

export default Button;
