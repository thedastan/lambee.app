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
