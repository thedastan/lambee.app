"use client";

import { useState } from "react";
import Image from "next/image";
import { Detail } from "@/redux/models/product.model";

interface HeroDetailProps {
	product: Detail;
}

const Hero = ({ product }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isZoomed, setIsZoomed] = useState(false); // true = увеличено

	const images = product.images || [];
	const activeImage = images[activeIndex] || { url: "" };

	if (images.length === 0) {
		return <div>Изображения недоступны</div>;
	}

	// Обработчик свайпа
	const handleTouchMove = (e: React.TouchEvent) => {
		if (e.touches.length !== 1) return;

		const touch = e.touches[0];
		const startY = e.currentTarget.getBoundingClientRect().top;
		const currentY = touch.clientY;

		// Свайп вверх → увеличить
		if (currentY < startY - 30) {
			setIsZoomed(true);
			e.preventDefault(); // ← отменяем обновление страницы
			return;
		}

		// Свайп вниз → уменьшить
		if (currentY > startY + 30) {
			setIsZoomed(false);
			e.preventDefault(); // ← отменяем прокрутку/обновление
			return;
		}
	};

	const resetZoom = () => {
		setIsZoomed(false);
	};

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
							setIsZoomed(false); // сброс при смене
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
			<div
				className="w-full h-[390px] md:h-[375px] max-w-[375px] overflow-hidden rounded-[16px] relative mb-4"
				onTouchMove={handleTouchMove}
				onTouchEnd={resetZoom} // при отпускании — можно вернуть (опционально)
				onClick={resetZoom}
				style={{ touchAction: "none" }}
			>
				<Image
					src={activeImage.url}
					alt={product.title || "Product image"}
					fill
					className={`object-cover transition-transform duration-200 ${
						isZoomed ? "scale-150" : "scale-100"
					}`}
					priority
				/>
			</div>
		</section>
	);
};

export default Hero;