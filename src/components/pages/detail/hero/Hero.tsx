"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Detail } from "@/redux/models/product.model";

interface HeroDetailProps {
	product: Detail;
}

const HeroDetail = ({ product }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [zoom, setZoom] = useState(1);
	const imageRef = useRef<HTMLDivElement>(null);
	const touchStartY = useRef<number | null>(null);
	const isSwiping = useRef(false);

	const images = product.images || [];
	const activeImage = images[activeIndex] || { url: "" };

	if (images.length === 0) {
		return <div>Изображения недоступны</div>;
	}

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartY.current = e.touches[0].clientY;
		isSwiping.current = false;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (touchStartY.current === null) return;

		const currentY = e.touches[0].clientY;
		const diff = touchStartY.current - currentY;

		// Если разница > 20 пикселей — начинаем свайп
		if (Math.abs(diff) > 20) {
			isSwiping.current = true;
		}

		// Свайп вверх → увеличить
		if (diff > 0 && zoom < 2) {
			setZoom((prev) => Math.min(prev + 0.05, 2));
		}
		// Свайп вниз → уменьшить
		else if (diff < 0 && zoom > 1) {
			setZoom((prev) => Math.max(prev - 0.05, 1));
		}

		// Отменяем дефолтное поведение (pull-to-refresh)
		e.preventDefault();
		e.stopPropagation();
	};

	const handleTouchEnd = () => {
		touchStartY.current = null;
	};

	const resetZoom = () => {
		setZoom(1);
	};

	// Отключаем pull-to-refresh для всего body (можно вынести в layout)
	useEffect(() => {
		const preventPullToRefresh = (e: TouchEvent) => {
			if (e.target === document.body) {
				e.preventDefault();
			}
		};
		document.body.addEventListener("touchstart", preventPullToRefresh, { passive: false });
		document.body.addEventListener("touchmove", preventPullToRefresh, { passive: false });

		return () => {
			document.body.removeEventListener("touchstart", preventPullToRefresh);
			document.body.removeEventListener("touchmove", preventPullToRefresh);
		};
	}, []);

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
			<div
				className="w-full h-[390px] md:h-[375px] max-w-[375px] overflow-hidden rounded-[16px] relative mb-4"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onClick={resetZoom}
				style={{
					cursor: "zoom-in",
					touchAction: "none",
				}}
			>
				<div
					ref={imageRef}
					className="w-full h-full"
					style={{
						transform: `scale(${zoom})`,
						transformOrigin: "center",
						transition: "transform 0.1s ease-out",
						overflow: "hidden",
					}}
				>
					<Image
						src={activeImage.url}
						alt={product.title || "Product image"}
						fill
						className="object-cover"
						priority
					/>
				</div>
			</div>
		</section>
	);
};

export default HeroDetail;