'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navbar } from '@/lib/navbar';

const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className=" fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 px-4">
      {navbar.slice(0,5).map((item) => {
        const isActive = pathname === item.link || pathname.startsWith(item.link + '/');

        return (
          <Link
            key={item.name}
            href={item.link}
            className={`flex flex-col w-full text-black items-center gap-1 p-2 rounded-[8px] transition-colors ${
              isActive ? 'bg-[#DEEEFF]' : ''
            }`}
          >
            {item.icon()} 
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;