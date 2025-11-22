import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import logo from "@/assets/svg/logo-white.svg";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";

const Notice = () => {
	const data = [
		{
			title: "Акция!",
			description: "Получите 6ую бесплатную доставку",
		},
		{
			title: "О подписке",
			description:
				"У вас заканчивается подписка на “Подгузники”. Не забудьте пополнить баланс",
		},
		{
			title: "Акция!",
			description: "Получите 6ую бесплатную доставку",
		},
		{
			title: "О подписке",
			description:
				"У вас заканчивается подписка на “Подгузники”. Не забудьте пополнить баланс",
		},
	];
	return (
		<section className="md:p-4 p-0">
			<div className="md:hidden block p-4">
				<TitleComponent className="font-[600] text-[24px]">
					Уведомления
				</TitleComponent>
				<Description className="text-[#515151]">
					Здесь вы можете посмотреть ваши уведомления
				</Description>
			</div>
			{data.map((el, index) => (
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
		</section>
	);
};

export default Notice;
