"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSound } from "react-icons/ai";
import { Description } from "@/components/ui/text/Description";
import { useStories } from "@/redux/hooks/stories";
import { GoShareAndroid } from "react-icons/go";
import Button from "@/components/ui/button/Button";
import LinkButton from "@/components/ui/button/LinkButton";

type Story = {
	id: number;
	title: string;
	image: string;
	content: string;
	type: "image" | "video";
	href?: string;
};

const STORAGE_KEY = "viewedStories";

// ✅ Вспомогательная функция для чтения (только при старте)
const getViewedStoriesFromStorage = (): Set<number> => {
	if (typeof window === "undefined") return new Set();
	const data = localStorage.getItem(STORAGE_KEY);
	if (!data) return new Set();
	try {
		return new Set(JSON.parse(data));
	} catch {
		return new Set();
	}
};

const Stories = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStory, setCurrentStory] = useState<Story | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number | null>(null);
	const [dragOffsetY, setDragOffsetY] = useState(0);
	const [progress, setProgress] = useState(0);
	const dragOffsetYRef = useRef(0);
	const modalRef = useRef<HTMLDivElement>(null);
	const [muted, setMuted] = useState(true);
	const videoRef = useRef<HTMLVideoElement>(null);

	// ✅ Храним просмотренные сторисы в состоянии
	const [viewedStories, setViewedStories] = useState<Set<number>>(new Set());

	const { data, isLoading } = useStories();

	console.log(data);

	// ✅ Инициализируем при монтировании
	useEffect(() => {
		setViewedStories(getViewedStoriesFromStorage());
	}, []);

	const getFileType = (url: string): "image" | "video" => {
		const lower = url.toLowerCase();
		if (lower.match(/\.(mp4|webm|mov|avi|mkv)$/)) {
			return "video";
		}
		return "image";
	};

	// ✅ Обновлённая функция: обновляет и state, и localStorage
	const markStoryAsViewed = (id: number) => {
		setViewedStories((prev) => {
			const newSet = new Set(prev);
			newSet.add(id);
			if (typeof window !== "undefined") {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newSet)));
			}
			return newSet;
		});
	};

	const openModal = (index: number) => {
		const detail = data!.detail[index];
		const story: Story = {
			id: detail.id,
			title: detail.title,
			image: detail.preview,
			content: detail.file,
			type: getFileType(detail.file),
		};
		setCurrentStory(story);
		setCurrentIndex(index);
		setIsModalOpen(true);
		setDragOffsetY(0);
		dragOffsetYRef.current = 0;
		setProgress(0);
	};

	const closeModal = () => {
		if (currentStory) {
			markStoryAsViewed(currentStory.id);
		}
		setIsModalOpen(false);
		setCurrentStory(null);
		setCurrentIndex(null);
		setProgress(0);
	};

	const nextStory = () => {
		if (currentIndex === null) return;
		const nextIndex = currentIndex + 1;
		if (nextIndex < data!.detail.length) {
			// ✅ Помечаем текущий как просмотренный перед переходом
			if (currentStory) {
				markStoryAsViewed(currentStory.id);
			}
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

	// ... остальные эффекты без изменений ...

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

	useEffect(() => {
		if (!isModalOpen || currentIndex === null) return;

		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					if (currentStory) {
						markStoryAsViewed(currentStory.id);
					}
					nextStory();
					return 0;
				}
				return prev + 1;
			});
		}, 50);

		return () => clearInterval(interval);
	}, [isModalOpen, currentIndex, currentStory]);

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

	// ✅ Теперь viewedStories — реактивное состояние
	return (
		<section className="pt-6">
			<div
				className="flex items-start gap-1 overflow-x-auto scrollbar-hide py-1 pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)] pb-3"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{data?.detail.map((el, index) => {
					const isViewed = viewedStories.has(el.id); // ✅ реактивно!
					return (
						<div
							key={el.id}
							className="flex flex-col items-center min-w-[70px] group">
							<button
								onClick={() => openModal(index)}
								className="relative w-16 h-16 flex justify-center items-center rounded-full overflow-hidden border-1 border-white shadow-sm group-hover:scale-105 transition-transform focus:outline-none">
								<div
									className={`absolute inset-0 rounded-full ${
										isViewed
											? "bg-gradient-to-br from-[#5900ff67] via-[#ffc40056] to-[#ff00ff4f]"
											: "bg-gradient-to-br from-[#5900ff] via-[#ffc400] to-[#ff00ff]"
									}`}></div>
								<div className="w-[57px] h-[57px] border-white border-2 rounded-full relative overflow-hidden flex justify-center items-center">
									<Image
										src={el.preview}
										alt={el.title}
										fill
										className="object-cover"
									/>
								</div>
							</button>
							<span className="text-xs font-medium text-gray-700 mt-2 text-center max-w-[80px] truncate">
								{el.title}
							</span>
						</div>
					);
				})}
			</div>

			{isModalOpen && currentStory && (
				// ... модалка без изменений ...
				<div
					ref={modalRef}
					className="fixed inset-0 md:bg-[#131313] bg-black md:py-10 py-0 flex items-center justify-center z-50 touch-none">
					<div
						className="bg-black overflow-hidden rounded-lg max-w-md md:w-full w-full h-full text-center flex flex-col justify-between transition-transform duration-200 relative"
						style={{ transform: `translateY(${dragOffsetY}px)` }}>
						<div className=" absolute top-0 left-0 w-full z-10 mt-10">
							<div className="w-full  px-2 pb-4 top-0 left-0">
								<div className="w-full bg-[#00000044] h-[2px] rounded-full relative overflow-hidden">
									<div
										className="bg-white h-full rounded-full absolute left-0 top-0 transition-all duration-50"
										style={{ width: `${progress}%` }}
									/>
								</div>
							</div>

							<div className="flex justify-between px-6 w-full items-center">
								<div className="flex items-center gap-1">
									<div className=" relative w-10 h-10 rounded-full overflow-hidden border-2 border-white flex justify-center items-center">
										<Image
											fill
											objectFit="cover"
											src={currentStory.image}
											alt="ava"
										/>
									</div>
									<Description className="text-[#ffffff] shadow-sm">{currentStory.title}</Description>
								</div>

								<button
									onClick={closeModal}
									className="text-white bg-[#00000067] rounded-full p-2">
									<IoMdClose size={23} />
								</button>
							</div>
						</div>

						<div className="absolute bottom-8 left-0 w-full z-30 px-[10px]">
							<LinkButton href="/asim" className="w-full">
								Заказать
							</LinkButton>
						</div>

						<div className="relative flex  h-full   overflow-hidden">
							{currentStory.type === "image" ? (
								<img
									className="w-full h-auto object-cover"
									src={currentStory.content}
									alt="story content"
								/>
							) : currentStory.type === "video" ? (
								<>
									<video
										ref={videoRef}
										className="w-full h-full object-cover"
										src={currentStory.content}
										autoPlay
										muted={muted}
										playsInline
										loop
									/>

									{muted && (
										<button
											onClick={() => setMuted(false)}
											className="absolute bottom-20 right-4 z-20 border border-white bg-[#00000044] bg-opacity-50 rounded-full p-2"
											aria-label="Включить звук">
											<AiOutlineSound size={22} color="white" />
										</button>
									)}
								</>
							) : (
								<iframe
									className="w-full h-full"
									src={currentStory.content}
									title="Embedded story"
									allow="autoplay; fullscreen; picture-in-picture"
									allowFullScreen
								/>
							)}

							<div
								className="absolute top-0 left-0 w-1/2 h-full cursor-pointer z-10"
								onClick={prevStory}
							/>
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
