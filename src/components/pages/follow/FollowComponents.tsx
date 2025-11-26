// src/components/FollowComponents.tsx
"use client";

import image from "@/assets/images/Diapers.png";
import FollowCard from "@/components/ui/cards/FollowCard";
import PageHeader from "@/components/ui/heading/PageHeader";
import { useEffect, useState } from "react";

const FollowComponents = () => {
	const data = [
		{
			id: 1,
			image: image,
			title: "Подгузники",
			status: "В обработке",
			suspended: "Подписка приостановлена",
			diapers: 50,
			panties: 50,
			payment: "Finik",
			address: "Горького 1/2",
			next_delivery: "17.10.2025 до 15:00",
			old_price: 600,
			new_price: 500,
		},
		{
			id: 2,
			image: image,
			title: "Салфетки",
			suspended: "",
			status: "В пути",
			diapers: 50,
			panties: 50,
			payment: "Finik",
			address: "Горького 1/2",
			next_delivery: "17.10.2025 до 15:00",
			old_price: 600,
			new_price: 500,
		},
		{
			id: 3,
			image: image,
			title: "Трусики",
			suspended: "",
			status: "В пути",
			diapers: 50,
			panties: 50,
			payment: "Finik",
			address: "Горького 1/2",
			next_delivery: "17.10.2025 до 15:00",
			old_price: 600,
			new_price: 500,
		},
	];

	const [openMenuId, setOpenMenuId] = useState<number | null>(null);

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

	const toggleMenu = (id: number) => {
		setOpenMenuId(openMenuId === id ? null : id);
	};

	const handleAction = (action: string, itemId: number) => {
		console.log(`Действие: ${action}, ID: ${itemId}`);
		setOpenMenuId(null);
	};

	return (
		<section>
			<PageHeader
				title="Мои подписки"
				description="Экономьте до 25% с нашими пакетами"
			/>

			<div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4">
				{data.map((el) => (
					<FollowCard
						key={el.id}
						data={el}
						isOpenMenu={openMenuId === el.id}
						onToggleMenu={toggleMenu}
						onAction={handleAction}
					/>
				))}
			</div>
		</section>
	);
};

export default FollowComponents;
