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
	const [isDragging, setIsDragging] = useState(false);

	const startY = useRef(0);

	const images = product.images || [];
	const activeImage = images[activeIndex] || { url: "" };

	if (!images.length) return <div>Изображения недоступны</div>;

	const start = (y: number) => {
		startY.current = y;
		setIsDragging(true);
	};

	const move = (y: number) => {
		if (!isDragging) return;

		const delta = startY.current - y;
		const nextScale = 1 + delta / 250;

		setScale(Math.min(Math.max(nextScale, 1), 1.5));
	};

	const end = () => {
		setIsDragging(false);
	};

	return (
		<section className="w-full max-w-[435px] flex md:flex-row flex-col-reverse gap-2">
			{/* thumbnails */}
			<div className="flex md:flex-col flex-row min-w-[40px] gap-2">
				{images.map((img, index) => (
					<button
						key={index}
						onClick={() => {
							setActiveIndex(index);
							setScale(1);
						}}
						className={`relative w-[40px] h-[40px] rounded overflow-hidden border ${
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
				className="w-full h-[390px] max-w-[375px] overflow-hidden rounded-[16px] relative touch-none select-none"
				onTouchStart={(e) => start(e.touches[0].clientY)}
				onTouchMove={(e) => {
					e.preventDefault();
					move(e.touches[0].clientY);
				}}
				onTouchEnd={end}
				onMouseDown={(e) => start(e.clientY)}
				onMouseMove={(e) => move(e.clientY)}
				onMouseUp={end}
				onMouseLeave={end}
			>
				<Image
					src={activeImage.url}
					alt={product.title || "Product image"}
					fill
					priority
					className="object-cover transition-transform duration-150 will-change-transform"
					style={{
						transform: `scale(${scale})`,
					}}
				/>
			</div>
		</section>
	);
};

export default HeroDetail;
