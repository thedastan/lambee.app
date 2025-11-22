import Button from "@/components/ui/button/Button";
import { Description } from "@/components/ui/text/Description";
import img from "@/assets/images/Diapers.png";
import Image from "next/image";

const PaymentTotal = () => {
	return (
		<section className="bg-[#FFFDFA] p-4">
			<Description className="text-[16px]">По подписке</Description>

			<div className="py-2 flex justify-between items-center">
				<div className="flex items-center justify-start gap-3">
					<div className=" relative overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
						<Image
							className="rounded-[8px] w-[75px] h-[75px]"
							objectFit="cover"
							src={img}
							alt=""
						/>
						<div className="bg-black border-2 border-gray-300 text-white  py-0  px-2 rounded-[8px] absolute top-0 right-0">
							1
						</div>
					</div>
					<div className="">
						<Description>Подгузники</Description>
						<Description className="text-[#515151]">Подписка</Description>
					</div>
				</div>
				<Description>14 000 c</Description>
			</div>

      <div className="py-2 flex justify-between items-center">
				<div className="flex items-center justify-start gap-3">
					<div className=" relative overflow-hidden w-[100px] h-[100px] flex justify-center items-center">
						<Image
							className="rounded-[8px] w-[75px] h-[75px]"
							objectFit="cover"
							src={img}
							alt=""
						/>
						<div className="bg-black border-2 border-gray-300 text-white  py-0  px-2 rounded-[8px] absolute top-0 right-0">
							1
						</div>
					</div>
					<div className="">
						<Description>Подгузники</Description>
						<Description className="text-[#515151]">Подписка</Description>
					</div>
				</div>
				<Description>14 000 c</Description>
			</div>

			<div className="flex flex-col gap-3 ">
				<div className="flex items-center justify-between">
					<Description className="text-[12px]">Сумма заказа</Description>
					<Description className="text-[#AAA4C2] font-[500] text-[12px] flex gap-2">
						<span className="line-through  text-[#515151] ">16 000 с</span>
						14 000 с
					</Description>
				</div>
				<div className="flex items-center justify-between">
					<Description className="text-[12px]">Доставка</Description>
					<Description className="text-[12px]">200 с</Description>
				</div>
				<div className="flex items-center justify-between">
					<Description>Итого:</Description>
					<Description>14 000 с</Description>
				</div>
			</div>

			<Button className="w-full mt-4">Перейти к оплате </Button>
			<Description className="text-[#0000008F] mt-4">
				Ваш адрес доставки будет сохранен, чтобы было легче оформлять товары
			</Description>
		</section>
	);
};

export default PaymentTotal;
