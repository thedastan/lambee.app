"use client";

import Button from "@/components/ui/button/Button";
import PageHeader from "@/components/ui/heading/PageHeader";
import Input from "@/components/ui/input/Input";
import PhotoUpload from "@/components/ui/input/PhotoUpload";
import { PAGE } from "@/config/pages/public-page.config";
import React, { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from 'date-fns/locale/ru';

import "react-datepicker/dist/react-datepicker.css";
import "alert-go/dist/notifier.css";

import {
  useUpdateProfile,
  useUpdateProfilePicture,
  useUserProfile,
} from "@/redux/hooks/user";
import { toast } from "alert-go";
import Skeleton from "@/components/ui/skeleton/Skeleton";

registerLocale('ru', ru);

const EditProfile = () => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const { profile, isLoading, refetch } = useUserProfile();
  const { updateProfile, isUpdating: isUpdatingProfile } = useUpdateProfile();
  const { updateProfilePicture, isUpdating: isUpdatingPhoto } =
    useUpdateProfilePicture();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.name || "");
      setLastName(profile.surname || "");
      if (profile.birth_date) {
        setBirthDate(new Date(profile.birth_date));
      }
      setPhone(profile.phone ? `+996${profile.phone}` : "");
    }
  }, [profile]);

  if (isLoading) {
    return (
      <section>
        <PageHeader href={PAGE.PROFILE} title="Личные данные" />
        <div className="m-4 md:p-4 p-0 bg-white rounded-[8px] flex flex-col gap-4">
          <Skeleton className="rounded-full" width="w-10" height="h-10" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton height="h-4" width="w-1/4" />
              <Skeleton height="h-12" />
            </div>
          ))}
          <Skeleton height="h-12" width="w-full" className="rounded-md" />
        </div>
      </section>
    );
  }

  const handleSave = async () => {
    if (!firstName || !lastName || !birthDate || !phone) {
      toast.warning("Заполните обязательные поля", { position: "top-center" });
      return;
    }

    const cleanPhone = phone.replace(/^\+996/, "");
    const formattedBirthDate = birthDate.toISOString().split("T")[0];

    try {
      if (photo) {
        await updateProfilePicture(photo);
      }
      await updateProfile({
        name: firstName,
        surname: lastName,
        birth_date: formattedBirthDate,
        phone: cleanPhone,
        ...(password ? { password } : {}),
      });
      await refetch();
      toast.success("Профиль обновлён", { position: "top-center" });
    } catch (e) {
      toast.error("Ошибка обновления", { position: "top-center" });
    }
  };

  return (
    <section>
      <PageHeader href={PAGE.PROFILE} title="Личные данные" />
      <div className="m-4 md:p-4 p-0 md:bg-white bg-transparent rounded-[8px] flex flex-col gap-3">
        <PhotoUpload
          label={<>Фото <span className="text-[#FFA655]">*</span></>}
          value={photo}
          previewUrl={profile?.profile_picture || null}
          onChange={setPhoto}
          maxFileSizeMB={5}
        />

        <Input
          placeholder="Введите имя"
          label="Имя *"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Введите фамилию"
          label="Фамилия *"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Дата рождения *
          </label>
          <div className="relative w-full">
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd.MM.yyyy"
              locale="ru"
              placeholderText="ДД.ММ.ГГГГ"
              withPortal
              portalId="datepicker-portal"
              autoComplete="off"
              // Позволяет вводить дату вручную
              disabledKeyboardNavigation={false} 
              className="w-full max-w-full h-[48px] px-4 py-4 rounded-[8px] border border-[#E4E4E7] bg-white outline-none cursor-text focus:border-[#A8A4C4]"
              calendarClassName="react-datepicker-custom"
              wrapperClassName="w-full"
            />
          </div>
        </div>

        <Input
          label="Пароль"
          type="password"
          placeholder="Оставьте пустым, чтобы не менять"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Номер телефона <span className="text-[#FFA655]">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="text-gray-700 h-[48px] bg-white rounded-l-[8px] border border-[#E4E4E7] border-r-0 flex justify-center items-center px-3">
              +996
            </span>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={9}
              value={phone.replace(/^\+996/, "")}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                if (digitsOnly.length <= 9) setPhone(`+996${digitsOnly}`);
              }}
              className="w-full px-2 h-[48px] rounded-r-[8px] border border-[#E4E4E7] outline-none"
            />
          </div>
        </div>

        <Button
          className="h-[48px] mt-3"
          onClick={handleSave}
          disabled={isUpdatingProfile || isUpdatingPhoto}>
          {isUpdatingProfile || isUpdatingPhoto ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </section>
  );
};

export default EditProfile;