"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Detail } from "@/redux/models/product.model";
import Swipe from "react-easy-swipe";

interface HeroDetailProps {
	product: Detail;
}

const HeroDetail = ({ product }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [zoom, setZoom] = useState(1); // 1 = нормальный, >1 = увеличено
	const imageRef = useRef<HTMLImageElement>(null);

	const images = product.images || [];
	const activeImage = images[activeIndex] || { url: "" };

	if (images.length === 0) {
		return <div>Изображения недоступны</div>;
	}

	const handleSwipeUp = () => {
		if (zoom < 2) {
			setZoom((prev) => Math.min(prev + 0.2, 2));
		}
	};

	const handleSwipeDown = () => {
		if (zoom > 1) {
			setZoom((prev) => Math.max(prev - 0.2, 1));
		}
	};

	const resetZoom = () => {
		setZoom(1);
	};

	if (images.length === 0) {
		return <div>Изображения недоступны</div>;
	}

	return (
		<section className="w-full max-w-[435px] flex md:flex-row flex-col-reverse md:justify-start justify-center md:items-start items-center gap-2">
			{/* Миниатюры */}
			<div
				className="flex md:flex-col flex-row min-w-[40px] gap-2 overflow-x-auto pb-2 scrollbar-hide"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
			>
				{images.map((img, index) => (
					<button
						key={index}
						onClick={() => {
							setActiveIndex(index);
							setZoom(1); // сброс зума при смене изображения
						}}
						className={`relative w-[40px] h-[40px] rounded-[4px] overflow-hidden border transition-all ${
							index === activeIndex
								? "border-[#0071E3] bg-[#F0F0F0]"
								: "border-[#E4E4E7] hover:border-[#0071E3]"
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

			{/* Основное изображение */}
			<div className="w-full h-[390px] md:h-[375px] max-w-[375px] overflow-hidden rounded-[16px] relative mb-4">
				<Swipe
					onSwipeUp={handleSwipeUp}
					onSwipeDown={handleSwipeDown}
					className="w-full h-full"
					style={{ touchAction: "none" }}
				>
					<Image
						src={activeImage.url}
						alt={product.title || "Product image"}
						fill
						className="object-contain"
						priority
						onClick={resetZoom}
						style={{
							transform: `scale(${zoom})`,
							transition: "transform 0.2s ease",
							cursor: "zoom-in",
						}}
						ref={imageRef}
					/>
				</Swipe>
			</div>
		</section>
	);
};

export default HeroDetail;