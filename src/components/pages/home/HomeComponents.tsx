import React from "react";
import Stories from "./stories/Stories";
import SubscriptionsHome from "./subscriptions/SubscriptionsHome";
import CategoryHome from "./category/CategoryHome";
import Featured from "./featured/Featured";
import SubscriptionSlider from "./subscription-slider/SubscriptionSlider";

const HomeComponents = () => {
	return (
		<>
			<Stories />
			<SubscriptionSlider/>
			<SubscriptionsHome />
			<CategoryHome />
			<Featured />
		</>
	);
};

export default HomeComponents;
