"use client";
import Image from "next/image";
import ava from "@/assets/images/user.jpg";
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
import { GoChevronRight } from "react-icons/go";
import Modal from "@/components/ui/modal/Modal";
import { useState } from "react";
import LinkButton from "@/components/ui/button/LinkButton";
import { PAGE } from "@/config/pages/public-page.config";
import PageHeader from "@/components/ui/heading/PageHeader";
import Input from "@/components/ui/input/Input";
import { useUserProfile } from "@/redux/hooks/user";
import ReferralProgram from "./ReferralProgram";
import ProfileAddress from "./ProfileAddress";
import { useFinikPay } from "@/redux/hooks/finik-pay";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { toast } from "alert-go";
import 'alert-go/dist/notifier.css';

const Profile = () => {
	const router = useRouter();
	const [isPay, setIsPay] = useState(false);

	const { profile } = useUserProfile();

	const [amount, setAmount] = useState<string>("");
	const { mutateAsync: pay, isPending } = useFinikPay();

	const handlePay = async () => {
		const numAmount = Number(amount.trim());
		if (isNaN(numAmount) || numAmount <= 0) {
			toast.warning("Введите корректную сумму",{position:"top-center"});
			return;
		}

		try {
			const response = await pay(numAmount);
			if (response?.detail) {
				window.location.href = response.detail;
			} else {
				toast.error("Не удалось получить ссылку на оплату",{position:"top-center"});
			}
		} catch {
			toast.error("Ошибка при создании платежа",{position:"top-center"});
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
		 

		window.location.href = PAGE.AUTH_PRE_REGISTRATION;
	};

	if (!profile) {
		return (
			<section className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
				<Title className="mb-4 text-center">Сначала авторизуйтесь</Title>
				<Description className="text-gray-500 mb-6 text-center">
					Чтобы получить доступ к личному кабинету, войдите в свой аккаунт.
				</Description>
				<LinkButton href={PAGE.AUTH_PRE_REGISTRATION} className="!px-6 !py-2">
					Войти
				</LinkButton>
			</section>
		);
	}

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
							<Image
								fill
								objectFit="cover"
								src={profile?.profile_picture || ava}
								alt="avatar"
							/>
						</div>
						<div className="flex flex-col items-start gap-1">
							<Title>{profile?.name}</Title>
							<Title>
								{profile?.iso_code?.iso_code} {profile?.phone}
							</Title>
						</div>
					</div>
					<LinkButton
						href={PAGE.EDITPROFILE}
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<FiEdit2 />
					</LinkButton>
				</div>

				{/* Savings Card */}
			 

				{/* Time Saved */}
				<div className="border border-[#E4E4E7] bg-white flex justify-between items-center rounded-[8px] w-full h-[130px] overflow-hidden">
					<div className="flex flex-col justify-between items-start gap-6 m-4">
						<div className="flex flex-col gap-2">
							<Description className="font-[600]">
								Сэкономлено времени:
							</Description>
							<Title className="text-[#0171E3]">500 часов</Title>
							<div className="flex items-center gap-2">
								<MdOutlineWatchLater color="#0071E3" size={19} />
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
							<Title className="font-[700]">{profile?.balance?.amount} c</Title>
						</div>
					</div>
					<Button
						onClick={() => setIsPay(true)}
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<IoAdd size={25} />
					</Button>
				</div>

				{/* Delivery Address */}
				<ProfileAddress />

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
						className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
						<GoChevronRight size={25} />
					</LinkButton>
				</div>

				{/* My Children */}
			 

				{/* Logout */}
				<div
					onClick={handleLogout}
					className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-center gap-4 p-4 cursor-pointer hover:bg-gray-50 transition-colors">
					<div className="flex gap-3 items-center  ">
						<CiLogout size={32} />
						<div className="flex flex-col gap-1">
							<Title className="font-[700]">Выйти с аккаунта</Title>
						</div>
					</div>
				</div>

				<ReferralProgram />

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
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							type="number"
							min="1"
						/>
						<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

						<div className="flex gap-3 w-full">
							<Button
								className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
								onClick={() => setIsPay(false)}
								disabled={isPending}>
								Отмена
							</Button>
							<Button
								className="w-full"
								onClick={handlePay}
								disabled={isPending || !amount.trim()}>
								{isPending ? "Обработка..." : "Пополнить"}
							</Button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default Profile;
 