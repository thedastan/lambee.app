import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { SubIDDetail } from "@/redux/models/subscription.model";
import Image from "next/image";
import React from "react";
import { FiEdit2 } from "react-icons/fi";

interface ISub {
	sub: SubIDDetail;
}
const FollowItem = ({ sub }: ISub) => {
	return (
		<div className="flex flex-col gap-4">
			<TitleComponent className="font-bold">Что входит в заказ</TitleComponent>

			<div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
				{sub.items.map((el, index) => (
					<div
						key={index}
						className="border flex justify-between items-start border-[#E4E4E7] bg-white rounded-[8px] p-4">
						<div className="flex items-center gap-3">
							<div className="w-[92px] h-[92px] rounded-[8px] overflow-hidden relative ">
								<Image
									fill
									objectFit="cover"
									src={el.variant_image}
									alt="img"
								/>
							</div>
							<div className="flex flex-col gap-1">
								<Title>{el.product_title}</Title>
								<Description className="text-[#515151]">
									Размер: {el.variant_title}
								</Description>
								{/* <Title>{el.price}</Title> */}
							</div>
						</div>
						<Button className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
							<FiEdit2 />
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default FollowItem;
