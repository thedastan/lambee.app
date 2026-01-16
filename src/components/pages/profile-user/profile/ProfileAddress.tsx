// ProfileAddress.tsx
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
import React, { useState, useMemo, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { SlLocationPin } from "react-icons/sl";
import "alert-go/dist/notifier.css";
import { toast } from "alert-go";
import { AiOutlineDelete } from "react-icons/ai";

const PROFILE_ADDRESS_KEY = "selectedShippingAddressId";
const PROFILE_ADDRESS_LABEL_KEY = "selectedShippingAddressLabel";

const ProfileAddress = () => {
	const { profile, refetch: refetchProfile } = useUserProfile();
	const { createShippingAddress, isCreating } = useCreateShippingAddress();
	const { deleteShippingAddress } = useDeleteShippingAddress(); // ✅ Правильное имя

	const [selectedAddress, setSelectedAddress] = useState<string>("");
	const [newAddressValue, setNewAddressValue] = useState("");
	const [modalType, setModalType] = useState<null | "select" | "add">(null);

	// 1. Читаем сохранённый адрес из localStorage при монтировании
	useEffect(() => {
		if (profile?.shipping_addresses) {
			const savedId = localStorage.getItem(PROFILE_ADDRESS_KEY);
			if (
				savedId &&
				profile.shipping_addresses.some((addr) => String(addr.id) === savedId)
			) {
				setSelectedAddress(savedId);
			}
		}
	}, [profile?.shipping_addresses]);

	const addressOptions = useMemo(() => {
		if (!profile?.shipping_addresses) return [];
		return profile.shipping_addresses.map((addr) => ({
			id: String(addr.id),
			label: addr.address,
		}));
	}, [profile?.shipping_addresses]);

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
		setModalType("add");
	};
	const closeModal = () => setModalType(null);

	const handleAddAddress = async () => {
		if (!newAddressValue.trim()) return;

		try {
			await createShippingAddress(newAddressValue.trim());
			await refetchProfile();
			setModalType("select");
			toast.success("Адрес успешно добавлен", { position: "top-center" });
		} catch (err) {
			console.error("Ошибка добавления адреса:", err);
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
			console.error("Ошибка удаления адреса:", err);
			toast.error("Не удалось удалить адрес.", { position: "top-center" });
		}
	};

	const selectedLabel =
		addressOptions.find((a) => a.id === selectedAddress)?.label || "Не выбран";

	const handleAddressChange = (id: string) => {
		setSelectedAddress(id);
	};

   

	return (
		<div>
			<div className="border border-[#E4E4E7] bg-white rounded-[16px] flex items-center justify-between gap-4 p-4">
				<div className="flex gap-3 items-center">
					<SlLocationPin size={34} color="#515151" />
					<div className="flex flex-col gap-1">
						<Description>Адрес доставки</Description>
						<Title className="font-[700]">{selectedLabel}</Title>
					</div>
				</div>
				<Button
					onClick={openSelectModal}
					className="!bg-transparent !text-[#515151] border border-[#E4E4E7] rounded-[5px] w-[40px] h-[40px] !px-0">
					<FiEdit2 />
				</Button>
			</div>

			<Modal
				isOpen={modalType === "select"}
				onClose={closeModal}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					{addressOptions.length > 0 ? (
						addressOptions.map((option) => (
							<div
								key={option.id}
								className="flex items-center justify-between gap-2 ">
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										if (addressOptions.length <= 1) {
											toast.error("Нельзя удалить единственный адрес.", {
												position: "top-center",
											});
											return;
										}
										handleDeleteAddress(option.id);
									}}
									className="p-3 border rounded-lg"
									aria-label="Удалить адрес">
									<AiOutlineDelete size={23} />
								</button>

								<label className="flex items-center cursor-pointer p-3 border rounded-lg w-full">
									<input
										type="radio"
										name="deliveryAddress"
										value={option.id}
										checked={selectedAddress === option.id}
										onChange={() => handleAddressChange(option.id)}
										className="mr-3"
									/>
									{option.label}
								</label>
							</div>
						))
					) : (
						<Description>Нет сохранённых адресов</Description>
					)}

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<Button
						className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
						onClick={openAddModal}>
						Добавить ещё адрес
					</Button>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={closeModal}>
							Отмена
						</Button>
						<Button className="w-full" onClick={closeModal}>
							Готово
						</Button>
					</div>
				</div>
			</Modal>

			<Modal
				isOpen={modalType === "add"}
				onClose={closeModal}
				title="Добавить адрес">
				<div className="flex flex-col gap-3">
					<Input
						label={
							<>
								Адрес <span className="text-[#FF5F57]">*</span>
							</>
						}
						value={newAddressValue}
						onChange={(e) => setNewAddressValue(e.target.value)}
						placeholder="Введите адрес доставки"
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={closeModal}>
							Отмена
						</Button>
						<Button
							className="w-full"
							onClick={handleAddAddress}
							disabled={isCreating || !newAddressValue.trim()}>
							{isCreating ? "Добавление..." : "Сохранить"}
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default ProfileAddress;
