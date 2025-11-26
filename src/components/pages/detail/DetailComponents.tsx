import React from "react";
import HeroDetail from "./hero/Hero";
import AccordionDetail from "./accordion/Accordion";
import SizeDetail from "./size/Size";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";

const DetailComponents = () => {
	return (
		<>
			<PageHeader
				href={PAGE.HOME}
				className="hidden md:flex"
				title="Подгузники"
			/>
			<HeroDetail />
			<SizeDetail />
			<AccordionDetail />
		</>
	);
};

export default DetailComponents;
