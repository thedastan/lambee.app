'use client'
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import {
  useUserProfile,
  useCreateShippingAddress,
  useDeleteShippingAddress,
} from "@/redux/hooks/user";
import React, { useState, useMemo, useEffect, useRef } from "react";
import { FiEdit2, FiChevronDown } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import "alert-go/dist/notifier.css";
import { toast } from "alert-go";
import { AiOutlineDelete } from "react-icons/ai";
import { useGeo } from "@/redux/hooks/geo";
import { IGeoDetail } from "@/redux/models/geo.model";

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

const ProfileAddress = () => {
  const { profile, refetch: refetchProfile } = useUserProfile();
  const { createShippingAddress, isCreating } = useCreateShippingAddress();
  const { deleteShippingAddress } = useDeleteShippingAddress();  
  const { data: geoData } = useGeo(); 

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [newAddressValue, setNewAddressValue] = useState("");
  const [modalType, setModalType] = useState<null | "select" | "add">(null);
  
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<IGeoDetail | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие выпадающего списка при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Синхронизация с localStorage при загрузке профиля
  useEffect(() => {
    if (profile?.shipping_addresses) {
      const savedId = localStorage.getItem(PROFILE_ADDRESS_KEY);
      if (savedId && profile.shipping_addresses.some((addr) => String(addr.id) === savedId)) {
        setSelectedAddress(savedId);
      }
    }
  }, [profile?.shipping_addresses]);

  // Формирование списка адресов для отображения в модалке выбора
  const addressOptions = useMemo(() => {
    if (!profile?.shipping_addresses) return [];
    return profile.shipping_addresses.map((addr) => ({
      id: String(addr.id),
      label: `${addr.city.name}, ${addr.street}`,
    }));
  }, [profile?.shipping_addresses]);

  // Сохранение выбранного ID и Label в localStorage
  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem(PROFILE_ADDRESS_KEY, selectedAddress);
      const label = addressOptions.find((a) => a.id === selectedAddress)?.label;
      if (label) {
        localStorage.setItem(PROFILE_ADDRESS_LABEL_KEY, label);
      }
    }
  }, [selectedAddress, addressOptions]);

  const openSelectModal = () => setModalType("select");
  const openAddModal = () => {
    setNewAddressValue("");
    setSelectedCity(null);
    setModalType("add");
  };
  const closeModal = () => {
    setModalType(null);
    setIsCityDropdownOpen(false);
  };

  const handleAddAddress = async () => {
    if (!newAddressValue.trim() || !selectedCity) return;

    try {
      // Отправляем объект согласно вашим требованиям
      await createShippingAddress({
        city_id: selectedCity.id,
        street: newAddressValue.trim(),
      });

      await refetchProfile();
      setModalType("select");
      toast.success("Адрес успешно добавлен", { position: "top-center" });
    } catch (err) {
      toast.error("Не удалось добавить адрес.", { position: "top-center" });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteShippingAddress(Number(id));  
      await refetchProfile();
      if (selectedAddress === id) {
        setSelectedAddress("");
        localStorage.removeItem(PROFILE_ADDRESS_KEY);
        localStorage.removeItem(PROFILE_ADDRESS_LABEL_KEY);
      }
      toast.success("Адрес удалён.", { position: "top-center" });
    } catch (err) {
      toast.error("Не удалось удалить адрес.", { position: "top-center" });
    }
  };

  const selectedLabel = addressOptions.find((a) => a.id === selectedAddress)?.label || "Не выбран";

  

  return (
    <div>
      {/* Виджет на главной/профиле */}
      <div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
        <div className="flex gap-3 items-center">
          <div className="bg-[#F4F4F5] p-2 rounded-full">
             <SlLocationPin size={24} color="#515151" />
          </div>
          <div className="flex flex-col gap-1">
            <Description className="text-[12px] text-[#71717A]">Адрес доставки</Description>
            <Title className="font-[700] text-[15px]">{selectedLabel}</Title>
          </div>
        </div>
        <Button
          onClick={openSelectModal}
          className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[8px] w-[40px] h-[40px] !px-0"
        >
          <FiEdit2 />
        </Button>
      </div>

      {/* Модалка выбора существующего адреса */}
      <Modal isOpen={modalType === "select"} onClose={closeModal} title="Выберите адрес доставки">
        <div className="flex flex-col gap-3">
          {addressOptions.length > 0 ? (
            addressOptions.map((option) => (
              <div key={option.id} className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (addressOptions.length <= 1) {
                      toast.error("Нельзя удалить единственный адрес.");
                      return;
                    }
                    handleDeleteAddress(option.id);
                  }}
                  className="p-3 border rounded-lg hover:bg-red-50 transition-colors"
                >
                  <AiOutlineDelete size={20} className="text-gray-500" />
                </button>

                <label className="flex items-center cursor-pointer p-3 border rounded-lg w-full hover:border-blue transition-all">
                  <input
                    type="radio"
                    name="deliveryAddress"
                    checked={selectedAddress === option.id}
                    onChange={() => setSelectedAddress(option.id)}
                    className="mr-3 accent-blue"
                  />
                  <span className="text-[14px]">{option.label}</span>
                </label>
              </div>
            ))
          ) : (
            <Description className="text-center py-4">У вас пока нет сохраненных адресов</Description>
          )}

          <Button className="w-full border border-[#E4E4E7] !bg-transparent !text-black mt-2" onClick={openAddModal}>
            Добавить ещё адрес
          </Button>

          <div className="flex gap-3 w-full mt-4">
            <Button className="w-full border border-[#E4E4E7] !bg-transparent !text-black" onClick={closeModal}>
              Отмена
            </Button>
            <Button className="w-full" onClick={closeModal}>
              Готово
            </Button>
          </div>
        </div>
      </Modal>

      {/* Модалка добавления нового адреса */}
      <Modal isOpen={modalType === "add"} onClose={closeModal} title="Добавить адрес">
        <div className="flex flex-col gap-4">
          
          {/* Кастомный выпадающий список (Select) */}
          <div className="relative" ref={dropdownRef}>
            <label className="text-[14px] font-medium mb-1 block text-[#515151]">
              Город <span className="text-[#FF5F57]">*</span>
            </label>
            <div 
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center justify-between p-3 border border-[#E4E4E7] rounded-lg cursor-pointer bg-white hover:border-gray-400 transition-all"
            >
              <span className={selectedCity ? "text-black" : "text-gray-400"}>
                {selectedCity 
                  ? `${selectedCity.name}, ${selectedCity.country.name}` 
                  : "Выберите город из списка"}
              </span>
              <FiChevronDown className={`transition-transform duration-200 ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {isCityDropdownOpen && (
              <div className="absolute z-[100] w-full mt-1 bg-white border border-[#E4E4E7] rounded-lg shadow-xl max-h-[220px] overflow-y-auto overflow-x-hidden">
                {geoData?.detail && geoData.detail.length > 0 ? (
                  geoData.detail.map((city: IGeoDetail) => (
                    <div 
                      key={city.id}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className="p-3 hover:bg-[#F9F9F9] cursor-pointer border-b last:border-none group flex flex-col"
                    >
                      <span className="text-[14px] font-semibold group-hover:text-black">
                        {city.name}
                      </span>
                      <span className="text-[12px] text-gray-500">
                        {city.country.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400 text-[14px]">Города не найдены</div>
                )}
              </div>
            )}
          </div>

          <Input
            label={<>Улица и дом <span className="text-[#FF5F57]">*</span></>}
            value={newAddressValue}
            onChange={(e) => setNewAddressValue(e.target.value)}
            placeholder="Напр: ул. Абдрахманова 105"
          />

          <div className="flex gap-3 w-full mt-2">
            <Button
              className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
              onClick={() => setModalType("select")}
            >
              Назад
            </Button>
            <Button
              className="w-full"
              onClick={handleAddAddress}
              disabled={isCreating || !newAddressValue.trim() || !selectedCity}
            >
              {isCreating ? "Сохранение..." : "Сохранить"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileAddress;