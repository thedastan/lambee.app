"use client";

import { Title } from "@/components/ui/text/Title";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

interface FollowCardProps {
	data: any;
}

const FollowCard = ({ data }: FollowCardProps) => {
	const getStatusStyles = (status: string) => {
		switch (status) {
			case "active":
				return "text-[#027A48] border-[#ABE4B8] bg-[#ECFDF3]";
			case "pending":
				return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
			case "finished":
				return "text-[#344054] border-[#D0D5DD] bg-[#F9FAFB]";
			case "cancelled":
				return "text-[#B42318] border-[#FDA29B] bg-[#FEF3F2]";
			default:
				return "text-gray-600 border-gray-300 bg-gray-100";
		}
	};

	const statusLabels: Record<string, string> = {
		active: "Активна",
		pending: "В ожидании",
		finished: "Завершена",
		processing: "Обработка",
		cancelled: "Отменена",
	};

	const paymentMethods: Record<string, string> = {
		finik: "Finik Pay",
		balance: "Баланс Lambee",
		bonus: "Бонусы",
	};

	return (
		<Link
			href={`/follow/${data.id}`}
			className="border border-[#E4E4E7] rounded-[16px] p-4 bg-white w-full relative block hover:shadow-sm transition-shadow">
			{data.items.slice(0,1).map((item: any, index: number) => (
				<div className="flex items-center justify-between gap-2 border-b pb-3 border-[#E4E4E7]">
					<div className="flex items-center gap-2">
						<div className=" relative w-[40px] h-[40px]">
							<Image
								fill
								objectFit="cover"
								src={item.variant_image}
								alt="img"
							/>
						</div>
						<Title className="!text-[18px] font-[700]">
							{item.product_title}
						</Title>
					</div>
					<div className="p-2 rounded-[5px] border border-[#E4E4E7] bg-gray-50">
						<GoArrowUpRight className="text-gray-500" />
					</div>
				</div>
			))}

			<div className="flex flex-col gap-2 mt-3">
				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Статус:</Title>
					<span
						className={`rounded-full py-0.5 px-3 border text-[12px] font-medium ${getStatusStyles(
							data.status
						)}`}>
						{statusLabels[data.status] || data.status}
					</span>
				</div>

				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Частота:</Title>
					<Title className="text-[14px]">
						{data.frequency?.label || "Не указана"}
					</Title>
				</div>

				{data.items?.map((item: any, index: number) => (
					<div key={index} className="flex items-center justify-between">
						<Title className="text-[14px] text-[#515151]">
							{item.product_title}, {item.variant_title}
						</Title>
						<Title className="text-[14px] font-medium">
							{item.quantity} шт
						</Title>
					</div>
				))}

				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Способ оплаты:</Title>
					<Title className="text-[14px]">
						{paymentMethods[data.payment_method] || data.payment_method}
					</Title>
				</div>

				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Адрес доставки:</Title>
					<Title className="text-[14px] truncate max-w-[180px]">
						{data.city?.name}, {data.street}
					</Title>
				</div>

				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">
						Следующая доставка:
					</Title>
					<Title className="text-[14px] font-medium">
						{data.next_delivery_date
							? new Date(data.next_delivery_date).toLocaleDateString("ru-RU")
							: "Не назначена"}
					</Title>
				</div>

				<div className="flex items-center justify-between">
					<Title className="text-[#515151] text-[14px]">Общая сумма:</Title>
					<Title className="font-[700] text-[#0071E3] text-[16px]">
						{Number(data.total_amount).toLocaleString()} сом
					</Title>
				</div>
			</div>
		</Link>
	);
};

export default FollowCard;
