"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductDetail } from "@/redux/hooks/product";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import HeroDetail from "./hero/Hero";
import SizeDetail from "./size/Size";
import Review from "./review/Review";
import { useOrders } from "@/redux/hooks/useOrders";
import { useNotifications } from "@/redux/hooks/useNotifications";

const DetailComponents = () => {
	const params = useParams();
	const id = Number(params.id);

	const { data: productData } = useProductDetail(id);
	const product = productData?.detail;

	// const { data: ordersData } = useOrders();
	// const { data: not } =  useNotifications();

	// console.log("ordersData", ordersData);
	// console.log("notifications", not);
	


	if (!product) return <div></div>;

	return (
		<>
			<PageHeader
				href={PAGE.HOME}
				className="hidden md:flex"
				title={product.title}
			/>

			<div className="flex md:flex-row flex-col p-4 gap-4">
				<HeroDetail product={product} />
				<SizeDetail product={product} productId={id} />
			</div>
			<Review productId={id} />
		</>
	);
};

export default DetailComponents;
