// src/components/ui/cards/FollowCard.tsx
"use client";

import { Title } from "@/components/ui/text/Title";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import ActionMenuButton from "../button/ActionMenuButton";
import { Description } from "../text/Description";

interface FollowCardProps {
	data: {
		id: number;
		image: string | StaticImageData;
		title: string;
		suspended: string;
		status: string;
		diapers: number;
		panties: number;
		payment: string;
		address: string;
		next_delivery: string;
		old_price: number;
		new_price: number;
	};
	isOpenMenu: boolean;
	onToggleMenu: (id: number) => void;
	onAction: (action: string, id: number) => void;
}

const FollowCard = ({
	data,
	isOpenMenu,
	onToggleMenu,
	onAction,
}: FollowCardProps) => {
	const handleToggle = () => {
		onToggleMenu(data.id);
	};

	const handleAction = (action: string) => {
		onAction(action, data.id);
	};

	const getStatusBadgeClass = (status: string) => {
		switch (status) {
			case "В обработке":
				return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
			case "В пути":
				return "text-[#0071E3] border-[#B5D5FF] bg-[#E6F0FF]";
			default:
				return "text-gray-600 border-gray-300 bg-gray-100";
		}
	};

	return (
		<Link
			href="/follow/detail"
			className="border border-[#E4E4E7] rounded-[16px] p-4 bg-white w-full relative block">
			{/* Header */}
			<div className="flex items-center justify-between gap-2 border-b pb-3 border-[#E4E4E7]">
				<div className="flex w-full   h-[45px] gap-3 items-center">
					<div className="relative w-[40px] h-[40px] overflow-hidden rounded-[8px]">
						<Image
							fill
							className="object-cover rounded-[8px]"
							src={data.image}
							alt={data.title}
						/>
					</div>

					<div className="">
						<Title className="!text-[20px] font-[700]">{data.title}</Title>
						<Description className="text-[#515151]">
							{data.suspended}
						</Description>
					</div>
				</div>

				{/* ✅ Вынесено в отдельный компонент */}
				<ActionMenuButton
					isOpen={isOpenMenu}
					onToggle={handleToggle}
					onAction={handleAction}
				/>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-4 mt-3">
				<div className="flex items-center justify-between">
					<Title className="text-[#515151]">Статус:</Title>
					<Title
						className={`rounded-full p-1 px-3 border ${getStatusBadgeClass(
							data.status
						)}`}>
						{data.status}
					</Title>
				</div>
				<div className="flex items-center justify-between">
					<Title>Подгузники, M4</Title>
					<Title>{data.diapers} шт</Title>
				</div>
				<div className="flex items-center justify-between">
					<Title>Трусики, M1</Title>
					<Title>{data.panties} шт</Title>
				</div>
				<div className="flex items-center justify-between">
					<Title>Способ оплаты:</Title>
					<Title>{data.payment}</Title>
				</div>
				<div className="flex items-center justify-between">
					<Title>Адрес доставки:</Title>
					<Title>{data.address}</Title>
				</div>
				<div className="flex items-center justify-between">
					<Title>
						Следующая <br /> доставка:
					</Title>
					<Title className="w-full max-w-[100px] text-end">
						{data.next_delivery}
					</Title>
				</div>
				<div className="flex items-center justify-between">
					<Title>Общая сумма:</Title>
					<Title className="flex gap-3">
						<span className="line-through">{data.old_price}c</span>
						<span className="text-[#0071E3] font-[600]">{data.new_price}c</span>
					</Title>
				</div>
			</div>
		</Link>
	);
};

export default FollowCard;
