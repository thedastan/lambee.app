import { Description } from "@/components/ui/text/Description";
import img from "@/assets/images/Diapers.png";
import Image from "next/image";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IoStarSharp } from "react-icons/io5";
import { Title } from "@/components/ui/text/Title";
import { useProduct } from "@/redux/hooks/product";
import { useCart } from "@/redux/hooks/useCart";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";


const AlsoBuy = () => {
	const { data } = useProduct();

	const { addItem } = useCart(); // ← получаем метод добавления
	
		const handleBuyNow = (product: any) => {
			// Берём первый вариант
			const firstVariant = product.variants[0];
			if (!firstVariant) {
				toast.error("Нет доступных вариантов товара", { position: "top-center" });
				return;
			}
	
			const newItem = {
				productId: product.id,
				productTitle: product.title,
				variantId: firstVariant.id,
				variantTitle: firstVariant.title,
				type: "one-time" as const, // или можно спросить у пользователя, но для "Купить сейчас" — разовый
				price: firstVariant.price,
				itemsCount: firstVariant.items_count,
				subscriptionPrice: firstVariant.subscription_price,
				discountPercent: firstVariant.discount_percent,
				quantity: 1,
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
		<section className=" ">
			<div className="text-center md:flex hidden flex-col justify-center items-center gap-3 mt-3">
				<TitleComponent className="text-[28px] font-[400]">
					Подгузники
				</TitleComponent>
				<Description className="flex items-center gap-1">
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<IoStarSharp />
					<span className="text-[#515151] ml-2">4500 отзывов</span>
				</Description>
				<Description className="w-full max-w-[350px] mt-2">
					Качество премиум-класса для здоровья и удобства с первых минут жизни
				</Description>
				<Title className="font-[600] mt-2">От 7000 с в месяц</Title>
			</div>

			<div className="bg-[#F9F4EC] py-4 mt-6">
				<Description className="px-4 pb-4">Также покупают</Description>

				<div
					className="overflow-x-auto scrollbar-hide flex items-start gap-3  pl-[calc((100%-96%)/3)] pr-[calc((100%-96%)/3)]"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
					{data?.detail.map((el, index) => (
						<div
							key={index}
							className="border border-[#E4E4E7] flex-shrink-0 rounded-[8px] p-3 bg-white flex gap-2 w-full max-w-[280px]">
							<div className="w-[80px] min-w-[80px] h-[80px] relative overflow-hidden rounded-[8px]">
								<Image
									fill
									objectFit="cover"
									src={el.images[0]?.url}
									alt="img"
								/>
							</div>
							<div className="w-full flex flex-col justify-between">
								<div className="">
									<div className="flex items-center justify-between gap-2">
										<Description className="font-[600]">{el.title}</Description>
										{el.variants.slice(0, 1).map((item, index) => (
											<Description key={index} className="font-[600]">
												{item.price} c
											</Description>
										))}
									</div>

									<Description className="text-[#515151] mt-1">
										{el.description}
									</Description>
								</div>
								<div className="w-full flex justify-end">
									<button onClick={() => handleBuyNow(el) } className="text-[#0071E3] border-b border-[#0071E3] text-[12px] font-[600]">
										Добавить в корзину
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default AlsoBuy;
