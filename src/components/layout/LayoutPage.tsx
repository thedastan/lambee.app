"use client";

import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import MobileBottomNav from "./mobile-nav/MobileBottomNav";
import { usePathname } from "next/navigation";
import { PAGE } from "@/config/pages/public-page.config";

interface LayoutProps {
	children: React.ReactNode;
	showSidebar?: boolean;
	showHeader?: boolean;
}

const LayoutPage: React.FC<LayoutProps> = ({
	children,
 
}) => {
	const pathname = usePathname();

	const isAuthPage = pathname.startsWith(PAGE.AUTH);
	const isPaymentPage = pathname.startsWith(PAGE.PAYMENT);


	if (isAuthPage || isPaymentPage) {
		return <main className="w-full min-h-screen ">{children}</main>;
	}

	return (
		<div className="flex ">
			<div className="hidden md:flex ">
				<Sidebar />
			</div>

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />

				<main
					className="flex-1 overflow-y-auto pb-16"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{children}
				</main>

				<MobileBottomNav />
			</div>
		</div>
	);
};

export default LayoutPage;
