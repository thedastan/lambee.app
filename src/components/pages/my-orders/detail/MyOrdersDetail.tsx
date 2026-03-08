"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";

import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import PageHeader from "@/components/ui/heading/PageHeader";
import Modal from "@/components/ui/modal/Modal";
import Input from "@/components/ui/input/Input";
import LogoTransparent from "@/assets/svg/logo-transparent";

import { PAGE } from "@/config/pages/public-page.config";
import { useOrderById, useUpdateOrder } from "@/redux/hooks/useOrders";

const MyOrdersDetail = () => {
	const params = useParams();
	const orderId = params.id as string;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [street, setStreet] = useState("");

	// Получаем данные
	const { data: response, isLoading } = useOrderById(orderId);
	const order = response?.data?.detail;

	// Мутация для PATCH запроса
	const { mutate: updateOrder, isPending: isUpdating } = useUpdateOrder();

	// Синхронизируем локальный стейт адреса при загрузке данных
	useEffect(() => {
		if (order?.address) {
			// Убираем "Бишкек, " из строки, если бэкенд его присылает,
			// чтобы пользователь редактировал только улицу
			const cleanStreet = order.address
				.replace(/^Бишкек,\s*/gi, "")
				.replace(/^Бишкек,\s*/gi, "");
			setStreet(cleanStreet);
		}
	}, [order]);

	const handleSaveAddress = () => {
		updateOrder(
			{
				id: orderId,
				payload: {
					city_id: 1, // Замените на реальный ID города из данных, если необходимо
					street: street,
				},
			},
			{
				onSuccess: () => {
					setIsModalOpen(false);
				},
			}
		);
	};

	const getStatusStyles = (status: string) => {
		switch (status) {
			case "active":
			case "in_process":
				return "text-[#B54708] border-[#FEDF89] bg-[#FFFAEB]";
			case "completed":
				return "text-[#027A48] border-[#ABE4B8] bg-[#ECFDF3]";
			default:
				return "text-gray-600 border-gray-300 bg-gray-100";
		}
	};

	const statusLabels: Record<string, string> = {
		in_process: "В обработке",
		completed: "Завершен",
		pending: "Ожидание",
		active: "Активен",
	};

	if (isLoading)
		return (
			<div>
				<div className="animate-pulse">
					<div className="p-4 border-b border-[#E4E4E7] h-[60px] bg-[#ffffff] mb-4" />
					<div className="p-4 flex flex-col gap-6">
						<div className="h-4 w-48 bg-gray-200 rounded" />
						<div className="h-6 w-32 bg-gray-200 rounded mt-2" />
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{[1, 2].map((i) => (
								<div
									key={i}
									className="border border-[#E4E4E7] rounded-[8px] p-4 flex gap-3">
									<div className="w-[92px] h-[92px] bg-gray-200 rounded-[8px]" />
									<div className="flex flex-col gap-2 flex-1">
										<div className="h-4 w-3/4 bg-gray-200 rounded" />
										<div className="h-3 w-1/2 bg-gray-200 rounded" />
										<div className="h-4 w-1/4 bg-gray-200 rounded mt-auto" />
									</div>
								</div>
							))}
						</div>
						<div className="h-16 w-full bg-gray-100 rounded-[8px]" />
						<div className="flex gap-4 w-full">
							<div className="h-20 w-full bg-gray-100 rounded-[16px]" />
							<div className="h-20 w-full bg-gray-100 rounded-[16px]" />
						</div>
						<div className="h-20 w-full bg-gray-100 rounded-[16px]" />
						<div className="h-20 w-full bg-gray-100 rounded-[16px]" />
					</div>
				</div>
			</div>
		);

	if (!order) return <div className="p-10 text-center">Заказ не найден</div>;

	return (
		<div>
			<PageHeader
				href={PAGE.MYORDERS}
				description={
					order.type === "one_time" ? "Разовый заказ" : "Подписочный заказ"
				}
				title={`Заказ #${order.id}`}
			/>

			<div className="p-4 flex flex-col gap-4">
				<Title className="flex items-center gap-2 !text-[14px] text-[#515151]">
					<LogoTransparent />
					Оформлено{" "}
					{new Date(order.created_at).toLocaleDateString("ru-RU", {
						day: "numeric",
						month: "long",
						year: "numeric",
					})}
				</Title>

				<TitleComponent className="font-bold">
					Что входит в заказ
				</TitleComponent>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{order.items?.map((item: any, index: number) => (
						<div
							key={index}
							className="border flex justify-between items-start border-[#E4E4E7] bg-white rounded-[8px] p-4">
							<div className="flex items-center gap-3">
								<div className="w-[92px] h-[92px] rounded-[8px] overflow-hidden relative border border-gray-50">
									<Image
										fill
										style={{ objectFit: "cover" }}
										src={item.variant_image}
										alt="product"
									/>
								</div>
								<div className="flex flex-col gap-1">
									<Title className="!text-[16px]">{item.product_title}</Title>
									<Description className="text-[#515151]">
										Размер: {item.variant_title}
									</Description>
									<Title className="!text-[16px]">{item.price} сом</Title>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="border flex justify-between items-center border-[#E4E4E7] bg-white rounded-[8px] p-4">
					<Title className="font-normal">Итого:</Title>
					<Title className="font-normal text-[#1D1D1F]">
						{order.items?.reduce(
							(acc: number, item: any) => acc + item.price * item.quantity,
							0
						)}{" "}
						сом
					</Title>
				</div>

				<div className="flex gap-4 w-full">
					<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4 w-full">
						<div className="flex gap-3 items-center">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Дата оформления:
								</Description>
								<Title className="font-[400]">
									{new Date(order.created_at).toLocaleDateString("ru-RU")}
								</Title>
							</div>
						</div>
					</div>

					<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4 w-full">
						<div className="flex gap-3 items-center">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">Статус:</Description>
								<Title
									className={`text-[12px] rounded-full px-3 py-1 border font-medium ${getStatusStyles(
										order.status
									)}`}>
									{statusLabels[order.status] || order.status}
								</Title>
							</div>
						</div>
					</div>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description className="text-[#515151]">
								Способ оплаты
							</Description>
							<Title className="font-[400] capitalize">
								{order.payment_method}
							</Title>
						</div>
					</div>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description className="text-[#515151]">
								Адрес доставки
							</Description>
							<Title className="font-[400]">
								{order.address || "Не указан"}
							</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsModalOpen(true)}
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<Input
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						label={
							<>
								Введите адрес <span className="text-[#FFA655]">*</span>
							</>
						}
						placeholder="Название улицы, дом, квартира" // Добавили плейсхолдер для ясности
					/>
					<div className="border-[#E4E4E7] border-b w-full h-[1px]" />
					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button
							className="w-full"
							onClick={handleSaveAddress}
							disabled={isUpdating}>
							{isUpdating ? "Сохранение..." : "Сохранить"}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default MyOrdersDetail;
