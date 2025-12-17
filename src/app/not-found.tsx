import Link from "next/link";
import { Title } from "@/components/ui/text/Title";
import { Description } from "@/components/ui/text/Description";
import Button from "@/components/ui/button/Button";

export default function NotFound() {
	return (
		<main className="flex  pt-32 flex-col items-center justify-center p-6 text-center">
			<Title className="text-6xl font-bold mb-4">404</Title>
			<Description className="text-xl text-gray-600 mb-8">
				Страница не найдена
			</Description>
			<p className="text-gray-500 max-w-md mb-10">
				К сожалению, страница, которую вы ищете, не существует. Возможно, она была удалена или перемещена.
			</p>
			<Link href="/" passHref>
				<Button>Вернуться на главную</Button>
			</Link>
		</main>
	);
}