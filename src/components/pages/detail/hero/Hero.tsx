"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Variant, DetailPro } from "@/redux/models/product.model"; // ← исправленный импорт

interface HeroDetailProps {
	product: DetailPro;
	selectedVariant: Variant;
}

const HeroDetail = ({ product, selectedVariant }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [scale, setScale] = useState(1);
	const [isClient, setIsClient] = useState(false);

	const startY = useRef(0);
	const dragging = useRef(false);

	// Ждём, пока компонент точно на клиенте
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Сбрасываем индекс при смене варианта
	useEffect(() => {
		setActiveIndex(0);
		setScale(1);
	}, [selectedVariant.id]);

	const images = selectedVariant.images || [];
	const activeImage = images[activeIndex];

	// Защита: если нет изображений — показываем заглушку
	if (!isClient) {
		return <div className="w-full max-w-[435px] h-[390px] bg-gray-100 rounded-[16px]" />;
	}

	if (images.length === 0) {
		return (
			<div className="w-full max-w-[435px] h-[390px] flex items-center justify-center bg-gray-100 rounded-[16px]">
				Изображение недоступно
			</div>
		);
	}

	if (!activeImage || !activeImage.url) {
		return (
			<div className="w-full max-w-[435px] h-[390px] flex items-center justify-center bg-gray-100 rounded-[16px]">
				Некорректное изображение
			</div>
		);
	}

	const onPointerDown = (e: React.PointerEvent) => {
		dragging.current = true;
		startY.current = e.clientY;
	};

	const onPointerMove = (e: React.PointerEvent) => {
		if (!dragging.current) return;
		const delta = startY.current - e.clientY;
		const nextScale = 1 + delta / 250;
		setScale(Math.min(Math.max(nextScale, 1), 1.5));
	};

	const onPointerUp = () => {
		dragging.current = false;
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
						className={`relative w-[40px] h-[40px] rounded overflow-hidden border transition
							${index === activeIndex ? "border-[#0071E3]" : "border-[#E4E4E7]"}`}
					>
						<Image
							src={img.url.trim()}
							alt={`Thumbnail ${index + 1}`}
							fill
							className="object-cover"
						/>
					</button>
				))}
			</div>

			{/* main image */}
			<div
				className="relative w-full h-[390px] max-w-[375px] overflow-hidden rounded-[16px]"
				style={{ touchAction: "none" }}
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerLeave={onPointerUp}
			>
				<Image
					src={activeImage.url.trim()}
					alt={product.title || "Product image"}
					fill
					priority
					className="object-cover transition-transform duration-100 will-change-transform"
					style={{ transform: `scale(${scale})` }}
				/>
			</div>
		</section>
	);
};

export default HeroDetail;