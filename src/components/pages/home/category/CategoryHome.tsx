"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { useProduct } from "@/redux/hooks/product";
import { BsChevronRight } from "react-icons/bs";

const HomeCategories = () => {
	const { data, isLoading } = useProduct();

	const categoriesWithFirstProduct = useMemo(() => {
		if (!data?.detail) return [];

		const categoryMap = new Map<number, { category: any; firstProduct: any }>();

		data.detail.forEach((product) => {
			if (product.category && !categoryMap.has(product.category.id)) {
				categoryMap.set(product.category.id, {
					category: product.category,
					firstProduct: product,
				});
			}
		});

		return Array.from(categoryMap.values());
	}, [data]);

	if (isLoading) {
		return (
			<section className="pb-10 px-4">
				<div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-4" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="p-3 bg-white border border-[#E4E4E7] rounded-[16px] flex items-center gap-3 animate-pulse"
						>
							<div className="w-[48px] h-[48px] bg-gray-200 rounded-[8px]" />
							<div className="h-5 w-32 bg-gray-200 rounded" />
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className="pb-10 px-4">
			<TitleComponent className="pb-4">Категории товаров</TitleComponent>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
				{categoriesWithFirstProduct.map(({ category, firstProduct }) => {
					const firstVariant = firstProduct.variants[0];
					const href = firstVariant
						? `/detail/${firstProduct.id}?variant=${firstVariant.id}`
						: "/";  

					return (
						<Link
							key={category.id}
							href={href}
							className="p-3 bg-white border border-[#E4E4E7] rounded-[8px] flex justify-between items-center gap-3"
						>
							<div className="flex items-center gap-3">
								<div className="relative overflow-hidden rounded-[8px] w-[48px] h-[48px] min-w-[48px] max-w-[48px]">
									<Image
										fill
										style={{ objectFit: "cover" }}
										src={category.image}
										alt={category.title}
									/>
								</div>
								<Title>{category.title}</Title>
							</div>

							<BsChevronRight />
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default HomeCategories;