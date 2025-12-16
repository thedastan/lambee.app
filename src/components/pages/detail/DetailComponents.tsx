"use client";
import HeroDetail from "./hero/Hero";
import AccordionDetail from "./accordion/Accordion";
import SizeDetail from "./size/Size";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import { useProductDetail } from "@/redux/hooks/product";
import { useParams } from "next/navigation";
import { Detail } from "@/redux/models/product.model";

type ProductDetailResponse = {
	detail: Detail;
};

const DetailComponents = () => {
	const params = useParams();
	const id = Number(params.id);

	const { data } =
		useProductDetail(id) as { data?: ProductDetailResponse; isLoading: boolean };

	 

	const product = data?.detail;

	if (!product) return <div></div>;

	return (
		<>
			<PageHeader
				href={PAGE.HOME}
				className="hidden md:flex"
				title={product.title}
			/>
			<HeroDetail product={product} />
			<SizeDetail  product={product}/>
			<AccordionDetail  />
		</>
	);
};

export default DetailComponents;
