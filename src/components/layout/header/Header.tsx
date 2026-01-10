"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import BasketSvg from "@/assets/svg/BasketSvg";
import LinkButton from "@/components/ui/button/LinkButton";
import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";
import { FiBell } from "react-icons/fi";

// Тип для элемента корзины (может быть вынесен в общий файл)
interface CartItem {
	id: number;
	quantity: number;
	// остальные поля не нужны для подсчёта
}

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Подсчёт количества товаров при монтировании и при изменении localStorage
	useEffect(() => {
		const updateCartCount = () => {
			try {
				const raw = localStorage.getItem("cart");
				if (raw) {
					const cart: CartItem[] = JSON.parse(raw);
					const total = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
					setCartCount(total);
				} else {
					setCartCount(0);
				}
			} catch (e) {
				console.error("Failed to parse cart in Header", e);
				setCartCount(0);
			}
		};
	
		// Обновляем при монтировании
		updateCartCount();
	
		// Слушаем кастомное событие
		window.addEventListener("cartUpdated", updateCartCount);
	
		return () => {
			window.removeEventListener("cartUpdated", updateCartCount);
		};
	}, []);
	return (
		<header className="w-full md:h-0 h-[65px]">
			<div
				className={`w-full md:hidden fixed z-50 top-0 left-0 block py-2 transition-all duration-300 ${
					scrolled
						? "bg-white border-b border-gray-200"
						: "bg-transparent border-b border-[#a8a8a8]/30"
				}`}
			>
				<div className="container flex items-center justify-between">
					<LinkButton
						href={PAGE.NOTICE}
						className="w-[44px] h-[40px] border border-[#E4E4E7] rounded-[5px] !text-black !bg-transparent !px-0"
					>
						<FiBell size={23} color="#515151" />
					</LinkButton>

					<Link href={PAGE.HOME}>
						<Image
							src={logo}
							alt="logo"
							width={100}
							height={25}
							className="md:w-[150px] w-[100px]"
						/>
					</Link>

					<LinkButton
						href={PAGE.BASKET}
						className="w-[44px] h-[40px] border border-[#E4E4E7] rounded-[5px] !text-black !bg-transparent !px-0 relative"
					>
						<BasketSvg />
						{cartCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-[#ffffff] border text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
								{cartCount}
							</span>
						)}
					</LinkButton>
				</div>
			</div>
		</header>
	);
};

export default Header;