// components/Stories.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import img_story from "@/assets/images/story.png";
import { IoMdClose } from "react-icons/io";
import con from "@/assets/images/story-content.png";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

// Определяем тип для истории
type Story = {
  id: number;
  title: string;
  image: string | StaticImport; // или StaticImageData, если используете TypeScript 5.5+
  content: string | StaticImport;
  href?: string;
};

const stories: Story[] = [
  {
    id: 1,
    title: "Советы",
    image: img_story,
    content: con,
  },
  {
    id: 2,
    title: "Скидки",
    image: img_story,
    content: con,
  },
  {
    id: 3,
    title: "Наш бренд",
    image: img_story,
    content: con,
  },
  {
    id: 4,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 5,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 6,
    title: "Уход",
    image: img_story,
    content: con,
  },
  
  {
    id: 7,
    title: "Скидки",
    image: img_story,
    content: con,
  },
  {
    id: 8,
    title: "Наш бренд",
    image: img_story,
    content: con,
  },
  {
    id: 9,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 10,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 12,
    title: "Уход",
    image: img_story,
    content: con,
  }
  ,
  {
    id: 13,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 14,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 15,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 16,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 17,
    title: "Уход",
    image: img_story,
    content: con,
  },
  {
    id: 18,
    title: "Уход",
    image: img_story,
    content: con,
  }
];

const Stories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);

  const openModal = (story: Story) => {
    setCurrentStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStory(null);
  };

  return (
    <section className="pt-6">
      <div
        className="flex items-start gap-4 overflow-x-auto scrollbar-hide   pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)] pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center min-w-[80px] group"
          >
            <button
              onClick={() => openModal(story)}
              className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full"></div>
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

      {/* Модальное окно */}
      {isModalOpen && currentStory && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        >
          <div className="bg-black py-6 rounded-lg max-w-md w-full text-center">
            <div className="flex justify-between px-6 w-full items-center">
              <Image
                width={50}
                height={50}
                className="rounded-full object-cover border border-white"
                src={currentStory.image}
                alt="img"
              />
              <button onClick={closeModal} className="text-white">
                <IoMdClose size={23} />
              </button>
            </div>

            <div className="w-full px-2 py-4">
              <div className="w-full bg-slate-400 h-[2px] rounded-full"></div>
            </div>

            <Image
              className="w-full h-full max-h-[500px] object-cover rounded-none"
              src={currentStory.content}
              alt="img"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Stories;