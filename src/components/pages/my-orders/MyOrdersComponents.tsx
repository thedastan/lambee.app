"use client";
import React, { useEffect, useState } from "react";
import image from "@/assets/images/Diapers.png";
import FollowCard from "@/components/ui/cards/FollowCard";
import OrdersCard from "@/components/ui/cards/OrdersCard copy";
import Button from "@/components/ui/button/Button";
import SearchInput from "@/components/ui/input/SearchInput";
import FilterMenu from "@/components/ui/button/FilterMenu";
import PageHeader from "@/components/ui/heading/PageHeader";
 

const MyOrdersComponents = () => {
	const follow = [
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

	const urgent_orders = [
		{
			id: 1,
			title: "Подгузники",
			status: "В обработке",
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
			title: "Салфетки",
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
			title: "Трусики",
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

	// ✅ Состояние для активной вкладки
	const [activeTab, setActiveTab] = useState<"urgent" | "follow">("urgent");

	// Состояние для меню (общее для всех карточек)
	const [openMenuId, setOpenMenuId] = useState<number | null>(null);

	// Закрытие меню при клике вне
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
				title="Мои заказы"
				description="Здесь вы можете посмотреть ваши заказы"
			/>

			<div className="p-4">
				<div className="bg-white flex justify-between items-center w-full rounded-[8px]">
					<Button
						className={`w-full py-3 rounded-[8px] font-medium transition-all duration-300 ease-in-out ${
							activeTab === "urgent" ? " " : "!bg-white !text-[#1D1D1F] "
						}`}
						onClick={() => setActiveTab("urgent")}>
						Срочные
					</Button>
					<Button
						className={`w-full py-3 rounded-[8px] font-medium transition-all duration-300 ease-in-out ${
							activeTab === "follow" ? " " : " !bg-white !text-[#1D1D1F]  "
						}`}
						onClick={() => setActiveTab("follow")}>
						Подписочные
					</Button>
				</div>

				<div className="flex gap-3 py-6">
					<SearchInput placeholder="Поиск" />

					<FilterMenu />
				</div>

				<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
					{activeTab === "urgent"
						? urgent_orders.map((el) => (
								<OrdersCard
									key={el.id}
									data={el}
									isOpenMenu={openMenuId === el.id}
									onToggleMenu={toggleMenu}
									onAction={handleAction}
								/>
						  ))
						: follow.map((el) => (
								<FollowCard
									key={el.id}
									data={el}
									isOpenMenu={openMenuId === el.id}
									onToggleMenu={toggleMenu}
									onAction={handleAction}
								/>
						  ))}
				</div>
			</div>
		</section>
	);
};

export default MyOrdersComponents;
