"use client";
import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import Link from "next/link";

import img2 from "@/assets/images/discount.png";
import { useProduct } from "@/redux/hooks/product";

const Featured = () => {
	const { data } = useProduct();

	return (
		<section className="pb-10 px-4">
			<TitleComponent className="w-full md:max-w-full pb-4 max-w-[194px]">
				Рекомендованные товары
			</TitleComponent>
			<div className=" grid md:grid-cols-2 grid-cols-1 gap-2">
				{data?.detail.map((el, index) => (
					<Link
						key={index}
						href={`/detail/${el.id}`}
						className="p-3 bg-white border border-[#E4E4E7] rounded-[16px]  relative">
						<div className="flex gap-3">
							<div className=" relative overflow-hidden rounded-[8px] w-[114px] h-[114px]">
								<Image
									fill
									objectFit="cover"
									src={el.images[0]?.url}
									alt="img"
								/>
							</div>
							<div className="w-[138px] flex flex-col gap-1">
								<Title>{el.title}</Title>
								<Description className="text-[#515151]">
									По подписке
								</Description>

								<Description className="text-[#515151] flex items-center">
									Размер: {el.sizes.map((item) => item.title).join(", ")}
								</Description>

								<Description className="text-[#AAA4C2] font-[500] text-[16px]">
									{el.discount_price} c{" "}
									<span className="line-through text-[#515151] text-14px ml-1">
										{el.price} c
									</span>
								</Description>
							</div>

							<Description className="text-[#AAA4C2] rounded-[32px] absolute top-0 right-0 border border-[#AAA4C2] p-1 px-2">
								{el.discount}% Скидка
							</Description>
						</div>
						<Button className="mt-3 w-full">В корзину</Button>
					</Link>
				))}
			</div>

			<div
				className="w-full h-[164px] rounded-[16px] relative p-4 mt-6"
				style={{
					background: "linear-gradient(to right, #3AA0FF 70%, #CD61FF 90%)",
				}}>
				<div className="text-white flex flex-col justify-between h-full">
					<div>
						<TitleComponent className="text-[20px]">
							Кэшбек и бонусы
						</TitleComponent>
						<Description>Накопите баллы с каждой покупки</Description>
					</div>

					<div>
						<TitleComponent className="text-[20px]">5%</TitleComponent>
						<Description>Возврат</Description>
					</div>
				</div>
				<Image
					className="w-[131px] h-[131px] absolute bottom-0 md:right-14 right-4"
					src={img2}
					alt="img"
				/>
			</div>
		</section>
	);
};

export default Featured;
