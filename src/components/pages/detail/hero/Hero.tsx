"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Detail } from "@/redux/models/product.model";

interface HeroDetailProps {
	product: Detail;
}

const HeroDetail = ({ product }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [scale, setScale] = useState(1);

	const startY = useRef<number | null>(null);

	const images = product.images || [];
	const activeImage = images[activeIndex] || { url: "" };

	if (images.length === 0) {
		return <div>Изображения недоступны</div>;
	}

	// 🔹 начало свайпа
	const handleStart = (y: number) => {
		startY.current = y;
	};

	// 🔹 движение
	const handleMove = (y: number) => {
		if (startY.current === null) return;

		const delta = startY.current - y; // вверх = +
		if (delta > 0) {
			const newScale = Math.min(1 + delta / 300, 1.5); // максимум 1.5
			setScale(newScale);
		}
	};

	// 🔹 конец свайпа
	const handleEnd = () => {
		startY.current = null;
	};

	return (
		<section className="w-full max-w-[435px] flex md:flex-row flex-col-reverse gap-2">
			{/* thumbnails */}
			<div className="flex md:flex-col flex-row min-w-[40px] gap-2 overflow-x-auto pb-2 scrollbar-hide">
				{images.map((img, index) => (
					<button
						key={index}
						onClick={() => {
							setActiveIndex(index);
							setScale(1);
						}}
						className={`relative w-[40px] h-[40px] rounded-[4px] overflow-hidden border ${
							index === activeIndex
								? "border-[#0071E3]"
								: "border-[#E4E4E7]"
						}`}
					>
						<Image src={img.url} alt="" fill className="object-cover" />
					</button>
				))}
			</div>

			{/* main image */}
			<div
				className="w-full h-[390px] max-w-[375px] overflow-hidden rounded-[16px] relative touch-none"
				onTouchStart={(e) => handleStart(e.touches[0].clientY)}
				onTouchMove={(e) => handleMove(e.touches[0].clientY)}
				onTouchEnd={handleEnd}
				onMouseDown={(e) => handleStart(e.clientY)}
				onMouseMove={(e) => handleMove(e.clientY)}
				onMouseUp={handleEnd}
			>
				<Image
					src={activeImage.url}
					alt={product.title || "Product image"}
					fill
					priority
					className="object-cover transition-transform duration-100"
					style={{
						transform: `scale(${scale})`,
					}}
				/>
			</div>
		</section>
	);
};

export default HeroDetail;
