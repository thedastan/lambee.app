import img from "@/assets/images/Panties.png";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";

const SubscriptionsHome = () => {
	const data = [
		{
			id:0,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id:1,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: true,
		},
		{
			id:2,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: true,
		},
		{
			id:3,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id:4,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id:5,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
		{
			id:6,
			img: img,
			title: "Подгузники",
			date: "12.10.2025",
			time: "09:00",
			price: "1000",
			status: false,
		},
	];
	return (
		<section className="pb-6">
			<TitleComponent className="px-4">Ваши подписки</TitleComponent>
			<div
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				className="flex items-start gap-3 mt-3 overflow-x-auto scrollbar-hide   pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)]">
				{data.map((el, index) => (
					<Link
						key={index}
						href={"/detail"}
						className="p-3 bg-white border flex-shrink-0 border-[#E4E4E7] rounded-[16px] w-full max-w-[290px]">
						<div className="flex justify-between items-start gap-2 border-b pb-3 border-[#E4E4E7]">
							<div className="flex gap-2">
								<Image
									width={48}
									height={48}
									objectFit="cover"
									className=" rounded-[8px]"
									src={el.img}
									alt="category-img"
								/>

								<div className="flex flex-col">
									<Description>Подписка</Description>
									<Title className="font-[700]">“{el.title}”</Title>
								</div>
							</div>

							<button className="w-[40px] h-[40px] border border-[#E4E4E7] rounded-[5px] flex justify-center items-center">
								<BsThreeDots />
							</button>
						</div>

						<div className="bg-[#FAF9FF] flex justify-between items-center p-2 rounded-[8px] mt-3">
							<Description>
								Следующая <br /> доставка:
							</Description>
							<Description>
								{el.date} <br />
								{el.time}
							</Description>
						</div>

						<div className="bg-[#FAF9FF] flex justify-between items-center p-2 rounded-[8px] mt-3">
							<Description>
								Экономия через <br /> подписку:
							</Description>
							<Description>{el.price}</Description>
						</div>

						{el.status ? (
							<>
								<div className="border border-[#E4E4E7] flex justify-between items-center p-2 rounded-[8px] mt-3">
									<Description>Статус подписки:</Description>
									<Description className="text-[#067647] bg-[#ECFDF3] border p-1 px-2 rounded-full border-[#ABEFC6]">
										Активна
									</Description>
								</div>
							</>
						) : null}
					</Link>
				))}
			</div>
		</section>
	);
};

export default SubscriptionsHome;
