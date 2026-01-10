// components/ui/button/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
	...rest  
}) => {
	const baseClasses =
		"flex items-center bg-[#0071E3] px-8 h-[40px] text-[14px] text-md justify-center font-[600] text-white rounded-[8px]";

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${className}`}
			{...rest}  
		>
			{children}
		</button>
	);
};

export default Button;