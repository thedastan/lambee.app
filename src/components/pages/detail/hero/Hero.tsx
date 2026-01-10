"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Detail, DetailPro } from "@/redux/models/product.model";

interface HeroDetailProps {
	product: DetailPro;
}

const HeroDetail = ({ product }: HeroDetailProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [scale, setScale] = useState(1);

	const startY = useRef(0);
	const dragging = useRef(false);

	const images = product.images || [];
	const activeImage = images[activeIndex];

	if (!images.length) return <div>Изображения недоступны</div>;

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
							${index === activeIndex
								? "border-[#0071E3]"
								: "border-[#E4E4E7]"}`}
					>
						<Image src={img.url} alt="" fill className="object-cover" />
					</button>
				))}
			</div>

			{/* main image */}
			<div
				className="relative w-full h-[390px] max-w-[375px] overflow-hidden rounded-[16px]"
				style={{ touchAction: "none" }} // ❗ важно
				onPointerDown={onPointerDown}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerLeave={onPointerUp}
			>
				<Image
					src={activeImage.url}
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
