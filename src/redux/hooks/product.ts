import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product.service";

export function useProduct() {
	const { data, isLoading } = useQuery({
		queryKey: ["product"],
		queryFn: () => productService.getProduct(),
	});

	return { data, isLoading };
}

export function useProductDetail(id: number) {
	const { data, isLoading } = useQuery({
		queryKey: ["product", id],
		queryFn: () => productService.getProductDetail(id),
	});

	return { data, isLoading };
}

interface UseProductReviewsProps {
  productId: number;
  page: number;
  pageSize: number;
}


export function useProductReviews({ productId, page, pageSize }: UseProductReviewsProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product-reviews", productId, page, pageSize],
    queryFn: () => productService.getProductReviews(productId, page, pageSize),
    enabled: !!productId,
  });

  return { reviewsData: data, isLoading, isError };
}