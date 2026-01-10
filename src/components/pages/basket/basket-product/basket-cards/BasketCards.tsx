// BasketCards.tsx
import React from "react";
import Image from "next/image";
import img from "@/assets/images/Diapers.png";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import DeleteSvg from "@/assets/svg/delete";

// Импортируйте CartItem или определите здесь
interface CartItem {
	id: number;
	variantId: number;
	variantTitle: string;
	type: "one-time" | "subscription";
	price: number;
	quantity: number;
	itemsCount: number;
	subscriptionPrice?: number;
	discountPercent?: number;
	productId: number;
	productTitle: string;
}

interface BasketCardsProps {
	cart: CartItem[];
	updateQuantity: (id: number, quantity: number) => void;
	removeItem: (id: number) => void;
}

const BasketCards: React.FC<BasketCardsProps> = ({ cart, updateQuantity, removeItem }) => {
	const formatPrice = (price: number) => `${price} сом`;

	if (cart.length === 0) {
		return (
			<Description className="text-center text-gray-500 py-8">
				Корзина пуста
			</Description>
		);
	}

	return (
		<section className="md:p-0 p-4 flex flex-col gap-4">
			{cart.map((item) => (
				<div key={item.id} className="flex items-center gap-2">
					<div className="w-[80px] min-w-[80px] h-[80px] rounded-[8px] relative overflow-hidden">
						<Image src={img} alt={item.productTitle} className="object-cover" fill />
					</div>
					<div className="flex flex-col justify-between gap-1 w-full">
						<div className="flex md:justify-start justify-between gap-2 items-start">
							<div>
								<TitleComponent>{item.productTitle} – {item.variantTitle}</TitleComponent>
								<Description className="text-[#515151] text-[13px] mt-1">
									Размер: {item.variantTitle} •{" "}
									{item.type === "subscription" ? "Подписка" : "Разовый заказ"}
								</Description>
							</div>
							<button onClick={() => removeItem(item.id)} className="p-1">
								<DeleteSvg />
							</button>
						</div>

						<Description className="text-[#515151] font-[500] text-[14px] flex gap-2 items-center">
							{item.type === "subscription" && item.subscriptionPrice !== undefined ? (
								<>
									<span className="line-through text-black">
										{formatPrice(item.price * item.quantity)}
									</span>
									{formatPrice(item.subscriptionPrice * item.quantity)} / мес
								</>
							) : (
								formatPrice(item.price * item.quantity)
							)}
						</Description>

						<div className="flex items-center gap-2">
							<div className="border border-[#E4E4E7] w-full max-w-[90px] rounded-[4px] flex justify-between items-center">
								<button
									onClick={() => updateQuantity(item.id, item.quantity - 1)}
									className="border-r w-[28px] h-[28px] flex justify-center items-center text-[#515151]"
								>
									<FiMinus />
								</button>
								<Description>{item.quantity}</Description>
								<button
									onClick={() => updateQuantity(item.id, item.quantity + 1)}
									className="border-l w-[28px] h-[28px] flex justify-center items-center text-[#515151]"
								>
									<VscAdd />
								</button>
							</div>
							<Description className="text-[#515151] text-[13px]">
								({item.itemsCount * item.quantity} шт)
							</Description>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default BasketCards;