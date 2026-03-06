"use client";
import React, { useState, useMemo } from "react";
import Image from "next/image";

// UI Components
import { Description } from "@/components/ui/text/Description";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { Title } from "@/components/ui/text/Title";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import statistics from "@/assets/svg/Statistics.svg";
import { LuCalendar } from "react-icons/lu";
import { useAnalytics } from "@/redux/hooks/analytics";
import DatePickerModal from "./DatePickerModal";

const Analytics = () => {
  // Состояния для периода (по умолчанию - текущий месяц)
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 1); // Месяц назад
    return d;
  });
  const [dateTo, setDateTo] = useState(new Date());
  
  const [activePicker, setActivePicker] = useState<"from" | "to" | null>(null);

  // Форматируем даты для API (YYYY-MM-DD)
  const formatDateForApi = (date: Date) => date.toISOString().split('T')[0];

  // Запрос данных с фильтрами
  const { data, isLoading } = useAnalytics(
    formatDateForApi(dateFrom), 
    formatDateForApi(dateTo)
  );

  const stats = data?.detail;

  return (
    <section className="min-h-screen bg-[#F8F9FB]">
      <PageHeader href={PAGE.PROFILE} title="Аналитика" />
      <div className="md:p-4 p-0">
        <div className="p-4 md:bg-white bg-transparent rounded-2xl">
          <TitleComponent className="text-[24px]">Статистика</TitleComponent>
          <Description className="pb-4">
            Детальная статистика за выбранный период
          </Description>

          {/* Выбор периода */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div>
              <Description className="pb-1 text-[12px]">От</Description>
              <div
                onClick={() => setActivePicker("from")}
                className="flex justify-between items-center bg-white rounded-[8px] p-3 border border-[#E4E4E7] cursor-pointer"
              >
                <span className="text-[#515151] text-[14px]">
                  {dateFrom.toLocaleDateString("ru-RU")}
                </span>
                <LuCalendar size={16} className="text-gray-400" />
              </div>
            </div>
            <div>
              <Description className="pb-1 text-[12px]">До</Description>
              <div
                onClick={() => setActivePicker("to")}
                className="flex justify-between items-center bg-white rounded-[8px] p-3 border border-[#E4E4E7] cursor-pointer"
              >
                <span className="text-[#515151] text-[14px]">
                  {dateTo.toLocaleDateString("ru-RU")}
                </span>
                <LuCalendar size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <DatePickerModal
            isOpen={activePicker !== null}
            onClose={() => setActivePicker(null)}
            date={activePicker === "from" ? dateFrom : dateTo}
            onSave={(d) => {
              if (activePicker === "from") setDateFrom(d);
              else setDateTo(d);
            }}
          />

          {/* Карточки статистики */}
          <div className="flex flex-col gap-4 mt-4">
            {isLoading ? (
              <div className="text-center py-10 text-gray-400">Загрузка данных...</div>
            ) : (
              <>
                {/* Использовано подгузников */}
                <div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
                  <div className="flex flex-col gap-1">
                    <Description className="text-[#515151]">
                      Использовано подгузников:
                    </Description>
                    <Title>{stats?.diapers_used ?? 0} шт.</Title>
                  </div>
                  <Image src={statistics} alt="statistics" />
                </div>

                {/* Потрачено денег */}
                <div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
                  <div className="flex flex-col gap-1">
                    <Description className="text-[#515151]">
                      Потрачено денег:
                    </Description>
                    <Title>{stats?.total_spent?.toLocaleString() ?? 0} с</Title>
                  </div>
                  <Image src={statistics} alt="statistics" />
                </div>

                {/* Размеры */}
                <div className="flex justify-between items-center bg-white rounded-[8px] p-4 border border-[#E4E4E7]">
                  <div className="flex flex-col gap-1">
                    <Description className="text-[#515151]">
                      Какие размеры вы брали:
                    </Description>
                    <Title>
                      {stats?.sizes_used?.length 
                        ? stats.sizes_used.join(", ") 
                        : "Нет данных"}
                    </Title>
                  </div>
                  <Image src={statistics} alt="statistics" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;