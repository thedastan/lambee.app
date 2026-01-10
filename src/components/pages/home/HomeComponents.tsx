import Stories from "./stories/Stories";
import CategoryHome from "./category/CategoryHome";
import PageHeader from "@/components/ui/heading/PageHeader";
import Banner from "./banner/Banner";
import HomeCards from "./featured/HomeCards";
import FollowCardHome from "./subscriptions/FollowCardHome";

const HomeComponents = () => {
	return (
		<>
			<PageHeader title="Главная" className="md:flex hidden" />

			<Stories />
			<Banner />
			<FollowCardHome />
			<CategoryHome />
			<HomeCards />
		</>
	);
};

export default HomeComponents;
