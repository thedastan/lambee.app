import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import ActionMenuButton from "../button/ActionMenuButton";

interface SubscriptionCardProps {
	id: number;
	img: string | StaticImageData;
	title: string;
	date: string;
	time: string;
	price: string;
	status: boolean;
  isOpenMenu: boolean;
	onToggleMenu: (id: number) => void;
	onAction: (action: string, id: number) => void;
}

export const SubscriptionCard = ({
	id,
	img,
	title,
	date,
	time,
	price,
	status,
  isOpenMenu,
	onToggleMenu,
	onAction,
}: SubscriptionCardProps) => {

	const handleToggle = () => {
		onToggleMenu(id);
	};

  const handleAction = (action: string) => {
		onAction(action,id);
	};

	return (
		<Link
			href={"#" }
			className="p-3 bg-white border flex-shrink-0 border-[#E4E4E7] rounded-[16px] w-full max-w-[290px]">
			<div className="flex justify-between items-start gap-2 border-b pb-3 border-[#E4E4E7]">
				<div className="flex gap-2">
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

				<ActionMenuButton
					isOpen={isOpenMenu}
					onToggle={handleToggle}
					onAction={handleAction}
				/>
			</div>

			<div className="bg-[#FAF9FF] flex justify-between items-center p-2 rounded-[8px] mt-3">
				<Description>
					Следующая <br /> доставка:
				</Description>
				<Description>
					{date} <br />
					{time}
				</Description>
			</div>

			<div className="bg-[#FAF9FF] flex justify-between items-center p-2 rounded-[8px] mt-3">
				<Description>
					Экономия через <br /> подписку:
				</Description>
				<Description>{price}</Description>
			</div>

			{status && (
				<div className="border border-[#E4E4E7] flex justify-between items-center p-2 rounded-[8px] mt-3">
					<Description>Статус подписки:</Description>

					<Description className="text-[#067647] bg-[#ECFDF3] border p-1 px-2 rounded-full border-[#ABEFC6]">
						Активна
					</Description>
				</div>
			)}
		</Link>
	);
};
