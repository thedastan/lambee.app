"use client";

import { Description } from "@/components/ui/text/Description";
import Image from "next/image";
import { useProduct } from "@/redux/hooks/product";
import { useCart } from "@/redux/hooks/useCart"; // ← убедитесь, что путь корректен
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";
import { useRouter } from "next/navigation";

const AlsoBuySubscriptions = () => {
	const { data } = useProduct();
	const { cart, addItem } = useCart();
	const router = useRouter();

	// Проверка, находится ли конкретный вариант в корзине (только разовый заказ)
	const isVariantInCart = (productId: number, variantId: number) => {
		return cart.some(
			(item) =>
				item.productId === productId &&
				item.variantId === variantId &&
				item.type === "subscription"
		);
	};

	const handleBuyNow = (product: any, variant: any) => {
		const isInCart = isVariantInCart(product.id, variant.id);
	
		if (isInCart) {
			router.push("/cart");
			return;
		}
	
		const imageUrl =
			variant.images.length > 0 ? variant.images[0].url.trim() : "";
	
		const allVariantsForCart = product.variants.map((v: any) => ({
			id: v.id,
			title: v.title,
			weight_range: v.weight_range,
			items_count: v.items_count,
			min_count_subscription: v.min_count_subscription ?? 0, // ← добавляем минимум
		}));
	
		const newItem = {
			productId: product.id,
			productTitle: product.title,
			variantId: variant.id,
			variantTitle: variant.title,
			type: "subscription" as const,
			price: Number(variant.price),
			itemsCount: variant.items_count,
			subscriptionPrice: variant.subscription_price
				? Number(variant.subscription_price)
				: undefined,
			discountPercent: variant.discount_percent,
			// ↓ КЛЮЧЕВОЕ ИЗМЕНЕНИЕ: quantity = min_count_subscription (но не меньше 1)
			quantity: variant.min_count_subscription ?? 1,
			// minCountSubscription: variant.min_count_subscription ?? 0, 
			imageUrl,
			availableVariants: allVariantsForCart,
		};
	
		try {
			addItem(newItem);
			toast.success("Товар добавлен в корзину!", { position: "top-center" });
		} catch (err: any) {
			toast.warning(err.message || "Товар уже в корзине", {
				position: "top-center",
			});
		}
	};

	return (
		<section className="">
			<div className="bg-[#F9F4EC] py-4 mt-6">
				<Description className="px-4 pb-4">Также покупают</Description>

				<div
					className="overflow-x-auto scrollbar-hide flex items-start gap-3 pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)]"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{data?.detail.map((product, productIndex) => (
						<div key={productIndex} className="flex-shrink-0 flex gap-2">
							{product.variants.map((variant) => {
								const isInCart = isVariantInCart(product.id, variant.id);

								return (
									<div
										key={`${product.id}-${variant.id}`}
										className="border border-[#E4E4E7] rounded-[8px] p-3 bg-white flex gap-2 w-full max-w-[280px]">
										<div className="w-[80px] min-w-[80px] h-[80px] relative overflow-hidden rounded-[8px]">
											<Image
												fill
												style={{ objectFit: "cover" }}
												src={variant.images[0]?.url.trim() || ""}
												alt={`${product.title} ${variant.title}`}
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.src = "/placeholder.png"; // или оставьте пустым
												}}
											/>
										</div>
										<div className="w-full flex flex-col justify-between">
											<div>
												<div className="flex items-start justify-between gap-2">
													<Description className="font-[600]">
														{product.title}, {variant.title}
													</Description>
													<Description className="font-[600] text-nowrap">
														{variant.price} c
													</Description>
												</div>
												<Description className="text-[#515151] mt-1">
													{product.description}
												</Description>
											</div>
											<div className="w-full flex justify-end">
												{isInCart ? (
													<>
														<button
															className={`text-[12px] text-black font-[600] ${
																isInCart
																	? "text-black"
																	: "text-[#0071E3] border-b border-[#0071E3]"
															}`}>
															Добавлено
														</button>
													</>
												) : (
													<>
														<button
															onClick={(e) => {
																e.stopPropagation();
																handleBuyNow(product, variant);
															}}
															className={`text-[12px] font-[600] text-[#0071E3] border-b border-[#0071E3]`}>
															Добавить в корзину
														</button>
													</>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AlsoBuySubscriptions;
