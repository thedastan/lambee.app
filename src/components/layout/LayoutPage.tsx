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
  showSidebar = true,
  showHeader = true,
}) => {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith(PAGE.AUTH);
 
  if (isAuthPage) {
    return (
      <main className="w-full min-h-screen ">
        {children}
      </main>
    );
  }
 
  return (
    <div className="flex h-screen">
      {showSidebar && (
        <div className="hidden md:flex">
          <Sidebar />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && (
          <div className="md:hidden block">
            <Header />
          </div>
        )}

        <main
          className="flex-1 overflow-y-auto pb-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </main>

        <div className="md:hidden flex flex-col justify-end w-full h-[60px]">
          <MobileBottomNav />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
