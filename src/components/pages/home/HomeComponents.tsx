import React from "react";
import Stories from "./stories/Stories";
import SubscriptionsHome from "./subscriptions/SubscriptionsHome";
import CategoryHome from "./category/CategoryHome";
import Featured from "./featured/Featured";
import SubscriptionSlider from "./subscription-slider/SubscriptionSlider";
import PageHeader from "@/components/ui/heading/PageHeader";

const HomeComponents = () => {
	return (
		<>
			<PageHeader title="Главная" className="md:flex hidden"/>
			<Stories />
			<SubscriptionSlider />
			<SubscriptionsHome />
			<CategoryHome />
			<Featured />
		</>
	);
};

export default HomeComponents;
