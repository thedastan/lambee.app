// src/components/layout/Layout.tsx
'use client';

import React from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';
import MobileBottomNav from './mobile-nav/MobileBottomNav';

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

const LayoutPage: React.FC<LayoutProps> = ({ 
  children, 
  showSidebar = true, 
  showHeader = true 
}) => {
  return (
    <div className="flex h-screen">
      {/* Сайдбар показывается только на десктопе */}
      {showSidebar && (
        <div className="hidden md:flex">
          <Sidebar />
        </div>
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {showHeader && <Header />}
        <main className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {children}
        </main>

        {/* Нижняя панель — только на мобильных */}
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;