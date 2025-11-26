import Link from "next/link";
import { Description } from "../text/Description";
import { TitleComponent } from "../text/TitleComponent";
import { GoChevronLeft } from "react-icons/go";

interface PageHeaderProps {
	title?: string;
	description?: string;
	className?: string;
	href?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	description,
	className,
	href,
}) => {
	return (
		<div className={`p-4 md:p-0 pb-0 w-full ${className || ""}`}>
			<div className="bg-white md:flex hidden w-full items-center justify-start gap-2  border-b px-4 h-[64px]">
				{href && (
					<Link href={href}>
						<GoChevronLeft size={23} />
					</Link>
				)}
				<div className="flex flex-col">
					{title && <TitleComponent>{title}</TitleComponent>}
					{description && (
						<Description className="text-[#515151]">{description}</Description>
					)}
				</div>
			</div>
			<div className="flex md:hidden items-center gap-2">
				{href && (
					<Link href={href}>
						<GoChevronLeft size={23} />
					</Link>
				)}
				<div className="flex flex-col gap-1">
					{title && <TitleComponent>{title}</TitleComponent>}
					<Description className="text-[#515151]">{description}</Description>
				</div>
			</div>
		</div>
	);
};

export default PageHeader;
