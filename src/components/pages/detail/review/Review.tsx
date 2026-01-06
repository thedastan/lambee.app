"use client";

import { useState, useMemo } from "react";
import { Description } from "@/components/ui/text/Description";
import { Title } from "@/components/ui/text/Title";
import { TitleComponent } from "@/components/ui/text/TitleComponent";
import { IoStarSharp } from "react-icons/io5";
import {
  useCreateProductReview,
  useDeleteMyProductReview,
  useProductReviews,
} from "@/redux/hooks/product";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ModalBottom from "@/components/ui/modal/ModalBottom";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import { FaStar } from "react-icons/fa";
import { toast } from "alert-go";
import "alert-go/dist/notifier.css";

interface ReviewProps {
  productId: number;
}

const Review = ({ productId }: ReviewProps) => {
  // ← ВРЕМЕННОЕ РЕШЕНИЕ: получаем имя и фамилию текущего пользователя
  // Замените на реальные данные из вашего Redux/AuthContext
  const currentUserName = "Asim";       // ← ваше имя
  const currentUserSurname = "Makhmudov"; // ← ваша фамилия

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useProductReviews(productId);
  const createReview = useCreateProductReview(productId);
  const deleteReview = useDeleteMyProductReview(productId);

  const [isModal, setIsModal] = useState(false); // для создания
  const [isModalOpen, setIsModalOpen] = useState(false); // для удаления
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const allReviews = data?.detail.results || [];
  const reviewCount = allReviews.length;
  const REVIEWS_PER_PAGE = 5;
  const totalPages = Math.ceil(reviewCount / REVIEWS_PER_PAGE);

  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * REVIEWS_PER_PAGE;
    return allReviews.slice(start, start + REVIEWS_PER_PAGE);
  }, [allReviews, currentPage]);

  const formatDate = (isoDate: string) => {
    return format(new Date(isoDate), "LLLL d, yyyy", { locale: ru });
  };

  const renderStars = (ratingStr: string) => {
    const rating = Number(ratingStr);
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <IoStarSharp key={`full-${i}`} className="text-black" />
          ))}
        {hasHalf && <IoStarSharp className="text-black opacity-50" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <IoStarSharp key={`empty-${i}`} className="text-gray-300" />
          ))}
      </div>
    );
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.warning("Пожалуйста, выберите рейтинг.", { position: "top-center" });
      return;
    }
    if (!text.trim()) {
      toast.warning("Пожалуйста, напишите комментарий.", { position: "top-center" });
      return;
    }

    try {
      await createReview.mutateAsync({ rating, text });
      setIsModal(false);
      setRating(0);
      setText("");
      toast.success("Отзыв успешно опубликован!", { position: "top-center" });
    } catch (error: any) {
      console.error("Ошибка при отправке отзыва:", error);
      if (error.response?.data?.detail === "Review already exists") {
        toast.warning("Вы уже оставляли отзыв на этот товар.", { position: "top-center" });
      } else if (error.response?.status === 401) {
        toast.warning("Авторизуйтесь, чтобы оставить отзыв.", { position: "top-center" });
      } else {
        toast.error("Не удалось отправить отзыв. Попробуйте позже.", { position: "top-center" });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview.mutateAsync();
      toast.success("Отзыв удалён", { position: "top-center" });
    } catch (error: any) {
      toast.error("Не удалось удалить отзыв", { position: "top-center" });
    } finally {
      setIsModalOpen(false);
    }
  };

  if (!productId) return null;

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex border-b pb-3 gap-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Левая панель */}
      <div className="text-center flex flex-col md:py-4 py-0 justify-start gap-3 md:items-start items-center w-full max-w-[435px]">
        <TitleComponent className="md:!text-[28px] !text-[16px] w-full max-w-full text-start font-[400]">
          Что думают родители:
        </TitleComponent>

        <button
          onClick={() => setIsModal(true)}
          className="flex flex-col w-full md:items-center items-center gap-1 bg-white border rounded-[8px] p-2">
          Оставить отзыв
        </button>

        <div className="flex md:flex-row flex-col w-full md:items-center items-center gap-1 md:bg-transparent bg-white border md:border-none rounded-[8px] md:p-0 p-2">
          <div className="flex items-center gap-1">
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
            <IoStarSharp />
          </div>
          <span className="text-[#515151] md:ml-2 ml-0">
            {reviewCount.toLocaleString()} отзывов
          </span>
        </div>
      </div>

      {/* Отзывы */}
      <div className="w-full flex flex-col gap-3 border bg-white p-4 rounded-[8px]">
        {paginatedReviews.length === 0 ? (
          <div className="text-gray-500 text-center py-6">Отзывов пока нет.</div>
        ) : (
          paginatedReviews.map((review) => {
            const userName = review.user.name || review.user.surname
              ? `${review.user.name} ${review.user.surname}`.trim()
              : "Аноним";

            // ← ВРЕМЕННАЯ ПРОВЕРКА: сравниваем по имени и фамилии
            const isMyReview =
              currentUserName &&
              currentUserSurname &&
              review.user.name === currentUserName &&
              review.user.surname === currentUserSurname;

            return (
              <div
                key={review.id}
                onClick={() => {
                  if (isMyReview) {
                    setIsModalOpen(true);
                  }
                }}
                className={`border-b pb-3 flex flex-col md:flex-row justify-between md:items-start gap-3 md:gap-4 cursor-pointer`}>
                <div className="flex flex-col gap-1">
                  <Title>{userName}</Title>
                  {renderStars(review.rating)}
                  <Description className="text-[#515151] text-sm">
                    {formatDate(review.created_at)}
                  </Description>
                </div>
                <Description className="text-gray-700 w-full max-w-[310px]">
                  {review.text}
                </Description>
              </div>
            );
          })
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="w-full flex justify-center items-center gap-2 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`p-1 rounded-full ${
                currentPage === 1 ? "opacity-30" : "hover:bg-gray-100"
              }`}>
              <GoChevronLeft size={22} color="#515151" />
            </button>
            <span className="text-[#515151] min-w-[18px] text-center">{currentPage}</span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`p-1 rounded-full ${
                currentPage === totalPages ? "opacity-30" : "hover:bg-gray-100"
              }`}>
              <GoChevronRight size={22} color="#515151" />
            </button>
          </div>
        )}
      </div>

      {/* Модалка создания */}
      <ModalBottom
        isOpen={isModal}
        onClose={() => {
          setIsModal(false);
          setRating(0);
          setText("");
        }}
        title="Оставить отзыв">
        <div className="flex flex-col gap-3">
          <Description className="font-[500] !text-[16px] text-center pt-3">
            Выберите от 1 до 5
          </Description>
          <div className="flex justify-center items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={26}
                color={star <= rating ? "#0071E3" : "#1783ee73"}
                onClick={() => handleStarClick(star)}
                className="cursor-pointer"
              />
            ))}
          </div>

          <div className="flex flex-col gap-1 pb-4 border-b">
            <p className="text-[#515151]">Комментарий</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border rounded-[8px] w-full h-[120px] p-3 outline-none"
              placeholder="Можете написать комментарий"
            />
          </div>

          <div className="flex gap-3 w-full mt-1">
            <Button
              className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
              onClick={() => {
                setIsModal(false);
                setRating(0);
                setText("");
              }}>
              Отмена
            </Button>
            <Button
              className="w-full"
              disabled={createReview.isPending}
              onClick={handleSubmit}>
              {createReview.isPending ? "Отправка..." : "Опубликовать"}
            </Button>
          </div>
        </div>
      </ModalBottom>

      {/* Модалка удаления */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="">
        <div className="flex flex-col gap-3">
          <TitleComponent className="text-center pb-6">
            Вы точно хотите удалить <br /> свой отзыв?
          </TitleComponent>
          <div className="flex gap-3 w-full">
            <Button
              className="w-full border border-[#E4E4E7] !bg-transparent !text-black"
              onClick={() => setIsModalOpen(false)}>
              Отмена
            </Button>
            <Button
              className="w-full bg-red-500 hover:bg-red-600"
              onClick={handleDelete}
              disabled={deleteReview.isPending}>
              {deleteReview.isPending ? "Удаление..." : "Удалить"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Review;