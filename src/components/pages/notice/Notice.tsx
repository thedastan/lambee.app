'use client'
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import logo from "@/assets/svg/logo-white.svg";
import Image from "next/image";
import PageHeader from "@/components/ui/heading/PageHeader";
import { useNotifications } from "@/redux/hooks/useNotifications";

const Notice = () => {
	const { data } =  useNotifications();

	return (
		<section>
			<PageHeader
				title="Уведомления"
				description="Здесь вы можете посмотреть ваши уведомления"
			/>
			
			<div className="md:p-4 p-0 mt-4 md:mt-0">
				{data?.data.detail.map((el, index) => (
					<div
						key={index}
						className="bg-white p-8 border-b border-[#E4E4E7] flex gap-2">
						<Image src={logo} alt="logo" />
						<div className="w-full max-w-[220px] flex flex-col gap-2">
							<Title>{el.title}</Title>
							<Description className="text-[#101828]">
								{el.description}
							</Description>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Notice;
