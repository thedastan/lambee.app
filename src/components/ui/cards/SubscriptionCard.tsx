import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import ActionMenuButton from "../button/ActionMenuButton";
import { LuArrowUpRight } from "react-icons/lu";
import LinkButton from "../button/LinkButton";

interface SubscriptionCardProps {
	id: number;
	img: string | StaticImageData;
	title: string;
	date: string;
	time: string;
	onToggleMenu: (id: number) => void;
	onAction: (action: string, id: number) => void;
}

export const SubscriptionCard = ({
	img,
	title,
	date,
	time,
 
}: SubscriptionCardProps) => {
	 
 

	return (
		<div className="p-3 bg-[#EFF7FF] flex-shrink-0   rounded-[16px] w-full max-w-[290px]">
			<div className="flex justify-between items-start gap-2 border-b pb-3  ">
				<div className="flex gap-2  ">
					<Image
						width={48}
						height={48}
						objectFit="cover"
						className="rounded-[8px]"
						src={img}
						alt="category-img"
					/>

					<div className="flex flex-col">
						<Description>Подписка</Description>
						<Title className="font-[700]">“{title}”</Title>
					</div>
				</div>

				<LinkButton
					href="#"
					className="border !bg-white !text-black !px-0 w-[40px]">
					<LuArrowUpRight size={23} />
				</LinkButton>
			</div>

			<div className="   flex flex-col  w-full items-start p-2 rounded-[8px]">
				<Description>Следующая доставка:</Description>
				<Description className="text-[#0171E3]">
					{date} в {time}
				</Description>
			</div>
		</div>
	);
};
