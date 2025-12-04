"use client";

import Link from "next/link";

import { navbar } from "@/lib/navbar";

const BurgerMenu = ({
	isOpen,
	setIsOpen,
}: {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}) => {
	return (
		<div
			id="menu-overlay"
			className={`fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-[100vh] z-50 transition-opacity duration-700 ${
				isOpen
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}>
			<div
				className={`fixed top-0 left-0 w-[100%] h-full bg-white  p-4 flex flex-col justify-start gap-4 shadow-lg z-50 transition-transform duration-700 ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}>

				<div className="w-full flex flex-col justify-between items-start h-[70ch]">
					<div className="flex flex-col items-start w-[100%] text-start gap-4 mt-16 ">
						{navbar.map((el, index) => (
							<Link
								key={index}
								href={el.link}
								className="text-black text-[16px] text-center w-full font-medium"
								onClick={() => setIsOpen(false)} // Закрывать меню при переходе
							>
								{el.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default BurgerMenu;
