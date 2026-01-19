"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { DetailPro, Variant } from "@/redux/models/product.model";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IoCheckmark, IoStarSharp } from "react-icons/io5";
import { useProductReviews } from "@/redux/hooks/product";
import Button from "@/components/ui/button/Button";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { useCart } from "@/redux/hooks/useCart";
import { PAGE } from "@/config/pages/public-page.config";

interface SizeDetailProps {
	product: DetailPro;
	productId: number;
	onVariantChange: (variant: Variant) => void;
}

const SizeDetail = ({
	product,
	productId,
	onVariantChange,
}: SizeDetailProps) => {
	const searchParams = useSearchParams();
	const initialVariantFromUrl = searchParams.get("variant");
	const router = useRouter();
	const { data } = useProductReviews(productId);
	const allReviews = data?.detail.results || [];
	const reviewCount = allReviews.length;

	const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
		() => {
			if (initialVariantFromUrl) {
				const id = Number(initialVariantFromUrl);
				if (!isNaN(id) && product.variants.some((v) => v.id === id)) {
					return id;
				}
			}
			return product.variants[0]?.id || null;
		}
	);

 
	

	const [selectedOrderType, setSelectedOrderType] = useState<
		"one-time" | "subscription" | null
	>(null);

	const selectedVariant = product.variants.find(
		(v) => v.id === selectedVariantId
	);

	const { cart, addItem } = useCart();

	// 🔥 Проверяем наличие В КОРЗИНЕ для ЛЮБОГО типа (включая subscription)
	const isInCart = useMemo(() => {
		if (!selectedVariant || !selectedOrderType) return false;
		return cart.some(
			(item) =>
				item.productId === productId &&
				item.variantId === selectedVariant.id &&
				item.type === selectedOrderType
		);
	}, [cart, productId, selectedVariant, selectedOrderType]);

	useEffect(() => {
		if (selectedVariant) {
			onVariantChange(selectedVariant);
		}
	}, [selectedVariantId, selectedVariant, onVariantChange]);

	const handleAction = () => {
		if (
			selectedVariantId === null ||
			selectedOrderType === null ||
			!selectedVariant
		) {
			toast.warning("Пожалуйста, выберите размер и тип заказа", {
				position: "top-center",
			});
			return;
		}

		// 🔁 Если товар УЖЕ в корзине — переходим на нужную страницу
		if (isInCart) {
			if (selectedOrderType === "subscription") {
				router.push(PAGE.REGISTRATION_SUBSCRIPTION);
			} else {
				router.push(PAGE.BASKET);
			}
			return;
		}

		// ➕ Добавляем в корзину (и для one-time, и для subscription)
		const priceNum = Number(selectedVariant.price);
		if (isNaN(priceNum)) {
			toast.error("Ошибка: некорректная цена товара", {
				position: "top-center",
			});
			return;
		}

		const imageUrl =
			selectedVariant.images.length > 0
				? selectedVariant.images[0].url.trim()
				: "";

		const allVariantsForCart = product.variants.map((v) => ({
			id: v.id,
			title: v.title,
			weight_range: v.weight_range,
			items_count: v.items_count,
			minCountSubscription: v.min_count_subscription ?? 0,
		}));

		const newItem = {
			productId: productId,
			productTitle: product.title,
			variantId: selectedVariant.id,
			variantTitle: selectedVariant.title,
			type: selectedOrderType,
			price: priceNum,
			itemsCount: selectedVariant.items_count,
			subscriptionPrice: selectedVariant.subscription_price
				? Number(selectedVariant.subscription_price)
				: undefined,
			discountPercent: selectedVariant.discount_percent,
			quantity:
				selectedOrderType === "subscription"
					? selectedVariant.min_count_subscription ?? 1
					: 1,
			imageUrl,
			availableVariants: allVariantsForCart,
		};

		try {
			addItem(newItem);

			if (selectedOrderType === "subscription") {
				router.push(PAGE.REGISTRATION_SUBSCRIPTION);
				return;
			}

			toast.success("Товар добавлен в корзину", {
				position: "top-center",
			});
		} catch (err: any) {
			toast.warning(err.message || "Товар уже в корзине", {
				position: "top-center",
			});
		}
	};

	const handleSelectVariant = (variantId: number) => {
		setSelectedVariantId(variantId);
	};

	// 📝 Текст кнопки
	const getButtonText = () => {
		if (!selectedOrderType) return "Выберите тип заказа";

		if (isInCart) {
			return selectedOrderType === "subscription"
				? "Оформить по подписке"
				: "Товар в корзине";
		}

		return selectedOrderType === "subscription"
			? "Оформить по подписке"
			: "Купить сейчас";
	};

	// 🎨 Стиль кнопки
	const getButtonClassName = () => {
		if (!selectedOrderType) {
			return "w-full max-w-full opacity-50 cursor-not-allowed";
		}

		if (isInCart) {
			return selectedOrderType === "subscription"
				? "w-full bg-[#0071E3] text-white max-w-full"
				: "w-full bg-[#8f8f8f] text-white max-w-full";
		}

		return "w-full max-w-full";
	};

	return (
		<section className="p-4 w-full bg-white rounded-[8px] border">
			<TitleComponent>Выберите свой размер:</TitleComponent>
			<div className="w-full grid grid-cols-2 gap-2 mt-4">
				{product.variants.map((el) => (
					<div
						key={el.id}
						onClick={() => handleSelectVariant(el.id)}
						className={`border flex flex-col gap-1 rounded-[8px] p-3 cursor-pointer transition-all duration-200 ${
							selectedVariantId === el.id ? "bg-[#0071E3] text-white" : ""
						}`}>
						<Title className="font-semibold">{el.title}</Title>
						<Description
							className={`transition-all duration-200 ${
								selectedVariantId === el.id ? "text-white" : "text-[#515151]"
							}`}>
							{el.weight_range} кг
						</Description>
						<Description
							className={`transition-all duration-200 ${
								selectedVariantId === el.id ? "text-white" : "text-[#515151]"
							}`}>
							{el.items_count} шт
						</Description>
					</div>
				))}
			</div>

			{selectedVariant && (
				<div className="w-full p-4 border rounded-[8px] flex flex-col gap-2 mt-4">
					<Title className="font-[600]">{product.title}</Title>
					<Description className="flex items-center gap-1">
						<IoStarSharp className="text-gray-400" />
						<IoStarSharp className="text-gray-400" />
						<IoStarSharp className="text-gray-400" />
						<IoStarSharp className="text-gray-400" />
						<IoStarSharp className="text-gray-400" />
						<span className="text-[#515151] ml-2">
							{reviewCount.toLocaleString()} отзывов
						</span>
					</Description>
					<Description className="w-full max-w-[280px]">
						{product.description}
					</Description>
 
					
					<div className="border-b w-full mt-2" />
					<Description className="text-[#141414] mt-2">
						Выберите тип заказа:
					</Description>
					<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Подписка */}
						<div
							onClick={() => setSelectedOrderType("subscription")}
							className={`p-3 rounded-[8px] relative border cursor-pointer transition-all duration-200 flex flex-col gap-2 ${
								selectedOrderType === "subscription"
									? "bg-[#0071E3] text-white border-[#0071E3]"
									: "border-gray-300 hover:border-[#0071E3]"
							}`}>
							<Title className="font-[600] w-full max-w-[185px]">
								По подписке
							</Title>
							<div className="flex items-center gap-1">
								<Title className="font-medium">
									{selectedVariant.subscription_price} сом
								</Title>
								<span
									className={`line-through ml-1 transition-all duration-200 ${
										selectedOrderType === "subscription"
											? "text-white"
											: "text-gray-500"
									}`}>
									{selectedVariant.price} сом
								</span>
							</div>
							<Title
								className={`px-2 py-[1px] uppercase transition-all duration-200 text-[15px] font-[600] rounded-[7px] rounded-tl-none absolute top-0 right-0 ${
									selectedOrderType === "subscription"
										? "bg-[#ffffff] text-[#000000]"
										: "bg-[#0071E3] text-[#ffffff]"
								}`}>
								Эконом {selectedVariant.discount_percent}%
							</Title>

							<div className="flex flex-col gap-1">
								<Description className="flex gap-2">
									<IoCheckmark size={20} /> - 10% от общей суммы
								</Description>
								<Description className="flex gap-2">
									<IoCheckmark size={20} /> Получаете весь товар сразу
								</Description>{" "}
								<Description className="flex gap-2">
									<IoCheckmark size={20} /> Бесплатная доставка до двери
								</Description>{" "}
								<Description className="flex gap-2">
									<IoCheckmark size={20} /> Планируйте покупки: 3 или 6 недель
								</Description>{" "}
								<Description className="flex gap-2">
									<IoCheckmark size={20} /> Управление подпиской в личном
									кабинете
								</Description>
							</div>
						</div>

						{/* Разовая покупка */}
						<div
							onClick={() => setSelectedOrderType("one-time")}
							className={`p-3 rounded-[8px] relative cursor-pointer transition-all duration-200 border ${
								selectedOrderType === "one-time"
									? "bg-[#0071E3] text-white border-[#0071E3]"
									: "border-gray-300 hover:border-[#0071E3]"
							}`}>
							<div className="flex justify-between">
								<Description className="font-[600]">
									Разовая покупка
								</Description>
							</div>
							<div className="w-full mt-2 rounded-[4px] flex justify-start items-center">
								<Description>{selectedVariant.price} сом</Description>
							</div>
						</div>
					</div>

					<div className="mt-4">
						<Button
							onClick={handleAction}
							disabled={!selectedOrderType}
							className={getButtonClassName()}>
							{getButtonText()}
						</Button>
					</div>
				</div>
			)}

			<div className="flex flex-col justify-center items-center gap-4 mt-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 w-full">
					{product.benefits.map((el, index) => (
						<div
							key={index}
							className="flex flex-col justify-center items-center w-full max-w-full">
							<div className="bg-[#DCDCDC] relative overflow-hidden w-[40px] h-[40px] rounded-[8px]">
								<Image
									fill
									style={{ objectFit: "cover" }}
									src={el.icon.trim()}
									alt="icon"
								/>
							</div>
							<Description className="text-[#515151] mt-2">
								{el.title}
							</Description>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default SizeDetail;
