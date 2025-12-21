// DetailComponents.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useProductDetail, useProductReviews } from "@/redux/hooks/product";
import PageHeader from "@/components/ui/heading/PageHeader";
import { PAGE } from "@/config/pages/public-page.config";
import HeroDetail from "./hero/Hero";

const DetailComponents = () => {
  const params = useParams();
  const id = Number(params.id);

  const { data: productData } = useProductDetail(id);
  const product = productData?.detail;

  // Управляем текущей страницей отзывов
  const [reviewPage, setReviewPage] = useState(0); // или 1 — зависит от API
  const REVIEW_PAGE_SIZE = 2;

  const { reviewsData, isLoading: reviewsLoading } = useProductReviews({
    productId: id,
    page: reviewPage,
    pageSize: REVIEW_PAGE_SIZE,
  });

  if (!product) return <div>Loading...</div>;

  const reviews = reviewsData?.detail.results || [];
  const hasMore = !!reviewsData?.detail.next; // если next !== null

  return (
    <>
     <PageHeader
				href={PAGE.HOME}
				className="hidden md:flex"
				title={product.title}
			/>
			<div className="flex">
				<HeroDetail product={product} />
				{/* <SizeDetail product={product} /> */}
			</div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Отзывы</h2>
        {reviewsLoading ? (
          <p>Загрузка...</p>
        ) : (
          <div>
            {reviews.map((r:any) => (
              <div key={r.id}>{r.text}</div>
            ))}
          </div>
        )}

        {/* Кнопки пагинации */}
        <div className="mt-4 flex gap-2">
          <button
            disabled={reviewPage <= 0}
            onClick={() => setReviewPage((p) => p - 1)}
          >
            Назад
          </button>
          {hasMore && (
            <button onClick={() => setReviewPage((p) => p + 1)}>
              Далее
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailComponents;