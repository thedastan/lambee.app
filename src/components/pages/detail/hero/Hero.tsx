"use client";

import { useState } from "react";
import Image from "next/image";
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
		<section className="  w-full max-w-[435px] flex md:flex-row flex-col-reverse md:justify-start justify-center md:items-start items-center gap-2">

			<div
				className="flex md:flex-col flex-row min-w-[40px] gap-2 overflow-x-auto pb-2 scrollbar-hide"
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

			 
		 

			 
		</section>
	);
};

export default HeroDetail;