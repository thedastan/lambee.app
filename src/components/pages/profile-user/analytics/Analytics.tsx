"use client";
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import statistics from "@/assets/svg/Statistics.svg";
import Image from "next/image";
import { Title } from "@/components/ui/text/Title";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "@/components/ui/input/DateInput";
 

import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from 'date-fns/locale/ru';

import "react-datepicker/dist/react-datepicker.css";
import "alert-go/dist/notifier.css";


const Analytics = () => {
	const [birthDate, setBirthDate] = useState<Date | null>(null);

	return (
		<section>
			<PageHeader
				href={PAGE.PROFILE}
				title="Аналитика"
			/>
			<div className="md:p-4 p-0">
				<div className="p-4 md:bg-white bg-transparent rounded-[8px]">
					<TitleComponent className="text-[24px]">Статистика</TitleComponent>
					<Description className="pb-4">
						Здесь вы можете посмотреть вашу статистику
					</Description>

					<DatePicker
						required
						selected={birthDate}
						onChange={(date) => setBirthDate(date)}
						placeholderText="Введите дату"

						
              dateFormat="dd.MM.yyyy"
              locale="ru"
              withPortal
              portalId="datepicker-portal"
              autoComplete="off"
              disabledKeyboardNavigation={false} 
              className="w-full max-w-full h-[48px] px-4 py-4 rounded-[8px] border border-[#E4E4E7] bg-white outline-none cursor-text focus:border-[#A8A4C4]"
              calendarClassName="react-datepicker-custom"
              wrapperClassName="w-full"
					/>
					<div className="flex flex-col gap-4 mt-4">
						<div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Использовано подгузников:
								</Description>
								<Title>22</Title>
							</div>
							<Image src={statistics} alt="statistics" />
						</div>

						<div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Потрачено денег:
								</Description>
								<Title>14 000 с</Title>
							</div>
							<Image src={statistics} alt="statistics" />
						</div>

						<div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
							<div className="flex flex-col gap-1">
								<Description className="text-[#515151]">
									Какие размеры вы брали:
								</Description>
								<Title>S, M</Title>
							</div>
							<Image src={statistics} alt="statistics" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Analytics;
