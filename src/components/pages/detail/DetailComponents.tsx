"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useProductDetail } from "@/redux/hooks/product";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import HeroDetail from "./hero/Hero";
import SizeDetail from "./size/Size";
import Review from "./review/Review";
import { DetailPro, Variant } from "@/redux/models/product.model"; // ← Variant, не Detail!

const DetailComponents = () => {
	const params = useParams();
	const searchParams = useSearchParams();
	const id = Number(params.id);

	const { data: productData } = useProductDetail(id);
	const product = productData?.detail; // тип: DetailPro | undefined

	const [isClient, setIsClient] = useState(false);
	const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null); // ← Variant!

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (product) {
			const initialVariantIdFromUrl = searchParams.get("variant");
			let variant: Variant | null = null;

			if (initialVariantIdFromUrl) {
				const idFromUrl = Number(initialVariantIdFromUrl);
				if (!isNaN(idFromUrl)) {
					variant = product.variants.find(v => v.id === idFromUrl) || null;
				}
			}

			if (!variant && product.variants.length > 0) {
				variant = product.variants[0];
			}

			setSelectedVariant(variant);
		}
	}, [product, searchParams]);

	const handleVariantChange = (variant: Variant) => { // ← Variant!
		setSelectedVariant(variant);
	};

	if (!product) {
		return <div className="p-4"></div>;
	}

	return (
		<>
			<PageHeader
				href={PAGE.HOME}
				className="hidden md:flex"
				title={product.title}
			/>

			<div className="flex md:flex-row flex-col p-4 gap-4">
				{isClient && selectedVariant ? (
					<HeroDetail product={product} selectedVariant={selectedVariant} />
				) : (
					<div className="w-full max-w-[435px] h-[390px] bg-gray-100 rounded-[16px]" />
				)}
				<SizeDetail
					product={product}
					productId={id}
					onVariantChange={handleVariantChange}
				/>
			</div>
			<Review productId={id} />
		</>
	);
};

export default DetailComponents;