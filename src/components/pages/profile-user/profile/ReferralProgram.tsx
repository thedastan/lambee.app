import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React from "react";

const ReferralProgram = () => {
	return (
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
	);
};

export default ReferralProgram;
