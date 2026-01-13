// src/components/FollowComponents.tsx
"use client";

import image from "@/assets/images/Diapers.png";
import FollowCard from "@/components/ui/cards/FollowCard";
import PageHeader from "@/components/ui/heading/PageHeader";
import { useSubscriptions } from "@/redux/hooks/useSubscriptions";
import { useEffect, useState } from "react";

const FollowComponents = () => {

	// const [openMenuId, setOpenMenuId] = useState<number | null>(null);

	const { subscriptions, isLoading } = useSubscriptions();

	console.log(subscriptions,"subscriptions");
	
	if (isLoading) return <div>Загрузка...</div>;

	// useEffect(() => {
	// 	const handleClickOutside = (e: MouseEvent) => {
	// 		const target = e.target as HTMLElement;
	// 		if (
	// 			target.closest('[data-menu-trigger="true"]') ||
	// 			target.closest('[data-menu-content="true"]')
	// 		) {
	// 			return;
	// 		}
	// 		setOpenMenuId(null);
	// 	};

	// 	document.addEventListener("click", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("click", handleClickOutside);
	// 	};
	// }, []);

	// const toggleMenu = (id: number) => {
	// 	setOpenMenuId(openMenuId === id ? null : id);
	// };

	// const handleAction = (action: string, itemId: number) => {
	// 	console.log(`Действие: ${action}, ID: ${itemId}`);
	// 	setOpenMenuId(null);
	// };

	return (
		<section>
			{/* <PageHeader
				title="Мои подписки"
				description="Экономьте до 25% с нашими пакетами"
			/>

			<div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4">
				{data
					? [data].map((el) => (
							<FollowCard
								key={el.id}
								data={el}
								isOpenMenu={openMenuId === el.id}
								onToggleMenu={toggleMenu}
								onAction={handleAction}
							/>
					  ))
					: null}
			</div> */}

<div>
			<h2>Мои подписки</h2>
			{subscriptions.length === 0 ? (
				<p>У вас нет активных подписок</p>
			) : (
				subscriptions.map((sub) => (
					<div key={sub.id} className="border p-4 mb-3">
						<p>Адрес: {sub.address}</p>
						<p>Сумма: {sub.total_amount} сом</p>
						<p>Статус: {sub.status}</p>
						<p>Создано: {new Date(sub.created_at).toLocaleDateString("ru-RU")}</p>
					</div>
				))
			)}
		</div>
		</section>
	);
};

export default FollowComponents;
