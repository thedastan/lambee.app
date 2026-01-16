// src/app/(main)/payment/payment-forma/DeliveryDatePicker.tsx
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DeliveryDatePickerProps {
	index: number;
	date: string | null;
	onChange: (index: number, date: Date | null) => void;
	minDate: Date;
	frequency: "weekly" | "biweekly" | "triweekly" | "monthly" | null;
}

export default function DeliveryDatePicker({
	index,
	date,
	onChange,
	minDate,
	frequency,
}: DeliveryDatePickerProps) {
	let label = "Дата первой доставки *";
	if (frequency === "monthly" || frequency === "triweekly" || frequency === "biweekly") {
		label = `Дата доставки — Неделя ${index + 1} *`;
	}

	return (
		<div className="mb-3  ">
			<label className="block text-[14px] font-medium text-[#515151]">{label}</label>
			<DatePicker
				selected={date ? new Date(date) : null}
				onChange={(d) => onChange(index, d)}
				minDate={minDate}
				dateFormat="dd.MM.yyyy"
				calendarClassName="custom-calendar"
				className="w-full   h-[48px] px-4 mt-2 rounded-[8px] border border-[#E4E4E7] outline-none"
				placeholderText="Выберите дату"
			/>
		</div>
	);
}