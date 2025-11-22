import img1 from "@/assets/images/Diapers.png";
import img2 from "@/assets/images/Napkins.png";
import img3 from "@/assets/images/Panties.png";
import img4 from "@/assets/images/Travel.png";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import Image from "next/image";
import Link from "next/link";

const CategoryHome = () => {
	const data = [
		{
			img: img1,
			title: "Подгузники",
		},
		{
			img: img2,
			title: "Салфетки",
		},
		{
			img: img3,
			title: "Трусики",
		},
		{
			img: img4,
			title: "Тревелпаки",
		},
	];
	return (
		<section className="pb-6 px-4">
      <TitleComponent className="pb-4">Категории товаров</TitleComponent>
			<div className=" grid grid-cols-2 gap-2">
				{data.map((el, index) => (
					<Link key={index} href={"#"} className="p-3 bg-white border border-[#E4E4E7] rounded-[8px] flex items-center gap-4">
						<Image
							width={48}
							height={48}
							className=" rounded-[8px]"
							src={el.img}
							alt="category-img"
						/>
						<Title>{el.title}</Title>
					</Link>
				))}
			</div>
		</section>
	);
};

export default CategoryHome;
