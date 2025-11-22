import Image from "next/image";
import img from "@/assets/images/Diapers.png";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Description } from "@/components/ui/text/Description";
import { FiMinus } from "react-icons/fi";
import { VscAdd } from "react-icons/vsc";
import DeleteSvg from "@/assets/svg/delete";

const BasketCards = () => {
	return (
		<section className="md:p-0 p-4 flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<div className="w-[80px] min-w-[80px] h-[80px]  rounded-[8px] relative overflow-hidden">
					<Image className=" object-cover" src={img} alt="img" />
				</div>
				<div className="flex flex-col justify-between gap-1 w-full">
					<div className="flex md:justify-start justify-between gap-2">
						<TitleComponent>Подгузники</TitleComponent>
						<button>
							<DeleteSvg />
						</button>
					</div>
					<Description className="text-[#515151] font-[500] text-[14px] flex gap-2">
						<span className="line-through  text-black ">16 000 с</span>
						14 000 с
					</Description>
					<div className="border border-[#E4E4E7] w-full max-w-[90px] rounded-[4px] flex justify-between items-center">
						<button className="border-r w-[28px] h-[28px] flex justify-center items-center text-[#515151]">
							<FiMinus />
						</button>
						<Description>2</Description>
						<button className="border-l w-[28px] h-[28px]   flex justify-center items-center text-[#515151]">
							<VscAdd />
						</button>
					</div>
				</div>
			</div>

			<div className="border border-[#E4E4E7] p-2 rounded-[8px] flex justify-between items-center mt-4">
				<div className="flex items-center gap-3">
					<Description className="font-[600]">Размер 1</Description>
					<Description className="text-[#515151]">
						6 Пачек (198 подгузников)
					</Description>
				</div>
				<button className="text-[#515151] text-[12px]">Изменить</button>
			</div>
		</section>
	);
};

export default BasketCards;
