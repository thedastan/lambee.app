import { useQuery } from "@tanstack/react-query";
import { categoriesService } from "../services/categories.service";

export function useCategories() {
	const { data, isLoading } = useQuery({
		queryKey: ["categories"],
		queryFn: () => categoriesService.getCategories(),
	});

	return { data, isLoading };
}
 