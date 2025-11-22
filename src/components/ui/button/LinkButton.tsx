import React from "react";
import Link from "next/link";

interface LinkButtonProps {
  children: React.ReactNode;
  href: string;
  disabled?: boolean;
  className?: string;
  prefetch?: boolean;
  onClick?: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  href,
  disabled = false,
  className = "",
  prefetch,
  onClick,
}) => {
  const baseClasses =
    "flex items-center bg-[#AAA4C2] px-8 h-[40px] text-[14px] text-md justify-center font-[600] text-white rounded-[8px]";

  if (disabled) {
    return (
      <span className={`${baseClasses} opacity-50 cursor-not-allowed ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={onClick}  
      className={`${baseClasses} ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;