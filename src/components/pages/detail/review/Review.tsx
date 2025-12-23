"use client";

import { useState, useMemo } from "react";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IoStarSharp } from "react-icons/io5";
import { useProductReviews } from "@/redux/hooks/product"; // без page
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

interface ReviewProps {
	productId: number;
}

const Review = ({ productId }: ReviewProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useProductReviews(productId); // ← без page

	const allReviews = data?.detail.results || [];
	const reviewCount = allReviews.length;
	const REVIEWS_PER_PAGE = 5;

	// Пагинация на фронте
	const totalPages = Math.ceil(reviewCount / REVIEWS_PER_PAGE);
	const paginatedReviews = useMemo(() => {
		const start = (currentPage - 1) * REVIEWS_PER_PAGE;
		return allReviews.slice(start, start + REVIEWS_PER_PAGE);
	}, [allReviews, currentPage]);

	const formatDate = (isoDate: string) => {
		return format(new Date(isoDate), "LLLL d, yyyy", { locale: ru });
	};

	const renderStars = (rating: string) => {
		const stars = Number(rating);
		const fullStars = Math.floor(stars);
		const hasHalf = stars % 1 >= 0.5;
		const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

		return (
			<div className="flex items-center gap-0.5">
				{Array(fullStars)
					.fill(0)
					.map((_, i) => (
						<IoStarSharp key={`full-${i}`} className="text-black" />
					))}
				{hasHalf && <IoStarSharp className="text-black opacity-50" />}
				{Array(emptyStars)
					.fill(0)
					.map((_, i) => (
						<IoStarSharp key={`empty-${i}`} className="text-gray-300" />
					))}
			</div>
		);
	};

	const handlePrev = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
	};

	if (!productId) return null;

	if (isLoading) {
		return (
			<div className="p-4">
				<div className="animate-pulse">
					<div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
					<div className="space-y-4">
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className="flex border-b pb-3 gap-4">
								<div className="flex-1 space-y-2">
									<div className="h-4 bg-gray-200 rounded w-1/4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
								</div>
								<div className="flex-1">
									<div className="h-4 bg-gray-200 rounded w-full"></div>
									<div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col md:flex-row gap-4 p-4">
			<div className="text-center flex md:flex-col flex-row md:py-4 py-0 md:justify-start justify-between md:items-start items-center gap-1 w-full max-w-[435px]">
				<TitleComponent className="md:!text-[28px] !text-[16px] w-full max-w-[100px] md:max-w-full text-start font-[400]">
					Что думают родители:
				</TitleComponent>
				<div className="flex md:flex-row flex-col md:items-center items-start gap-1 md:bg-transparent bg-white border md:border-none rounded-[8px] md:p-0 p-2">
					<div className="flex items-center gap-1">
						<IoStarSharp />
						<IoStarSharp />
						<IoStarSharp />
						<IoStarSharp />
						<IoStarSharp />
					</div>
					<span className="text-[#515151] md:ml-2 ml-0">
						{reviewCount.toLocaleString()} отзывов
					</span>
				</div>
			</div>

			<div className="w-full flex flex-col gap-3 border bg-white p-4 rounded-[8px]">
				{paginatedReviews.length === 0 ? (
					<div className="text-gray-500 text-center py-6">
						Отзывов пока нет.
					</div>
				) : (
					paginatedReviews.map((review) => {
						const userName =
							review.user.name || review.user.surname
								? `${review.user.name} ${review.user.surname}`.trim()
								: "Аноним";

						return (
							<div
								key={review.id}
								className="border-b pb-3 flex flex-col md:flex-row justify-between md:items-start gap-3 md:gap-4">
								<div className="flex flex-col gap-1">
									<Title>{userName}</Title>
									{renderStars(review.rating)}
									<Description className="text-[#515151] text-sm">
										{formatDate(review.created_at)}
									</Description>
								</div>
								<Description className="text-gray-700 w-full max-w-[310px]">
									{review.text}
								</Description>
							</div>
						);
					})
				)}

				{/* Пагинация */}
				{totalPages > 1 && (
					<div className="w-full flex justify-center items-center gap-2 pt-2">
						<button
							onClick={handlePrev}
							disabled={currentPage === 1}
							className={`p-1 rounded-full ${
								currentPage === 1 ? "opacity-30" : "hover:bg-gray-100"
							}`}>
							<GoChevronLeft size={22} color="#515151" />
						</button>

						<span className="text-[#515151] min-w-[18px] text-center">
							{currentPage}
						</span>

						<button
							onClick={handleNext}
							disabled={currentPage === totalPages}
							className={`p-1 rounded-full ${
								currentPage === totalPages ? "opacity-30" : "hover:bg-gray-100"
							}`}>
							<GoChevronRight size={22} color="#515151" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Review;
