"use client";

import { Title } from "@/components/ui/text/Title";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

interface OrdersCardProps {
	data: any; // Соответствует интерфейсу Detail из вашего API
}

const OrdersCard = ({ data }: OrdersCardProps) => {
	const getStatusStyles = (status: string) => {
		switch (status) {
			case "delivered":
			case "completed":
			case "active":
				return "text-[#027A48] border-[#ABE4B8] bg-[#ECFDF3]";
			case "pending":
			case "processing":
			case "in_process":
				return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
			case "cancelled":
				return "text-[#B42318] border-[#FDA29B] bg-[#FEF3F2]";
			default:
				return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
		}
	};

	const statusLabels: Record<string, string> = {
		active: "Активен",
		pending: "Ожидание",
		in_process:"В обработке",
		completed: "Выполнен",
		delivered: "Доставлен",
		processing: "В обработке",
		cancelled: "Отменен",
	};

	return (
		<Link
			href={`/my-orders/${data.id}`}
			className="border border-[#E4E4E7] rounded-[16px] p-4 bg-white w-full relative block hover:shadow-sm transition-shadow">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b pb-3 border-[#E4E4E7]">
				<Title className="!text-[18px] font-[700]">Заказ №{data.id}</Title>
				<div className="p-2 rounded-[5px] border border-[#E4E4E7] bg-gray-50">
					<GoArrowUpRight className="text-gray-500" />
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-2 mt-3">
				{/* Статус */}
				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Статус:</Title>
					<span
						className={`rounded-full py-0.5 px-3 border text-[12px] font-medium ${getStatusStyles(
							data.status
						)}`}>
						{statusLabels[data.status] || data.status}
					</span>
				</div>

				{/* Дата создания */}
				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Дата заказа:</Title>
					<Title className="text-[14px]">
						{data.created_at
							? new Date(data.created_at).toLocaleDateString("ru-RU")
							: "—"}
					</Title>
				</div>

				{/* Список товаров (кратко) */}
				<div className="flex flex-col gap-2 py-1">
					{data.items?.map((item: any, index: number) => (
						<div key={index} className="flex justify-between  ">
							<Title className="text-[13px] text-gray-600">
								{item.product_title}, {item.variant_title}
							</Title>
							<Title className="text-[13px] font-medium">
								{item.quantity} шт. - {item.price} с
							</Title>
						</div>
					))}
				</div>

				{/* Адрес (используем поле address из вашего интерфейса Detail) */}
				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Адрес:</Title>
					<Title className="text-[14px] truncate max-w-[180px]">
						{data.address || "Самовывоз / Не указан"}
					</Title>
				</div>

				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Способ оплаты:</Title>
					<Title className="text-[14px] truncate max-w-[180px]">
						{data.payment_method}
					</Title>
				</div>

				<div className="flex justify-between items-center">
					<Title className="text-[13px] text-gray-600">Сумма:</Title>
					<Title className="text-[14px] font-[400]">
						{data.items
							?.reduce(
								(acc: number, item: any) =>
									acc + Number(item.price) * item.quantity,
								0
							)
							.toLocaleString()}{" "}
						сом
					</Title>
				</div>
			</div>
		</Link>
	);
};

export default OrdersCard;
