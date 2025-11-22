import FollowSvg from "@/assets/svg/follow";
import HomeSvg from "@/assets/svg/home";
import MenuSvg from "@/assets/svg/menu";
import MessageSvg from "@/assets/svg/message";
import UserSvg from "@/assets/svg/user";
import BasketSvg from "@/assets/svg/BasketSvg";

import { PAGE } from "@/config/pages/public-page.config";

export const navbar = [
	{
		icon: HomeSvg,
		name: "Главная",
		link: PAGE.HOME,
	},
	{
		icon: MenuSvg,
		name: "Мои заказы",
		link: PAGE.MYORDERS,
	},
	{
		icon: FollowSvg,
		name: "Мои подписки",
		link: PAGE.FOLLOW,
	},
	{
		icon: MessageSvg,
		name: "Уведомления",
		link: PAGE.NOTICE,
	},
	{
		icon: UserSvg,
		name: "Личный кабинет",
		link: PAGE.PROFILE,
	},
	{
		icon: BasketSvg,
		name: "Корзина",
		link: PAGE.BASKET,
	},
];
