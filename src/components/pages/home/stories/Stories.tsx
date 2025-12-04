// components/Stories.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import img_story from "@/assets/images/story.png";
import { IoMdClose } from "react-icons/io";
import con from "@/assets/images/kids3.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Description } from "@/components/ui/text/Description";

type Story = {
	id: number;
	title: string;
	image: string | StaticImport;
	content: string | StaticImport;
	href?: string;
};

const stories: Story[] = [
	{ id: 1, title: "Советы", image: img_story, content: con },
	{ id: 2, title: "Скидки", image: img_story, content: con },
	{ id: 3, title: "Наш бренд", image: img_story, content: con },
	{ id: 4, title: "Уход", image: img_story, content: con },
	{ id: 5, title: "Уход", image: img_story, content: con },
	{ id: 6, title: "Уход", image: img_story, content: con },
	{ id: 7, title: "Скидки", image: img_story, content: con },
	{ id: 8, title: "Наш бренд", image: img_story, content: con },
	{ id: 9, title: "Уход", image: img_story, content: con },
	{ id: 10, title: "Уход", image: img_story, content: con },
	{ id: 12, title: "Уход", image: img_story, content: con },
	{ id: 13, title: "Уход", image: img_story, content: con },
	{ id: 14, title: "Уход", image: img_story, content: con },
	{ id: 15, title: "Уход", image: img_story, content: con },
	{ id: 16, title: "Уход", image: img_story, content: con },
	{ id: 17, title: "Уход", image: img_story, content: con },
	{ id: 18, title: "Уход", image: img_story, content: con },
];

const Stories = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentStory, setCurrentStory] = useState<Story | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startY, setStartY] = useState(0);
	const [dragOffsetY, setDragOffsetY] = useState(0);

	const openModal = (story: Story) => {
		setCurrentStory(story);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentStory(null);
		setIsDragging(false);
		setDragOffsetY(0);
	};

	const handleTouchStart = (e: React.TouchEvent) => {
		setStartY(e.touches[0].clientY);
		setIsDragging(true);
		setDragOffsetY(0);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDragging) return;
		const currentY = e.touches[0].clientY;
		const diff = currentY - startY;
		if (diff > 0) {
			setDragOffsetY(diff);
		}
	};

	const handleTouchEnd = () => {
		if (!isDragging) return;
		setIsDragging(false);
		if (dragOffsetY > 100) {
			closeModal();
		} else {
			setDragOffsetY(0);
		}
	};

	return (
		<section className="pt-6">
			<div
				className="flex items-start gap-1 overflow-x-auto scrollbar-hide py-1 pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)] pb-3"
				style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
				{stories.map((story) => (
					<div
						key={story.id}
						className="flex flex-col items-center min-w-[70px] group">
						<button
							onClick={() => openModal(story)}
							className="relative w-16 h-16 rounded-full overflow-hidden border-1 border-white shadow-sm group-hover:scale-105 transition-transform focus:outline-none">
							<div className="absolute inset-0 bg-gradient-to-br from-[#5900ff] via-[#ffc400] to-[#ff00ff] rounded-full"></div>
							<Image
								src={story.image}
								alt={story.title}
								width={58}
								height={58}
								className="absolute top-1/2 left-1/2 border-white border-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 object-contain"
							/>
						</button>
						<span className="text-xs font-medium text-gray-700 mt-2 text-center max-w-[80px] truncate">
							{story.title}
						</span>
					</div>
				))}
			</div>

			{isModalOpen && currentStory && (
				<div
					className="fixed inset-0 md:bg-[#131313] bg-black md:py-10 py-0 flex items-center justify-center z-50"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}>
					<div
						className="bg-black py-10 rounded-lg max-w-md md:w-full w-full h-full text-center flex flex-col justify-between transition-transform duration-200"
						style={{ transform: `translateY(${dragOffsetY}px)` }}>
						<div className="w-full">
							<div className="w-full px-2 pb-4">
								<div className="w-full bg-slate-400 h-[2px] rounded-full"></div>
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

						<div className="w-full max-h-[500px] overflow-hidden flex justify-start items-start">
							<Image
								className="w-full h-auto object-contain rounded-none"
								src={currentStory.content}
								alt="story content"
							/>
						</div>

						<div  /> 
					</div>
				</div>
			)}
		</section>
	);
};

export default Stories;
