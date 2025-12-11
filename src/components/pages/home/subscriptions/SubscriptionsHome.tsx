"use client";
import img from "@/assets/images/Panties.png";
import { SubscriptionCard } from "@/components/ui/cards/SubscriptionCard";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useEffect, useState } from "react";

const SubscriptionsHome = () => {
	const data = [
		{
			id: 0,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id: 1,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: true,
		},
		{
			id: 2,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: true,
		},
		{
			id: 3,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id: 4,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id: 5,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id: 6,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
	];

	const [openMenuId, setOpenMenuId] = useState<number | null>(null);

	const toggleMenu = (id: number) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	const handleAction = (action: string, itemId: number) => {
		console.log(`Действие: ${action}, ID: ${itemId}`);
		setOpenMenuId(null);
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				target.closest('[data-menu-trigger="true"]') ||
				target.closest('[data-menu-content="true"]')
			) {
				return;
			}
			setOpenMenuId(null);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<section className="pb-6">
			<TitleComponent className="px-4">Ваши подписки</TitleComponent>
			<div
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				className="flex items-start gap-3   h-[310px] mt-3 overflow-x-auto scrollbar-hide   pl-[calc((100%-90%)/3)] pr-[calc((100%-90%)/3)]">
				{data.map((item) => (
					<SubscriptionCard
						key={item.id}
						{...item}
						isOpenMenu={openMenuId === item.id}
						onToggleMenu={toggleMenu}
						onAction={handleAction}
					/>
				))}
			</div>
		</section>
	);
};

export default SubscriptionsHome;
