// src/app/(main)/payment/payment-forma/GuestAddressModal.tsx
import Modal from "@/components/ui/modal/Modal";
import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import { useState } from "react";

interface GuestAddressModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (address: string) => void;
}

export default function GuestAddressModal({ isOpen, onClose, onSave }: GuestAddressModalProps) {
	const [address, setAddress] = useState("");

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Укажите адрес доставки">
			<div className="flex flex-col gap-3">
				<Input
					label={
						<>
							Адрес <span className="text-[#FF5F57]">*</span>
						</>
					}
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					placeholder="Например: Бишкек, ул. Чуй 123"
				/>
				<div className="flex gap-3 w-full">
					<Button
						className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
						onClick={onClose}
					>
						Отмена
					</Button>
					<Button
						className="w-full"
						onClick={() => onSave(address)}
						disabled={!address.trim()}
					>
						Готово
					</Button>
				</div>
			</div>
		</Modal>
	);
}