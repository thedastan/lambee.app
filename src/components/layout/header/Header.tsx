"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/assets/images/logo.png";
import BasketSvg from "@/assets/svg/BasketSvg";
import LinkButton from "@/components/ui/button/LinkButton";
import { PAGE } from "@/config/pages/public-page.config";
import Link from "next/link";
import { FiBell } from "react-icons/fi";
import { useCart } from "@/redux/hooks/useCart";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Берем только метод для подсчета one-time товаров
  const { getOneTimeItemsCount } = useCart();
  
  // Вычисляем количество только для клиента
  const cartCount = isClient ? getOneTimeItemsCount() : 0;

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
            {/* Рендерим бейдж только если есть товары типа one-time */}
            {isClient && cartCount > 0 && (
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