"use client";
import Image from "next/image";
import ava from "@/assets/images/AsimDev.png";
import { Title } from "@/components/ui/text/Title";
import Button from "@/components/ui/button/Button";
import { FiEdit2 } from "react-icons/fi";
import { Description } from "@/components/ui/text/Description";
import LogoTransparent from "@/assets/svg/logo-transparent";
import { AiOutlinePercentage } from "react-icons/ai";
import img from "@/assets/images/kits.png";
import analytics from "@/assets/svg/analytics.svg";
import watch from "@/assets/images/watch.png";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import money from "@/assets/svg/money.svg";
import { SlLocationPin } from "react-icons/sl";
import { GoChevronRight } from "react-icons/go";
import Modal from "@/components/ui/modal/Modal";
import CustomRadioGroup from "@/components/ui/radio-choice/CustomRadioGroup";
import { useState } from "react";
import LinkButton from "@/components/ui/button/LinkButton";
import { PAGE } from "@/config/pages/public-page.config";
import PageHeader from "@/components/ui/heading/PageHeader";
import Input from "@/components/ui/input/Input";

const Profile = () => {
	const [selectedAddress, setSelectedAddress] = useState<string>("");
	const [addresses, setAddresses] = useState([
		{ id: "gorokogo", label: "Горького 1/2" },
		{ id: "fuchika", label: "Фучика 24" },
	]);
	const [newAddressValue, setNewAddressValue] = useState("");
	const [modalType, setModalType] = useState<null | "select" | "add">(null);

	const [isPay, setIsPay] = useState(false);

	const openSelectModal = () => {
		setModalType("select");
	};

	const openAddModal = () => {
		setNewAddressValue("");
		setModalType("add");
	};

	const closeModal = () => {
		setModalType(null);
	};

	const handleAddAddress = () => {
		if (newAddressValue.trim()) {
			const newAddress = {
				id: "",
				label: newAddressValue.trim(),
			};
			setAddresses((prev) => [...prev, newAddress]);
			setSelectedAddress(newAddress.id);
		}
		openSelectModal();
	};

	return (
		<section>
			<PageHeader
				title="Личный кабинет"
				description="Здесь вы можете посмотреть свои данные"
			/>
			<div className="p-4 flex flex-col gap-4 pb-10">
				{/* Avatar & Edit */}
				<div className="border border-[#E4E4E7] p-4 bg-white rounded-[8px] flex items-center justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="border border-[#00000014] rounded-full overflow-hidden relative w-[50px] h-[50px]">
							<Image fill objectFit="cover" src={ava} alt="avatar" />
						</div>
						<div className="flex flex-col items-start gap-1">
							<Title>Asim Makhmudov</Title>
							<Title>+996774000315</Title>
						</div>
					</div>
					<LinkButton
						href={PAGE.EDITPROFILE}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</LinkButton>
				</div>

				{/* Savings Card */}
				<div className="border border-[#E4E4E7] bg-[#FFF3E0] flex justify-between items-center rounded-[8px] w-full h-[250px] overflow-hidden">
					<div className="flex flex-col justify-between items-start gap-6 m-4">
						<div className="flex flex-col gap-2">
							<Description className="font-[600]">Потрачено:</Description>
							<Title>10 000 с</Title>
							<div className="flex items-center gap-2">
								<LogoTransparent />
								<Description>
									Разовые <br /> покупки+подписка
								</Description>
							</div>
						</div>

						<div className="flex flex-col gap-2">
							<Description className="font-[600]">
								Сэкономлено в общем:
							</Description>
							<Title className="text-[#0171E3]">5000 с</Title>
							<div className="flex items-center gap-2">
								<AiOutlinePercentage color="#AAA4C2" size={19} />
								<Description>
									За розницу вы <br /> потратили бы больше
								</Description>
							</div>
						</div>
					</div>

					<div className="relative object-cover rounded-tr-[8px] w-[119px] h-[250px] rounded-br-[8px]">
						<Image fill objectFit="cover" src={img} alt="img" />
					</div>
				</div>

				{/* Time Saved */}
				<div className="border border-[#E4E4E7] bg-white flex justify-between items-center rounded-[8px] w-full h-[130px] overflow-hidden">
					<div className="flex flex-col justify-between items-start gap-6 m-4">
						<div className="flex flex-col gap-2">
							<Description className="font-[600]">
								Сэкономлено времени:
							</Description>
							<Title className="text-[#0171E3]">500 часов</Title>
							<div className="flex items-center gap-2">
								<MdOutlineWatchLater color="#AAA4C2" size={19} />
								<Description>
									За походы в магазин вы <br /> потратили бы 1000 часов
								</Description>
							</div>
						</div>
					</div>

					<div className="relative object-cover rounded-tr-[8px] w-[119px] h-[142px] rounded-br-[8px]">
						<Image fill objectFit="cover" src={watch} alt="watch" />
					</div>
				</div>

				{/* Balance */}
				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3">
						<Image width={34} height={34} src={money} alt="balance" />
						<div className="flex flex-col gap-1">
							<Description>Баланс</Description>
							<Title className="font-[700]">3000 с</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsPay(true)}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<IoAdd size={25} />
					</Button>
				</div>

				{/* Delivery Address */}
				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<SlLocationPin size={34} color="#515151" />
						<div className="flex flex-col gap-1">
							<Description>Адрес доставки</Description>
							<Title className="font-[700]">
								{addresses.find((a) => a.id === selectedAddress)?.label ||
									"Не выбран"}
							</Title>
						</div>
					</div>
					<Button
						onClick={openSelectModal}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</Button>
				</div>

				{/* Analytics */}
				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<Image width={34} height={34} src={analytics} alt="analytics" />
						<div className="flex flex-col gap-1">
							<Title className="font-[700]">Аналитика</Title>
						</div>
					</div>
					<LinkButton
						href={PAGE.ANALYTICS}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<GoChevronRight size={25} />
					</LinkButton>
				</div>

				{/* My Children */}
				<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
					<div className="flex gap-3 items-center">
						<Image width={34} height={34} src={analytics} alt="analytics" />
						<div className="flex flex-col gap-1">
							<Title className="font-[700]">Мои дети</Title>
						</div>
					</div>
					<LinkButton
						href={PAGE.MYCHILDREN}
						className="bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<GoChevronRight size={25} />
					</LinkButton>
				</div>

				<div className="border border-[#E4E4E7] bg-transparent rounded-[16px] flex flex-col gap-6 p-4">
					<div className="flex items-center gap-3">
						<svg
							width="34"
							height="34"
							viewBox="0 0 34 34"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M26.9167 29.75V21.25M22.6667 25.5H31.1667M17 21.25H11.3333C8.693 21.25 7.37283 21.25 6.33146 21.6813C4.94297 22.2565 3.83981 23.3596 3.26468 24.7481C2.83333 25.7895 2.83333 27.1097 2.83333 29.75M21.9583 4.66191C24.035 5.50254 25.5 7.53852 25.5 9.91667C25.5 12.2948 24.035 14.3308 21.9583 15.1714M19.125 9.91667C19.125 13.0463 16.5879 15.5833 13.4583 15.5833C10.3287 15.5833 7.79167 13.0463 7.79167 9.91667C7.79167 6.78705 10.3287 4.25 13.4583 4.25C16.5879 4.25 19.125 6.78705 19.125 9.91667Z"
								stroke="#AAA4C2"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<div className="">
							<Title className="font-[700]">Реферальная программа</Title>
							<Description className="text-[#515151] mt-1">
								Приглашайте друзей <br /> и получайте бонусы на баланс
							</Description>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<svg
							width="34"
							height="34"
							viewBox="0 0 34 34"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M22.6667 25.5L25.5 28.3333L31.1667 22.6667M17 21.25H11.3333C8.693 21.25 7.37283 21.25 6.33146 21.6813C4.94297 22.2565 3.83981 23.3596 3.26468 24.7481C2.83333 25.7895 2.83333 27.1097 2.83333 29.75M21.9583 4.66191C24.035 5.50254 25.5 7.53852 25.5 9.91667C25.5 12.2948 24.035 14.3308 21.9583 15.1714M19.125 9.91667C19.125 13.0463 16.5879 15.5833 13.4583 15.5833C10.3287 15.5833 7.79167 13.0463 7.79167 9.91667C7.79167 6.78705 10.3287 4.25 13.4583 4.25C16.5879 4.25 19.125 6.78705 19.125 9.91667Z"
								stroke="#AAA4C2"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<div className="">
							<Description className="text-[#515151]">
								Количество приглашенных
							</Description>
							<Title className="font-[700]">322</Title>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<svg
							width="34"
							height="34"
							viewBox="0 0 34 34"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.66666 8.5C5.66666 9.62717 6.86071 10.7082 8.98612 11.5052C11.1115 12.3022 13.9942 12.75 17 12.75C20.0058 12.75 22.8885 12.3022 25.0139 11.5052C27.1393 10.7082 28.3333 9.62717 28.3333 8.5M5.66666 8.5C5.66666 7.37283 6.86071 6.29183 8.98612 5.4948C11.1115 4.69777 13.9942 4.25 17 4.25C20.0058 4.25 22.8885 4.69777 25.0139 5.4948C27.1393 6.29183 28.3333 7.37283 28.3333 8.5M5.66666 8.5V17M28.3333 8.5V17M5.66666 17C5.66666 18.1272 6.86071 19.2082 8.98612 20.0052C11.1115 20.8022 13.9942 21.25 17 21.25C20.0058 21.25 22.8885 20.8022 25.0139 20.0052C27.1393 19.2082 28.3333 18.1272 28.3333 17M5.66666 17V25.5C5.66666 26.6272 6.86071 27.7082 8.98612 28.5052C11.1115 29.3022 13.9942 29.75 17 29.75C20.0058 29.75 22.8885 29.3022 25.0139 28.5052C27.1393 27.7082 28.3333 26.6272 28.3333 25.5V17"
								stroke="#AAA4C2"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<div className="">
							<Description className="text-[#515151]">
							Заработано бонусов
							</Description>
							<Title className="font-[700]">322</Title>
						</div>
					</div>

					<Button>Пригласить друзей</Button>
				</div>

				{/* Модалка 1: Выбор адреса */}
				<Modal
					isOpen={modalType === "select"}
					onClose={closeModal}
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
							onClick={openAddModal}>
							Добавить ещё адрес
						</Button>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] bg-transparent !text-black"
								onClick={closeModal}>
								Отмена
							</Button>
							<Button className="w-full" onClick={closeModal}>
								Сохранить
							</Button>
						</div>
					</div>
				</Modal>

				{/* Модалка 2: Добавление адреса */}
				<Modal
					isOpen={modalType === "add"}
					onClose={closeModal}
					title="Добавить адрес">
					<div className="flex flex-col gap-3">
						<Input
							label={
								<>
									Адрес <span className="text-[#FF5F57]">*</span>
								</>
							}
							value={newAddressValue}
							onChange={(e) => setNewAddressValue(e.target.value)}
							placeholder="Введите адрес доставки"
						/>

						<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] bg-transparent !text-black"
								onClick={openSelectModal}>
								Отмена
							</Button>
							<Button className="w-full" onClick={handleAddAddress}>
								Сохранить
							</Button>
						</div>
					</div>
				</Modal>

				<Modal
					isOpen={isPay}
					onClose={() => setIsPay(false)}
					title="Пополнить баланс">
					<div className="flex flex-col gap-3">
						<Input
							label={
								<>
									Сумма <span className="text-[#FF5F57]">*</span>
								</>
							}
							placeholder="Введите сумму"
						/>
						<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] bg-transparent !text-black"
								onClick={() => setIsPay(false)}>
								Отмена
							</Button>
							<Button className="w-full" onClick={() => setIsPay(false)}>
								Пополнить
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default Profile;
