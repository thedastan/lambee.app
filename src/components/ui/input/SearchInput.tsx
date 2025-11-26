// components/SearchInput.tsx
import React, { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
	placeholder = "Поиск",
	className,
	...props
}) => {
	return (
		<div className="relative flex items-center w-full">
			<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-[#70707B]">
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.35-4.35" />
				</svg>
			</div>
			<input
				type="text"
				placeholder={placeholder}
				className={`w-full pl-10 pr-4  h-[40px] rounded-[8px] border border-[#E4E4E7]  outline-none     placeholder:text-gray-500 text-[#70707B] ${className}`}
				{...props}
			/>
		</div>
	);
};

export default SearchInput;
