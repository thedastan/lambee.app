// src/components/ui/PhotoUpload.tsx
import React, { useState, useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { Title } from "../text/Title";
import { Description } from "../text/Description";
import Image from "next/image";

interface PhotoUploadProps {
  label?: string;
  value?: File | null; // текущий выбранный файл
  onChange?: (file: File | null) => void;
  maxFileSizeMB?: number; // по умолчанию 5 МБ
  disabled?: boolean;
  className?: string;
}

const PhotoUpload = ({
  label = "Фото",
  value,
  onChange,
  maxFileSizeMB = 5,
  disabled = false,
  className = "",
}: PhotoUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) return;

    const maxSize = maxFileSizeMB * 1024 * 1024; // в байтах

    if (file.size > maxSize) {
      alert(`Размер файла не должен превышать ${maxFileSizeMB} МБ`);
      return;
    }

    onChange?.(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (!file) return;

    const maxSize = maxFileSizeMB * 1024 * 1024;

    if (file.size > maxSize) {
      alert(`Размер файла не должен превышать ${maxFileSizeMB} МБ`);
      return;
    }

    onChange?.(file);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange?.(null);
  };

  const previewUrl = value ? URL.createObjectURL(value) : null;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center gap-1 mb-2">
          <label className="block text-[14px] font-medium text-[#515151]">
            {label}
          </label>
          
        </div>
      )}

      <div
        className={`relative w-full bg-white  rounded-[8px] border border-[#E4E4E7] flex items-center justify-between p-4 cursor-pointer transition-colors ${
          isDragging ? "bg-[#F3F4F6]" : " "
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {/* Превью фото */}
        {previewUrl ? (
          <div className="flex items-center gap-3">
            <Image
              src={previewUrl}
              width={56}
              height={56}
              alt="Превью"
              className="w-[56px] h-[56px] border-2 border-[#E4E4E7] rounded-full object-cover  "
            />
            <div>
              <div className="font-semibold text-[14px]">Фото</div>
              <div className="text-[12px] text-[#9CA3AF]">
                Загружено
              </div>
            </div>
          </div>
        ) : (
          /* Плейсхолдер */
          <div className="flex items-center gap-3">
            <div className="w-[56px] h-[56px] border-2 border-[#E4E4E7] rounded-full   flex items-center justify-center">
              <FaCamera className="w-6 h-6 text-[#9CA3AF]" />
            </div>
            <div>
               <Title className="!text-[18px] font-[700]">Фото</Title>
              <Description className="!text-[14px] text-[#515151]">
              Загрузите фото до 5 МБ
              </Description>
            </div>
          </div>
        )}

        {/* Кнопка + или удалить */}
        <div className="flex items-center gap-2">
          {previewUrl ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="w-8 h-8 rounded-[4px] border border-[#E4E4E7] flex items-center justify-center text-[#9CA3AF] hover:text-red-500 hover:border-red-300 transition-colors"
              aria-label="Удалить фото"
            >
              ×
            </button>
          ) : (
            <button
              type="button"
              className="w-8 h-8 rounded-[4px] border border-[#E4E4E7] flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] hover:border-[#D1D5DB] transition-colors"
              aria-label="Добавить фото"
            >
              +
            </button>
          )}
        </div>

        {/* Скрытый инпут для выбора файла */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default PhotoUpload;