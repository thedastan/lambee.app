// components/ui/Modal.tsx
"use client";

import React from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	mobileHeight?: string;
	bgColor?: string; // 👈 новый пропс для фона
}

const ModalBottom: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	title,
	mobileHeight = "h-auto",
	bgColor = "bg-white", // 👈 по умолчанию белый фон
}) => {
	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 flex md:items-center items-end justify-center ${
				isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
			} transition-opacity duration-300 z-50`}
			onClick={onClose}>
			{/* Мобильная версия */}
			<div
				className={`block md:hidden w-full ${mobileHeight} rounded-t-[30px] ${bgColor} px-4 pt-3 pb-4 relative transform transition-all duration-300 ease-out will-change-transform ${
					isOpen ? "translate-y-0" : "translate-y-full"
				}`}
				onClick={(e) => e.stopPropagation()}>
				<div className="flex items-center justify-between px-4 pt-4 ">
					<h1 className="text-[20px] font-[700] text-[#18181B]">{title}</h1>
					<button
						onClick={onClose}
						className="text-[#51525C]   text-2xl leading-none"
						aria-label="Закрыть модалку">
						&times;
					</button>
				</div>

				{children}
			</div>

			{/* Десктопная версия */}
			<div
				className={`hidden md:block w-full max-w-[482px] max-h-[90vh] rounded-[18px] ${bgColor} px-4 py-4 relative transform transition-all duration-300 ease-out will-change-transform ${
					isOpen
						? "scale-100 opacity-100"
						: "scale-95 opacity-0 pointer-events-none"
				}`}
				onClick={(e) => e.stopPropagation()}
				style={{ maxHeight: "90vh", overflowY: "auto" }}>

				<div className="flex items-center justify-between px-4 ">
					<h1 className="text-[20px] font-[700] text-[#18181B]">{title}</h1>
					<button
						onClick={onClose}
						className="text-[#51525C]   text-2xl leading-none"
						aria-label="Закрыть модалку">
						&times;
					</button>
				</div>

				{children}
			</div>
		</div>
	);
};

export default ModalBottom;
