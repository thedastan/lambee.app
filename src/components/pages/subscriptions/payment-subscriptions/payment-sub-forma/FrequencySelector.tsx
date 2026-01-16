"use client";

import React, { useState, useRef, useEffect } from "react";

type Frequency = "weekly" | "biweekly" | "triweekly" | "monthly";

const FREQUENCY_OPTIONS: { value: Frequency; label: string }[] = [
	{ value: "weekly", label: "Каждую неделю" },
	{ value: "biweekly", label: "каждые 2 недели" },
	{ value: "triweekly", label: "каждые 3 недели" },
	{ value: "monthly", label: "каждый месяц" },
];

interface FrequencySelectorProps {
	selectedFrequency: Frequency | null;
	onChange: (frequency: Frequency) => void;
}

export default function FrequencySelector({
	selectedFrequency,
	onChange,
}: FrequencySelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const getSelectedLabel = () => {
		const option = FREQUENCY_OPTIONS.find((opt) => opt.value === selectedFrequency);
		return option ? option.label : "Выберите частоту";
	};

	const handleSelect = (value: Frequency) => {
		onChange(value);
		setIsOpen(false);
	};

	// Закрытие при клике вне
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="mb-3" ref={dropdownRef}>
			<label className="block text-[14px] font-medium text-[#515151] mb-2">
				Частота доставки *
			</label>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full h-[48px] px-4 border-[#E4E4E7] bg-white text-[#000000] rounded-[8px] text-[16px] font-[400] border outline-none transition-all duration-200 text-left flex justify-between items-center"
			>
				<span>{getSelectedLabel()}</span>
				<span className="text-[#515151]">
					<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M7.5 11L4 7.5l-1 1L7.5 13 12 8.5l-1-1L7.5 11z" />
					</svg>
				</span>
			</button>

			{isOpen && (
				<div className="absolute z-10 mt-1 w-full max-w-[400px] bg-white border border-[#E4E4E7] rounded-[8px] shadow-lg max-h-60 overflow-auto">
					{FREQUENCY_OPTIONS.map((option) => (
						<button
							key={option.value}
							type="button"
							onClick={() => handleSelect(option.value)}
							className={`w-full text-left px-4 py-2 hover:bg-[#f0f0f0] ${
								selectedFrequency === option.value
									? "bg-[#e6f0ff] text-[#0071E3] font-medium"
									: "text-[#515151]"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}