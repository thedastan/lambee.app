"use client";

import { useState } from "react";
import FollowCard from "@/components/ui/cards/FollowCard";
import PageHeader from "@/components/ui/heading/PageHeader";
import { useSubscriptions } from "@/redux/hooks/useSubscriptions";

const FollowComponents = () => {
  // Извлекаем данные. Предполагаем, что хук возвращает объект с полем detail
  const { subscriptions:data, isLoading } = useSubscriptions();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  if (isLoading) return <div className="p-10 text-center">Загрузка...</div>;

  // Достаем массив подписок из поля detail
  const subscriptions = data || [];

	

  const handleToggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleAction = (action: string, id: number) => {
    console.log(`Action: ${action} for subscription: ${id}`);
    setOpenMenuId(null);
  };

  return (
    <section>
      <PageHeader
        title="Мои подписки"
        description="Экономьте до 25% с нашими пакетами"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 p-4">
        {subscriptions.length > 0 ? (
          subscriptions.map((subscription: any) => (
            <FollowCard 
              key={subscription.id} 
              data={subscription}
              isOpenMenu={openMenuId === subscription.id}
              onToggleMenu={handleToggleMenu}
              onAction={handleAction}
            />
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