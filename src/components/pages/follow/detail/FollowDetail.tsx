"use client";
import { Title } from "@/components/ui/text/Title";
import Button from "@/components/ui/button/Button";
import { FiEdit2 } from "react-icons/fi";
import { Description } from "@/components/ui/text/Description";
import LogoTransparent from "@/assets/svg/logo-transparent";
import Image from "next/image";
import img from "@/assets/images/kits.png";
import { useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { TitleComponent } from "@/components/ui/text/TitleComponent";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import FollowDetailModals from "./FollowDetailModals";
import LinkButton from "@/components/ui/button/LinkButton";
import { useParams } from "next/navigation";
import {
	useSubscriptionById,
	useResumeSubscription,
	useDeleteSubscription,
} from "@/redux/hooks/useSubscriptions"; // Добавлен хук resume
import FollowItem from "./FollowItem";

const FollowDetail = () => {
	const params = useParams();
	const subId = params.id as string;

	const { data: response, isLoading } = useSubscriptionById(subId);
	const sub = response?.detail;

	// Хук разморозки
	const { mutate: resume, isPending: isResuming } = useResumeSubscription();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalFreezeOpen, setIsModalFreezeOpen] = useState(false);
	const [isSelectWeek, setIsSelectWeek] = useState(false);
	const [isModalDateOpen, setIsModalDateOpen] = useState(false);
	const [isPay, setIsPay] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Добавили стейт
	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [deliveryFrequency, setDeliveryFrequency] =
		useState<string>("biweekly");

	const { mutate: deleteSub } = useDeleteSubscription();

	const handleDelete = () => {
		deleteSub(subId);
	};

	if (isLoading)
		return <div className="p-10 text-center">Загрузка подписки...</div>;
	if (!sub) return <div className="p-10 text-center">Подписка не найдена</div>;

	const createdAtDate = new Date(sub.created_at).toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	const nextDelivery = sub.next_delivery_date
		? new Date(sub.next_delivery_date).toLocaleDateString("ru-RU")
		: "Не назначена";

	const isPaused = sub.status?.toLowerCase() === "paused";

	const handleFreezeToggle = () => {
		if (isPaused) {
			resume(subId);
		} else {
			setIsModalFreezeOpen(true);
		}
	};

	return (
		<section className="">
			<PageHeader
				href={PAGE.FOLLOW}
				description="Подписка"
				title="Подгузники+салфетки"
			/>
			<div className="flex flex-col gap-4 p-4">
				{sub.status === "frozen" && (
					<div className="border border-[#E4E4E7] rounded-[16px] flex items-center gap-2 p-4 bg-[#f9f9f9]">
						<Description>
							<IoMdInformationCircleOutline size={24} />
						</Description>
						<Description>
							Ваша подписка заморожена. <br /> Вы можете разморозить её в любое
							время.
						</Description>
					</div>
				)}

				<div className="border border-[#E4E4E7] bg-[#FFF3E0] flex justify-between items-center rounded-[8px] w-full h-[170px] overflow-hidden">
					<div className="flex flex-col justify-between items-start gap-6 m-4">
						<div className="flex flex-col gap-2">
							<Description className="font-[600]">
								Подгузники+салфетки
							</Description>
							<div className="flex items-center gap-2">
								<LogoTransparent />
								<Description>Оформлено {createdAtDate}</Description>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<Description className="font-[600]">Сэкономлено:</Description>
							<Title className="text-[#0171E3]">5000 с</Title>
						</div>
					</div>
					<div className="relative object-cover rounded-tr-[8px] w-[119px] h-[250px] rounded-br-[8px]">
						<Image fill objectFit="cover" src={img} alt="img" />
					</div>
				</div>

				{/* Инфо-карточки */}
				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Следующая доставка:</Description>
							<Title className="font-[700]">{nextDelivery}</Title>
						</div>
					</div>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Частота доставки:</Description>
							<Title className="font-[700]">{sub.frequency?.label}</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsSelectWeek(true)}
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Адрес доставки</Description>
							<Title className="font-[700]">
								{sub.city?.name}, {sub.street}
							</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsModalOpen(true)}
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				{/* Главная кнопка заморозки/разморозки */}
				<Button onClick={handleFreezeToggle} disabled={isResuming}>
					{isResuming
						? "Обработка..."
						: isPaused
						? "Разморозить подписку"
						: "Заморозить подписку"}
				</Button>

				<div className="w-full flex gap-3">
					<LinkButton
						href={`${PAGE.HISTORY_DELIVERY}/${subId}`}
						className="!bg-white border border-[#E4E4E7] !text-black w-full !px-4">
						История доставок
					</LinkButton>
					<LinkButton
						href={`${PAGE.HISTORY_PAYMENT}/${subId}`}
						className="!bg-white border border-[#E4E4E7] !text-black w-full !px-4">
						История оплат
					</LinkButton>
				</div>

				<Button className="!bg-white border border-[#E4E4E7] !text-black w-full">
					Пропустить следующую доставку
				</Button>

				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<div className="flex flex-col gap-1">
							<Description>Способ оплаты</Description>
							<Title className="font-[700]">{sub.payment_method}</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsPay(true)}
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				<FollowItem sub={sub} />

				<div className="border flex justify-between items-center border-[#E4E4E7] bg-white rounded-[8px] p-4 mb-10">
					<Title>Итого:</Title>
					<Title>{sub.total_amount} с</Title>
				</div>

				<Button
					onClick={() => setIsDeleteModalOpen(true)}
					className="w-full !bg-red-500 !text-white">
					Удалить подписку
				</Button>

				<FollowDetailModals
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					isModalFreezeOpen={isModalFreezeOpen}
					setIsModalFreezeOpen={setIsModalFreezeOpen}
					isModalDateOpen={isModalDateOpen}
					setIsModalDateOpen={setIsModalDateOpen}
					isSelectWeek={isSelectWeek}
					setIsSelectWeek={setIsSelectWeek}
					isPay={isPay}
					setIsPay={setIsPay}
					birthDate={birthDate}
					setBirthDate={setBirthDate}
					deliveryFrequency={deliveryFrequency}
					setDeliveryFrequency={setDeliveryFrequency}
					subId={subId}
					sub={sub}
					isDeleteModalOpen={isDeleteModalOpen}
					setIsDeleteModalOpen={setIsDeleteModalOpen}
					handleDelete={handleDelete}
				/>
			</div>
		</section>
	);
};

export default FollowDetail;
