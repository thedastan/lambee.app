import { Description } from "@/components/ui/text/Description";
import img from "@/assets/images/Diapers.png";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IoStarSharp } from "react-icons/io5";
import { Title } from "@/components/ui/text/Title";

const AlsoBuy = () => {
	const data = [
		{
			img: img,
			title: "Салфетки",
			desc: "Без раздражений кожи",
			price: 400,
		},
		{
			img: img,
			title: "Салфетки",
			desc: "Без раздражений кожи",
			price: 400,
		},
		{
			img: img,
			title: "Салфетки",
			desc: "Без раздражений кожи",
			price: 400,
		},
		{
			img: img,
			title: "Салфетки",
			desc: "Без раздражений кожи",
			price: 400,
		},
		{
			img: img,
			title: "Салфетки",
			desc: "Без раздражений кожи",
			price: 400,
		},
		{
			img: img,
			title: "Салфетки",
			desc: "Без раздражений кожи",
			price: 400,
		},
	];
	return (
		<section className=" ">
			<div className="text-center md:flex hidden flex-col justify-center items-center gap-3 mt-3">
				<TitleComponent className="text-[28px] font-[400]">
					Подгузники
				</TitleComponent>
				<Description className="flex items-center gap-1">
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<span className="text-[#515151] ml-2">4500 отзывов</span>
				</Description>
				<Description className="w-full max-w-[350px] mt-2">
					Качество премиум-класса для здоровья и удобства с первых минут жизни
				</Description>
				<Title className="font-[600] mt-2">От 7000 с в месяц</Title>
			</div>

			<div className="bg-[#F9F4EC] py-4 mt-6">
				<Description className="px-4 pb-4">Также покупают</Description>

				<div
					className="overflow-x-auto scrollbar-hide flex items-start gap-3  pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)]"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{data.map((el, index) => (
						<div
							key={index}
							className="border border-[#E4E4E7] flex-shrink-0 rounded-[8px] p-3 bg-white flex gap-2 w-full max-w-[280px]">
							<div className="w-[80px] min-w-[80px] h-[80px] relative overflow-hidden rounded-[8px]">
								<Image fill objectFit="cover" src={el.img} alt="img" />
							</div>
							<div className="w-full flex flex-col justify-between">
								<div className="">
									<div className="flex items-center justify-between">
										<Description className="font-[600]">{el.title}</Description>
										<Description className="font-[600]">{el.price}</Description>
									</div>

									<Description className="text-[#515151] mt-1">
										{el.desc}
									</Description>
								</div>
								<div className="w-full flex justify-end">
									<button className="text-[#0071E3] border-b border-[#0071E3] text-[12px] font-[600]">
										Добавить в корзину
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AlsoBuy;
