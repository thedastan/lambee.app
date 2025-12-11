// components/Stories.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { Description } from "@/components/ui/text/Description";
import { useStories } from "@/redux/hooks/stories";

type Story = {
	id: number;
	title: string;
	image: string; // аватар для модалки
	content: string; // основной контент для модалки
	href?: string;
};

const Stories = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStory, setCurrentStory] = useState<Story | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [dragOffsetY, setDragOffsetY] = useState(0);
	const [progress, setProgress] = useState(0);
	const dragOffsetYRef = useRef(0);
	const modalRef = useRef<HTMLDivElement>(null);

	const { data, isLoading } = useStories();

	const openModal = (index: number) => {
		const detail = data!.detail[index];
		const story: Story = {
			id: detail.id,
			title: detail.title,
			image: detail.preview,
			content: detail.file,
		};
		setCurrentStory(story);
		setCurrentIndex(index);
		setIsModalOpen(true);
		setDragOffsetY(0);
		dragOffsetYRef.current = 0;
		setProgress(0);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentStory(null);
		setCurrentIndex(null);
		setProgress(0);
	};

	const nextStory = () => {
		if (currentIndex === null) return;
		const nextIndex = currentIndex + 1;
		if (nextIndex < data!.detail.length) {
			openModal(nextIndex);
		} else {
			closeModal();
		}
	};

	const prevStory = () => {
		if (currentIndex === null) return;
		const prevIndex = currentIndex - 1;
		if (prevIndex >= 0) {
			openModal(prevIndex);
		}
	};

	// Swipe down для закрытия
	useEffect(() => {
		if (!isModalOpen || !modalRef.current) return;

		let startY = 0;
		let isDragging = false;

		const handleTouchStart = (e: TouchEvent) => {
			if (e.touches.length !== 1) return;
			isDragging = true;
			startY = e.touches[0].clientY;
			dragOffsetYRef.current = 0;
			setDragOffsetY(0);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (!isDragging || e.touches.length !== 1) return;
			const diff = e.touches[0].clientY - startY;
			if (diff > 0) {
				dragOffsetYRef.current = diff;
				setDragOffsetY(diff);
				e.preventDefault();
			}
		};

		const handleTouchEnd = () => {
			if (!isDragging) return;
			isDragging = false;
			const finalOffset = dragOffsetYRef.current;
			setDragOffsetY(0);
			if (finalOffset > 100) closeModal();
		};

		const modal = modalRef.current;
		modal.addEventListener("touchstart", handleTouchStart, { passive: true });
		modal.addEventListener("touchmove", handleTouchMove, { passive: false });
		modal.addEventListener("touchend", handleTouchEnd, { passive: true });

		return () => {
			modal.removeEventListener("touchstart", handleTouchStart);
			modal.removeEventListener("touchmove", handleTouchMove);
			modal.removeEventListener("touchend", handleTouchEnd);
		};
	}, [isModalOpen]);

	// Прогресс-бар анимация
	useEffect(() => {
		if (!isModalOpen) return;
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					nextStory();
					return 0;
				}
				return prev + 1;
			});
		}, 50); // 50ms на 1%
		return () => clearInterval(interval);
	}, [isModalOpen, currentIndex]);

	if (isLoading) {
		return (
			<section
				className="flex items-start gap-1 overflow-x-auto scrollbar-hide pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)] pb-3 py-6"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{Array.from({ length: 30 }).map((_, i) => (
					<div key={i} className="">
						<div className="p-1 bg-white border border-[#E4E4E7] w-16 h-16 rounded-full flex items-center gap-3 animate-pulse">
							<div className="w-full h-full rounded-full bg-gray-200" />
						</div>
						<div className="w-full h-3 rounded-[4px] mt-4 bg-gray-200" />
					</div>
				))}
			</section>
		);
	}

	return (
		<section className="pt-6">
			<div
				className="flex items-start gap-1 overflow-x-auto scrollbar-hide py-1 pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)] pb-3"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{data?.detail.map((el, index) => (
					<div
						key={el.id}
						className="flex flex-col items-center min-w-[70px] group">
						<button
							onClick={() => openModal(index)}
							className="relative w-16 h-16 rounded-full overflow-hidden border-1 border-white shadow-sm group-hover:scale-105 transition-transform focus:outline-none">
							<div className="absolute inset-0 bg-gradient-to-br from-[#5900ff] via-[#ffc400] to-[#ff00ff] rounded-full"></div>
							<Image
								src={el.preview}
								alt={el.title}
								width={58}
								height={58}
								className="absolute top-1/2 left-1/2 text-xs font-medium text-gray-700 border-white border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 object-contain"
							/>
						</button>
						<span className="text-xs font-medium text-gray-700 mt-2 text-center max-w-[80px] truncate">
							{el.title}
						</span>
					</div>
				))}
			</div>

			{isModalOpen && currentStory && (
				<div
					ref={modalRef}
					className="fixed inset-0 md:bg-[#131313] bg-black md:py-10 py-0 flex items-center justify-center z-50 touch-none">
					<div
						className="bg-black py-10 rounded-lg max-w-md md:w-full w-full h-full text-center flex flex-col justify-between transition-transform duration-200 relative"
						style={{ transform: `translateY(${dragOffsetY}px)` }}>
						{/* Прогресс-бар */}
						<div className="">
							<div className="w-full px-2 pb-4">
								<div className="w-full bg-slate-400 h-[2px] rounded-full relative overflow-hidden">
									<div
										className="bg-white h-full rounded-full absolute left-0 top-0 transition-all duration-50"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>

							<div className="flex justify-between px-6 w-full items-center">
								<div className="flex items-center gap-2">
									<Image
										width={50}
										height={50}
										className="rounded-full object-cover border border-white"
										src={currentStory.image}
										alt="avatar"
									/>
									<Description className="text-white">
										{currentStory.title}
									</Description>
								</div>
								<button onClick={closeModal} className="text-white">
									<IoMdClose size={23} />
								</button>
							</div>
						</div>

						{/* Контент + кликабельные зоны */}
						<div className="relative flex-1 max-h-[500px] overflow-hidden">
							<img
								className="w-full h-auto object-contain rounded-none"
								src={currentStory.content}
								alt="story content"
							/>

							{/* Левая зона */}
							<div
								className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
								onClick={prevStory}
							/>

							{/* Правая зона */}
							<div
								className="absolute top-0 right-0 w-1/2 h-full cursor-pointer z-10"
								onClick={nextStory}
							/>
						</div>

						<div />
					</div>
				</div>
			)}
		</section>
	);
};

export default Stories;
