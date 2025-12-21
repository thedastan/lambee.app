"use client";
import img from "@/assets/images/Panties.png";
import { SubscriptionCard } from "@/components/ui/cards/SubscriptionCard";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useEffect, useState } from "react";

const FollowCardHome = () => {
	const data = [
		{
			id: 0,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			
		},
		{
			id: 1,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
		
		},
		{
			id: 2,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			
		},
		{
			id: 3,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
		},
		{
			id: 4,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
		},
		{
			id: 5,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
		},
		{
			id: 6,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
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
				className="flex items-start gap-3   h-[180px] mt-3 overflow-x-auto scrollbar-hide  md:pl-[calc((100%-96%)/3)] md:pr-[calc((100%-96%)/3)]   pl-[calc((100%-90%)/3)] pr-[calc((100%-90%)/3)]">
				{data.map((item) => (
					<SubscriptionCard
						key={item.id}
						{...item}
						onToggleMenu={toggleMenu}
						onAction={handleAction}
					/>
				))}
			</div>
		</section>
	);
};

export default FollowCardHome;
