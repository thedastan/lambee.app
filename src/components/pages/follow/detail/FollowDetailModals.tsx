import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Modal from "@/components/ui/modal/Modal";
import DeliveryFrequencySelect from "@/components/ui/select/DeliveryFrequencySelect";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import React from "react";
import { PiPauseCircleLight } from "react-icons/pi";

interface FollowDetailModalsProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isModalFreezeOpen: boolean;
  setIsModalFreezeOpen: (value: boolean) => void;
  isModalDateOpen: boolean;
  setIsModalDateOpen: (value: boolean) => void;
  isSelectWeek: boolean;
  setIsSelectWeek: (value: boolean) => void;
  isPay: boolean;
  setIsPay: (value: boolean) => void;
  birthDate: Date | null;
  setBirthDate: (date: Date | null) => void;
  deliveryFrequency: string;
  setDeliveryFrequency: (frequency: string) => void;
}


const FollowDetailModals: React.FC<FollowDetailModalsProps> = ({
  isModalOpen,
  setIsModalOpen,
  isModalFreezeOpen,
  setIsModalFreezeOpen,
  isModalDateOpen,
  setIsModalDateOpen,
  isSelectWeek,
  setIsSelectWeek,
  isPay,
  setIsPay,
  birthDate,
  setBirthDate,
  deliveryFrequency,
  setDeliveryFrequency,
}) => {
	return (
		<div>
			{/* Modal date */}
			<Modal
				isOpen={isModalDateOpen}
				onClose={() => setIsModalDateOpen(false)}
				title="Изменить дату доставки">
				<div className="flex flex-col gap-4">
				 

					<div className="border-[#E4E4E7] border-b w-full h-[1px]" />

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsModalDateOpen(false)}>
							Отмена
						</Button>
						<Button
							className="w-full"
							onClick={() => setIsModalDateOpen(false)}
							disabled={!birthDate}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal>

			{/* Modal address */}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Выберите адрес доставки">
				<div className="flex flex-col gap-3">
					<Input
						label={
							<>
								Введите адрес <span className="text-[#FFA655]">*</span>
							</>
						}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]" />

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsModalOpen(false)}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal>

			{/* Modal week choice */}
			<Modal
				isOpen={isSelectWeek}
				onClose={() => setIsSelectWeek(false)}
				title="Частота доставки">
				<div className="flex flex-col gap-3">
					<DeliveryFrequencySelect
						label="Выберите частоту доставки"
						required
						value={deliveryFrequency}
						onChange={setDeliveryFrequency}
					/>

					<div className="border-[#E4E4E7] border-b w-full h-[1px]" />

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsSelectWeek(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsSelectWeek(false)}>
							Сохранить
						</Button>
					</div>
				</div>
			</Modal>

			{/* Modal freeze */}
			<Modal
				isOpen={isModalFreezeOpen}
				onClose={() => setIsModalFreezeOpen(false)}
				title="Заморозить подписку?">
				<div className="flex flex-col items-center gap-3">
					<div className=" rounded-full w-[64px] h-[64px] bg-[#DEEEFF] flex justify-center items-center">
						<PiPauseCircleLight size={32} />
					</div>

					<div className="p-4 border-[#E4E4E7] border bg-[#F9FCFF] w-full rounded-[8px] flex flex-col gap-2">
						<Title className="font-semibold">
							Подписка остановится до 27 ноября
						</Title>
						<Description>
							Возобновить его можно <br /> в любой момент
						</Description>
					</div>

					<div className="flex gap-3">
						<div className="p-4 border-[#E4E4E7] w-full border bg-[#FAFAFA] rounded-[8px] flex flex-col gap-2">
							<Title className="font-semibold">
								Деньги не будут списыватся
							</Title>
							<Description>Все оплаченные дни сохранятся</Description>
						</div>

						<div className="p-4 border-[#E4E4E7] w-full border bg-[white] rounded-[8px] flex flex-col gap-2">
							<Title className="font-semibold">Подписка включится сама</Title>
							<Description>Это произойдет через месяц</Description>
						</div>
					</div>

					<div className="border-[#E4E4E7] border-b w-full"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsModalOpen(false)}>
							Отмена
						</Button>
						<Button
							className="w-full"
							onClick={() => setIsModalFreezeOpen(false)}>
							Заморозить
						</Button>
					</div>
				</div>
			</Modal>

			{/* Modal pay */}
			<Modal
				isOpen={isPay}
				onClose={() => setIsPay(false)}
				title="Пополнить баланс">
				<div className="flex flex-col gap-3">
					<Input
						label={
							<>
								Сумма <span className="text-[#FF5F57]">*</span>
							</>
						}
						placeholder="Введите сумму"
					/>
					<div className="border-[#E4E4E7] border-b w-full h-[1px]"></div>

					<div className="flex gap-3 w-full">
						<Button
							className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
							onClick={() => setIsPay(false)}>
							Отмена
						</Button>
						<Button className="w-full" onClick={() => setIsPay(false)}>
							Пополнить
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default FollowDetailModals;
