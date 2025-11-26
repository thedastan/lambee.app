"use client";
import { Title } from "@/components/ui/text/Title";
import Button from "@/components/ui/button/Button";
import { FiEdit2 } from "react-icons/fi";
import { Description } from "@/components/ui/text/Description";
import LogoTransparent from "@/assets/svg/logo-transparent";
import Image from "next/image";
import img from "@/assets/images/kits.png";
import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { IoMdInformationCircleOutline } from "react-icons/io";

import image from "@/assets/images/Diapers.png";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { PiPauseCircleLight } from "react-icons/pi";

const FollowDetail = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalFreezeOpen, setIsModalFreezeOpen] = useState(false);

	const [selectedAddress, setSelectedAddress] = useState<string>("");



	const addresses = [
		{
			id: "gorokogo",
			label: "Горького 1/2",
		},
		{
			id: "fuchika",
			label: "Фучика 24",
		},
	];

	const data = [
		{
			img: image,
			title: "Подгузники 25 шт",
			text: "Размер: M",
			price: 1000,
		},
		{
			img: image,
			title: "Подгузники 25 шт",
			text: "Размер: M",
			price: 1000,
		},
	];

	return (
		<section className="flex flex-col gap-4 p-4">
			<div className="border border-[#E4E4E7]   rounded-[16px] flex items-center gap-2 p-4">
				<Description>
					<IoMdInformationCircleOutline size={24} />
				</Description>
				<Description>
					Ваша подписка заморожена до 27 ноября. <br /> Вы можете разморозить в
					любое время
				</Description>
			</div>

			<div className="border border-[#E4E4E7] bg-[#FFF3E0] flex justify-between items-center rounded-[8px] w-full h-[170px] overflow-hidden">
				<div className="flex flex-col justify-between items-start gap-6 m-4">
					<div className="flex flex-col gap-2">
						<Description className="font-[600]">
							Подгузники+салфетки
						</Description>
						<div className="flex items-center gap-2">
							<LogoTransparent />
							<Description>Оформлено 23 октября 2025</Description>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Description className="font-[600]">Сэкономлено:</Description>
						<Title className="text-[#0171E3]">5000 с</Title>
					</div>
				</div>

				<div className=" relative object-cover rounded-tr-[8px] w-[119px] h-[250px] rounded-br-[8px]">
					<Image fill objectFit="cover" src={img} alt="img" />
				</div>
			</div>

			<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
				<div className="flex gap-3 items-center">
					<div className="flex flex-col gap-1">
						<Description>Следующая доставка:</Description>
						<Title className="font-[700]">12.10.2025</Title>
					</div>
				</div>
				<Button
					onClick={() => setIsModalOpen(true)}
					className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
					<FiEdit2 />
				</Button>
			</div>

			<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
				<div className="flex gap-3 items-center">
					<div className="flex flex-col gap-1">
						<Description>Частота доставки:</Description>
						<Title className="font-[700]">Каждые 2 недели</Title>
					</div>
				</div>
				<Button
					onClick={() => setIsModalOpen(true)}
					className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
					<FiEdit2 />
				</Button>
			</div>

			<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
				<div className="flex gap-3 items-center">
					<div className="flex flex-col gap-1">
						<Description>Адрес доставки</Description>
						<Title className="font-[700]">Горького 1/2</Title>
					</div>
				</div>
				<Button
					onClick={() => setIsModalOpen(true)}
					className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
					<FiEdit2 />
				</Button>
			</div>

			<Button onClick={() => setIsModalFreezeOpen(true)}>Заморозить подписку</Button>
			<div className="w-full flex gap-3">
				<Button className="bg-white border border-[#E4E4E7] !text-black w-full !px-4">
					История доставок
				</Button>
				<Button className="bg-white border border-[#E4E4E7] !text-black w-full !px-4">
					История оплат
				</Button>
			</div>

			<Button className="bg-white border border-[#E4E4E7] !text-black w-full">
				Пропустить следующую доставку
			</Button>

			<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
				<div className="flex gap-3 items-center">
					<div className="flex flex-col gap-1">
						<Description>Способ оплаты</Description>
						<Title className="font-[700]">Finik/Баланс</Title>
					</div>
				</div>
				<Button
					onClick={() => setIsModalOpen(true)}
					className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
					<FiEdit2 />
				</Button>
			</div>

			<TitleComponent className="font-bold">Что входит в заказ</TitleComponent>

			<div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
				{data.map((el, index) => (
					<div
						key={index}
						className="border flex justify-between items-start border-[#E4E4E7] bg-white rounded-[8px] p-4">
						<div className="flex items-center gap-3">
							<div className="w-[92px] h-[92px] rounded-[8px] overflow-hidden relative ">
								<Image fill objectFit="cover" src={el.img} alt="img" />
							</div>
							<div className="flex flex-col gap-1">
								<Title>{el.title}</Title>
								<Description className="text-[#515151]">{el.text}</Description>
								<Title>{el.price}</Title>
							</div>
						</div>
						<Button
							onClick={() => setIsModalOpen(true)}
							className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
							<FiEdit2 />
						</Button>
					</div>
				))}
			</div>

			<div className="border flex justify-between items-center border-[#E4E4E7] bg-white rounded-[8px] p-4 mb-10">
				<Title>Итого:</Title>
				<Title>1500 с</Title>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<CustomRadioGroup
						options={addresses}
						name="deliveryAddress"
						value={selectedAddress}
						onChange={setSelectedAddress}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<Button
						className="w-full border border-[#E4E4E7] bg-transparent !text-black"
						onClick={() => setIsModalOpen(false)}>
						Добавить ещё адрес
					</Button>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalOpen(false)}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal>

			<Modal
				isOpen={isModalFreezeOpen}
				onClose={() => setIsModalFreezeOpen(false)}
				title="Заморозить подписку?">
				<div className="flex flex-col items-center gap-3">
					<div className=" rounded-full w-[64px] h-[64px] bg-[#DEEEFF] flex justify-center items-center">
						<PiPauseCircleLight size={32} />
					</div>

					  <div className="p-4 border-[#E4E4E7] border bg-[#F9FCFF] w-full rounded-[8px] flex flex-col gap-2">
						<Title className="font-semibold">Подписка остановится до 27 ноября</Title>
						<Description>
							Возобновить его можно <br /> в любой момент
						</Description>
					</div>

					<div className="flex gap-3">
						<div className="p-4 border-[#E4E4E7] w-full border bg-[#FAFAFA] rounded-[8px] flex flex-col gap-2">
							<Title className="font-semibold">Деньги не будут списыватся</Title>
							<Description>Все оплаченные дни сохранятся</Description>
						</div>

						<div className="p-4 border-[#E4E4E7] w-full border bg-[white] rounded-[8px] flex flex-col gap-2">
							<Title className="font-semibold">Подписка включится сама</Title>
							<Description>Это произойдет через месяц</Description>
						</div>
					</div>

          <div className="border-[#E4E4E7] border-b w-full"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalFreezeOpen(false)}>
            Заморозить
						</Button>
					</div>
				</div>
			</Modal>
		</section>
	);
};

export default FollowDetail;
