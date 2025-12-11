// src/components/ui/PhotoUpload.tsx
import React, { useState, useRef, ReactNode, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { Title } from "../text/Title";
import { Description } from "../text/Description";
import Image from "next/image";

interface PhotoUploadProps {
  label?: ReactNode;
  value?: File | null; // локальный выбранный файл
  previewUrl?: string | null; // URL фото с сервера
  onChange?: (file: File | null) => void;
  maxFileSizeMB?: number;
  disabled?: boolean;
  className?: string;
}

const PhotoUpload = ({
  label = "Фото",
  previewUrl,
  onChange,
  maxFileSizeMB = 5,
  disabled = false,
  className = "",
}: PhotoUploadProps) => {
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Очищаем URL объекта при размонтировании
  useEffect(() => {
    return () => {
      if (localPreview) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const maxSize = maxFileSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`Размер файла не должен превышать ${maxFileSizeMB} МБ`);
      return;
    }

    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    onChange?.(file);
  };

  const handleRemove = () => {
    setLocalPreview(null);
    onChange?.(null);
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  // Приоритет: локальный файл > серверное фото > ничего
  const displayPreview = localPreview || previewUrl || null;

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
        className={`relative w-full bg-white rounded-[8px] border border-[#E4E4E7] flex items-center justify-between p-4 cursor-pointer transition-colors ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleClick}
      >
        {displayPreview ? (
          <div className="flex items-center gap-3">
            <Image
              src={displayPreview}
              width={56}
              height={56}
              alt="Превью"
              className="w-[56px] h-[56px] border-2 border-[#E4E4E7] rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-[14px]">Фото</div>
              <div className="text-[12px] text-[#9CA3AF]">
                {localPreview ? "Выбрано" : "Загружено"}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-[56px] h-[56px] border-2 border-[#E4E4E7] rounded-full flex items-center justify-center">
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

        <div className="flex items-center gap-2">
          {displayPreview && (
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
          )}
        </div>

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