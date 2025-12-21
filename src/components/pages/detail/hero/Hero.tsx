"use client";

import { useState } from "react";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { Detail } from "@/redux/models/product.model";

interface HeroDetailProps {
	product: Detail;
}

const HeroDetail = ({ product }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const images = product.images || [];
	const activeImage = images[activeIndex] || { url: "" };

	if (images.length === 0) {
		return <div>Изображения недоступны</div>;
	}

	return (
		<section className="md:px-4 px-0 md:py-4 py-0 w-full max-w-[450px] flex justify-start items-start gap-2">

			<div
				className="flex flex-col min-w-[40px] gap-2 overflow-x-auto pb-2 scrollbar-hide"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			>
				{images.map((img, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`relative w-[40px] h-[40px] rounded-[4px] overflow-hidden border transition-all ${
							index === activeIndex
								? "border-[#AAA4C2] bg-[#F0F0F0]"
								: "border-[#E4E4E7] hover:border-[#AAA4C2]"
						}`}
						aria-label={`Посмотреть изображение ${index + 1}`}
					>
						<Image
							src={img.url}
							alt={`${product.title || "Product"} - изображение ${index + 1}`}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>

			<div className="w-full h-[390px] md:h-[375px] max-w-[375px] overflow-hidden rounded-[16px] relative mb-4">
				<Image
					src={activeImage.url}
					alt={product.title || "Product image"}
					fill
					className="object-cover"
					priority
				/>
			</div>

			 
		 

			{/* <div className="text-center flex flex-col justify-center items-center gap-3 mt-3">
				<TitleComponent className="text-[28px] font-[400]">
					{product.title}
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
					{product.description}
				</Description>
				 
			</div> */}
		</section>
	);
};

export default HeroDetail;