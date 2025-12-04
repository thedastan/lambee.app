"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BurgerMenu from "./BurgerMenu";

import logo from "@/assets/images/logo.png";
import BasketSvg from "@/assets/svg/BasketSvg";
import LinkButton from "@/components/ui/button/LinkButton";
import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const toggleBox = () => {
		setIsOpen((prevState) => !prevState);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className="w-full md:h-0 h-[65px]">
			<div
				className={`w-full md:hidden fixed z-50 top-0 left-0 block py-2 transition-all duration-300 ${
					scrolled
						? "bg-white border-b border-gray-200"
						: "bg-transparent border-b border-[#a8a8a8]/30"
				}`}>
				<div className="container flex items-center justify-between">
			 
					<div className="w-[40px]"></div>

					<div className="burger__button">
						<label>
							<input
								type="checkbox"
								checked={isOpen}
								onChange={toggleBox}
							/>
							<span></span>
							<span></span>
							<span></span>
						</label>
					</div>

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
						className="w-[44px] h-[40px] border border-[#E4E4E7] rounded-[5px] !text-black bg-transparent !px-0">
						<BasketSvg />
					</LinkButton>
				</div>

				<BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>
		</header>
	);
};

export default Header;
