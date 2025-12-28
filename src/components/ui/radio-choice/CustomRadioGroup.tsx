// CustomRadioGroup.tsx

import React, { useState } from "react";

interface RadioOption {
	id: string;
	label: string;
	description?: string; // Опциональное описание под лейблом
	disabled?: boolean; // Можно отключить вариант
}

interface CustomRadioGroupProps {
	options: RadioOption[];
	value?: string; // Управляемое значение (контролируемый)
	defaultValue?: string; // Начальное значение (неконтролируемый)
	name: string; // Имя группы (для семантики)
	onChange?: (value: string) => void; // Обработчик изменения
	className?: string; // Дополнительные стили контейнера
	optionClassName?: string; // Дополнительные стили для каждого варианта
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
	options,
	value,
	defaultValue,
	name,
	onChange,
	className = "",
	optionClassName = "",
}) => {
	const [internalValue, setInternalValue] = useState(defaultValue || "");

	const selectedValue = value !== undefined ? value : internalValue;

	const handleChange = (id: string) => {
		if (value === undefined) {
			setInternalValue(id);
		}
		onChange?.(id);
	};

	return (
		<div className={`space-y-2 ${className}`}>
			{options.map((option, index) => {
				const isSelected = selectedValue === option.id;
				const isFirst = index === 0;
				const isLast = index === options.length - 1;

				return (
					<div
						key={option.id}
						className={`
              flex items-center justify-between p-3 cursor-pointer
              border rounded-lg transition-all duration-200
              ${
								isSelected
									? "border-[#0071E3] bg-indigo-50"
									: "border-gray-200 bg-white"
							}
              ${option.disabled ? "opacity-60 cursor-not-allowed" : ""}
              ${isFirst ? "rounded-t-lg" : ""}
              ${isLast ? "rounded-b-lg" : ""}
              ${optionClassName}
            `}
						onClick={() => !option.disabled && handleChange(option.id)}>
						<div className="flex items-center gap-3 w-full">
							<input
								type="radio"
								name={name}
								checked={isSelected}
								onChange={() => !option.disabled && handleChange(option.id)}
								className="sr-only"
								disabled={option.disabled}
								aria-label={option.label}
							/>

							<label className="flex items-center justify-between w-full gap-2 cursor-pointer">
								<div>
									<span className="text-[16px] text-gray-800 font-[400]">
										{option.label}
									</span>
									{option.description && (
										<p className="text-xs text-gray-500 mt-1">
											{option.description}
										</p>
									)}
								</div>

								<span
									className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center
                    ${
											isSelected
												? "border-[#0071E3] bg-[#0071E3]"
												: "border-gray-300"
										}
                    transition-colors duration-200
                  `}>
									{isSelected && (
										<span className="w-2 h-2 bg-white rounded-full"></span>
									)}
								</span>
							</label>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CustomRadioGroup;
