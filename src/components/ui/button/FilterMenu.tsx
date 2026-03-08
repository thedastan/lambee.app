"use client";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";

interface FilterMenuProps {
  onFilterChange: (value: "future" | "delivered") => void;
  currentFilter: "future" | "delivered";
}

export default function FilterMenu({ onFilterChange, currentFilter }: FilterMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const selectOption = (value: "future" | "delivered") => {
    onFilterChange(value);
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        className="!bg-white h-[40px] min-w-[40px] rounded-[8px] border border-[#E4E4E7] !px-0"
        onClick={() => setOpen(!open)}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 10H15M2.5 5H17.5M7.5 15H12.5" stroke="#141414" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>

      {open && (
        <div className="absolute top-[50px] right-0 bg-white shadow-xl rounded-[12px] border border-[#E4E4E7] p-4 w-[230px] z-50">
          <h1 className="text-[18px] font-semibold mb-3">Сортировка</h1>

          {/* Опция: Будущие */}
          <div onClick={() => selectOption("future")} className="flex items-center gap-3 cursor-pointer py-2">
            <div className={`w-[22px] h-[22px] rounded-md flex items-center justify-center border transition-all 
              ${currentFilter === "future" ? "bg-[#A29BFE] border-[#A29BFE]" : "border-[#D1D1D6]"}`}>
              {currentFilter === "future" && (
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[16px]">Будущие</span>
          </div>

          {/* Опция: Доставленные */}
          <div onClick={() => selectOption("delivered")} className="flex items-center gap-3 cursor-pointer py-2">
            <div className={`w-[22px] h-[22px] rounded-md flex items-center justify-center border transition-all 
              ${currentFilter === "delivered" ? "bg-[#A29BFE] border-[#A29BFE]" : "border-[#D1D1D6]"}`}>
              {currentFilter === "delivered" && (
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M5 10.5L8.5 14L15 7" stroke="white" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span className="text-[16px]">Доставленные</span>
          </div>
        </div>
      )}
    </div>
  );
}