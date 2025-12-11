// src/components/layout/Sidebar.tsx
"use client";

import { usePathname } from "next/navigation";
import logo from "@/assets/svg/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { navbar } from "@/lib/navbar";

const Sidebar: React.FC = () => {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex w-[280px] relative bg-[#ffffff] h-[100vh] border-r">
			<div className=" fixed    flex-col p-4 py-6  w-[280px]">
				<div className="border-b">
					<Image width={32} height={32} src={logo} alt="logo" />
					<h2 className="text-[12px] font-[500] text-[#707070] mt-4 pb-2">
						Навигация
					</h2>
				</div>
				<nav className="flex-1 space-y-2 p-2">
					{navbar.map((item) => {
						const isActive =
							pathname === item.link || pathname.startsWith(item.link + "/");
						return (
							<Link
								key={item.name}
								href={item.link}
								className={`flex items-center text-[#515151] text-[14px] gap-3 px-4 py-2 rounded-[8px] transition-colors ${
									isActive ? "bg-[#FAF9FF] text-black" : "hover:bg-[#FAF9FF]"
								}`}>
								{item.icon()}
								<span>{item.name}</span>
							</Link>
						);
					})}
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
