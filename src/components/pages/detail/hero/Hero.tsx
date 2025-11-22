// components/HeroDetail.tsx

"use client";

import { useState } from "react";
import Image from "next/image";

import img1 from "@/assets/images/Diapers.png";
import img2 from "@/assets/images/Napkins.png";
import img3 from "@/assets/images/Panties.png";
import img4 from "@/assets/images/Travel.png";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { IoStarSharp } from "react-icons/io5";
import { Title } from "@/components/ui/text/Title";

const HeroDetail = () => {
	const [activeIndex, setActiveIndex] = useState(0);

	const images = [
		{ src: img1, alt: "Подгузники" },
		{ src: img2, alt: "Салфетки" },
		{ src: img3, alt: "Трусики" },
		{ src: img4, alt: "Путешествие" },
	];

	const activeImage = images[activeIndex];

	return (
		<section className="md:px-4 px-0 md:py-4 py-0 flex justify-center flex-col items-center">
			{/* Основное изображение */}
			<div className="w-full h-[390px] md:h-[535px] overflow-hidden relative   mb-4">
				<Image
					src={activeImage.src}
					alt={activeImage.alt}
					fill
					className="object-cover"
					priority
				/>
			</div>

			{/* Миниатюры */}
			<div
				className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{images.map((img, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={`relative w-[40px] h-[40px] rounded-[4px] overflow-hidden border transition-all ${
							index === activeIndex
								? "border-[#AAA4C2] bg-[#F0F0F0]"
								: "border-[#E4E4E7] hover:border-[#AAA4C2]"
						}`}>
						<Image src={img.src} alt={img.alt} fill className="object-cover" />
					</button>
				))}
			</div>

			<div className="text-center flex flex-col justify-center items-center gap-3 mt-3">
				<TitleComponent className="text-[28px] font-[400]">Подгузники</TitleComponent>
				<Description className="flex items-center gap-1">
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
          <span className="text-[#515151] ml-2">4500 отзывов</span>
				</Description>
        <Description className="w-full max-w-[350px] mt-2">Качество премиум-класса для здоровья и удобства с первых минут жизни</Description>
        <Title className="font-[600] mt-2">От 7000 с в месяц</Title>
			</div>
		</section>
	);
};

export default HeroDetail;
