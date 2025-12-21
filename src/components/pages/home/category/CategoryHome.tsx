"use client";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useCategories } from "@/redux/hooks/categories";
import Image from "next/image";
import { BsChevronRight } from "react-icons/bs";

const CategoryHome = () => {
	const { data, isLoading } = useCategories();

	if (isLoading) {
		return (
			<section className="pb-6 px-4">
				<div className="pb-4 h-7 w-48 bg-gray-200 rounded animate-pulse"></div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="p-3 bg-white border border-[#E4E4E7] rounded-[8px] flex items-center gap-3 animate-pulse">
							<div className="w-[48px] h-[48px] rounded-[8px] bg-gray-200" />
							<div className="h-5 w-3/4 bg-gray-200 rounded" />
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="pb-6 px-4">
			<TitleComponent className="pb-4">Категории товаров</TitleComponent>
			<div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
				{data?.detail.map((el, index) => (
					<div
						key={index}
						className="p-3 bg-white border border-[#E4E4E7] rounded-[8px] flex justify-between items-center gap-3">
						<div className="flex items-center gap-3">
							<div className=" relative overflow-hidden rounded-[8px] w-[48px] h-[48px] min-w-[48px] max-w-[48px]">
								<Image
									fill
									objectFit="cover"
									src={el.image}
									alt="category-img"
								/>
							</div>
							<Title>{el.title}</Title>
						</div>

						<BsChevronRight />
					</div>
				))}
			</div>
		</section>
	);
};

export default CategoryHome;
