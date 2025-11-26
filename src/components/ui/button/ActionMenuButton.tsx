// src/components/ui/buttons/ActionMenuButton.tsx
"use client";

import { Title } from "@/components/ui/text/Title";
import { BsThreeDots } from "react-icons/bs";

interface ActionMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onAction: (action: string) => void;
}

const ActionMenuButton = ({ isOpen, onToggle, onAction }: ActionMenuButtonProps) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  const handleActionClick = (action: string) => {
    // Останавливаем всплытие, чтобы не сработал Link
    onAction(action);
  };

  return (
    <button
      data-menu-trigger="true"
      onClick={handleToggle}
      className="w-[44px] h-[40px] border border-[#E4E4E7] rounded-[5px] flex justify-center items-center relative"
    >
      <BsThreeDots />
      {isOpen && (
        <div
          data-menu-content="true" // ← исправлено: не "trigger", а "content"!
          className="absolute top-full right-0 mt-2 w-[240px] bg-white border border-[#E4E4E7] text-start rounded-lg shadow-lg z-10 p-4"
        >
          <Title className="font-bold text-[#101828]">Действия</Title>
          <ul className="flex flex-col gap-3 mt-4 text-[16px] font-[400]">
            <li
              className="cursor-pointer hover:text-[#0071E3] transition-colors"
              onClick={() => handleActionClick("Посмотреть детали")}
            >
              Посмотреть детали
            </li>
            <li
              className="cursor-pointer hover:text-[#0071E3] transition-colors"
              onClick={() => handleActionClick("Изменить размеры")}
            >
              Изменить размеры
            </li>
            <li
              className="cursor-pointer hover:text-[#0071E3] transition-colors"
              onClick={() => handleActionClick("Изменить дату доставки")}
            >
              Изменить дату доставки
            </li>
            <li
              className="cursor-pointer hover:text-[#0071E3] transition-colors"
              onClick={() => handleActionClick("Привязать ребенка")}
            >
              Привязать ребенка
            </li>
            <li
              className="cursor-pointer hover:text-[#0071E3] transition-colors"
              onClick={() => handleActionClick("Отменить доставку")}
            >
              Отменить доставку
            </li>
          </ul>
        </div>
      )}
    </button>
  );
};

export default ActionMenuButton;