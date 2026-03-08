"use client";

import FollowCard from "@/components/ui/cards/FollowCard";
import PageHeader from "@/components/ui/heading/PageHeader";
import { useSubscriptions } from "@/redux/hooks/useSubscriptions";

const FollowComponents = () => {
	const { subscriptions: data, isLoading } = useSubscriptions();

	if (isLoading) {
		return (
			<section >
				<PageHeader
					title="Мои подписки"
					description="Экономьте до 25% с нашими пакетами"
				/>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-5">
					{Array.from({ length: 4 }).map((_, i) => (
						<div
							key={i}
							className="p-3 bg-white border border-[#E4E4E7] w-full h-[300px] rounded-[16px] flex flex-col items-center gap-3 animate-pulse">
							<div className="flex items-center justify-between w-full border-b pb-2">
								<div className="h-5 w-32 bg-gray-200 rounded" />
								<div className="w-[48px] h-[48px] bg-gray-200 rounded-[8px]" />
							</div> 

							<div className="w-full flex flex-col gap-4 h-full">
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className=" bg-white w-full  flex justify-between items-center ">
										<div className="h-5 w-32 bg-gray-200 rounded" />
										<div className="h-5 w-32 bg-gray-200 rounded" />
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	const subscriptions = data || [];

	return (
		<section>
			<PageHeader
				title="Мои подписки"
				description="Экономьте до 25% с нашими пакетами"
			/>

			<div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 p-4">
				{subscriptions.length > 0 ? (
					subscriptions.map((subscription: any) => (
						<FollowCard key={subscription.id} data={subscription} />
					))
				) : (
					<div className="col-span-full text-center py-10 text-gray-500">
						у вас пока нет активных подписок
					</div>
				)}
			</div>
		</section>
	);
};

export default FollowComponents;
