"use client";
import React, { useState, useMemo } from "react";
import OrdersCard from "@/components/ui/cards/OrdersCard";
import Button from "@/components/ui/button/Button";
import SearchInput from "@/components/ui/input/SearchInput";
import FilterMenu from "@/components/ui/button/FilterMenu";
import PageHeader from "@/components/ui/heading/PageHeader";
import { useOrders } from "@/redux/hooks/useOrders";

const MyOrdersComponents = () => {
	const [activeTab, setActiveTab] = useState<"urgent" | "follow">("urgent");

	// Состояния для фильтрации
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState<"future" | "delivered">(
		"future"
	);

	const { data: response, isLoading } = useOrders();

	// Функция фильтрации
	const getFilteredData = (type: "one_time" | "subscription") => {
		const baseOrders =
			response?.data?.detail?.filter((order) => order.type === type) || [];

		return baseOrders.filter((order) => {
			// 1. Поиск по ID или Адресу
			const matchesSearch =
				order.id.toString().includes(searchQuery) ||
				(order.address &&
					order.address.toLowerCase().includes(searchQuery.toLowerCase()));

			// 2. Фильтр по статусу (completed считается доставленным)
			const isCompleted = order.status === "completed";
			const matchesStatus =
				statusFilter === "delivered" ? isCompleted : !isCompleted;

			return matchesSearch && matchesStatus;
		});
	};

	const urgentOrders = useMemo(
		() => getFilteredData("one_time"),
		[response, searchQuery, statusFilter]
	);
	const subscriptionOrders = useMemo(
		() => getFilteredData("subscription"),
		[response, searchQuery, statusFilter]
	);

	if (isLoading) {
		return (
			<section>
				<PageHeader
					title="Мои заказы"
					description="Здесь вы можете посмотреть ваши заказы"
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5">
					{Array.from({ length: 3 }).map((_, i) => (
						<div
							key={i}
							className="p-3 bg-white border border-[#E4E4E7] w-full h-[300px] rounded-[16px] animate-pulse">
							<div className="h-full bg-gray-50 rounded-[8px]" />
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section>
			<PageHeader
				title="Мои заказы"
				description="Здесь вы можете посмотреть ваши заказы"
			/>

			<div className="p-4">
				{/* Табы */}
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

				{/* Поиск и фильтры */}
				<div className="flex gap-3 py-6">
					<SearchInput
						placeholder="Поиск по номеру или адресу"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<FilterMenu
						currentFilter={statusFilter}
						onFilterChange={(val) => setStatusFilter(val)}
					/>
				</div>

				{/* Список карточек */}
				<div className="grid md:grid-cols-3 grid-cols-1 gap-4">
					{(activeTab === "urgent" ? urgentOrders : subscriptionOrders).length >
					0 ? (
						(activeTab === "urgent" ? urgentOrders : subscriptionOrders).map(
							(item) => <OrdersCard key={item.id} data={item} />
						)
					) : (
						<div className="col-span-full text-center py-20 text-gray-400">
							По вашему запросу ничего не найдено
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default MyOrdersComponents;
